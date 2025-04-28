import { performanceService } from './performanceService';
import { loggingService } from '../utils/logging';

interface SolarData {
  latitude: number;
  longitude: number;
  annualIrradiance: number;
  monthlyIrradiance: number[];
  timestamp: number;
}

interface CacheEntry {
  data: SolarData;
  expiresAt: number;
}

class SolarDataService {
  private cache: Map<string, CacheEntry> = new Map();
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
  private readonly API_URL = import.meta.env.VITE_SOLAR_DATA_API_URL;

  private getCacheKey(lat: number, lng: number): string {
    // Round coordinates to 2 decimal places for cache efficiency
    return `${lat.toFixed(2)},${lng.toFixed(2)}`;
  }

  async getSolarData(latitude: number, longitude: number): Promise<SolarData> {
    const endTimer = performanceService.startTimer('api', 'fetch-solar-data');
    const cacheKey = this.getCacheKey(latitude, longitude);

    try {
      // Check cache first
      const cached = this.cache.get(cacheKey);
      if (cached && cached.expiresAt > Date.now()) {
        endTimer();
        return cached.data;
      }

      // Fetch from API
      const response = await fetch(
        `${this.API_URL}/solar-data?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch solar data');
      }

      const data = await response.json();
      const solarData: SolarData = {
        latitude,
        longitude,
        annualIrradiance: data.annual || this.estimateAnnualIrradiance(latitude),
        monthlyIrradiance: data.monthly || this.estimateMonthlyIrradiance(latitude),
        timestamp: Date.now()
      };

      // Cache the result
      this.cache.set(cacheKey, {
        data: solarData,
        expiresAt: Date.now() + this.CACHE_DURATION
      });

      loggingService.info('Solar data fetched and cached', {
        location: `${latitude},${longitude}`,
        annualIrradiance: solarData.annualIrradiance
      });

      return solarData;
    } catch (error) {
      loggingService.error('Failed to fetch solar data', { error });
      
      // Return estimated data on error
      return {
        latitude,
        longitude,
        annualIrradiance: this.estimateAnnualIrradiance(latitude),
        monthlyIrradiance: this.estimateMonthlyIrradiance(latitude),
        timestamp: Date.now()
      };
    } finally {
      endTimer();
    }
  }

  private estimateAnnualIrradiance(latitude: number): number {
    // Simple estimation based on latitude
    const absLat = Math.abs(latitude);
    if (absLat < 23.5) return 6; // Tropical
    if (absLat < 45) return 5; // Temperate
    if (absLat < 66.5) return 4; // Subarctic
    return 3; // Polar
  }

  private estimateMonthlyIrradiance(latitude: number): number[] {
    const baseIrradiance = this.estimateAnnualIrradiance(latitude);
    const absLat = Math.abs(latitude);
    
    // Generate monthly variations based on latitude
    return Array.from({ length: 12 }, (_, month) => {
      const seasonalFactor = Math.cos((month - 5.5) * Math.PI / 6);
      const latitudeFactor = (absLat / 90) * 2;
      const variation = seasonalFactor * latitudeFactor;
      return Math.max(baseIrradiance * (1 + variation), 1);
    });
  }

  clearCache(): void {
    this.cache.clear();
    loggingService.info('Solar data cache cleared');
  }
}

export const solarDataService = new SolarDataService();