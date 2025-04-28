import { PanelConfiguration, SeasonalData } from '../types/calculator';

const SOLAR_CONSTANT = 1361; // W/m² at top of atmosphere

export function calculateOptimalTilt(latitude: number): number {
  // Rough estimate: latitude * 0.76 + 3.1 degrees
  return latitude * 0.76 + 3.1;
}

export function calculateOptimalAzimuth(latitude: number): number {
  // In the northern hemisphere, optimal azimuth is 180° (facing south)
  // In the southern hemisphere, optimal azimuth is 0° (facing north)
  return latitude >= 0 ? 180 : 0;
}

export function calculateSolarIrradiance(
  latitude: number,
  config: PanelConfiguration,
  dayOfYear: number
): number {
  const declination = 23.45 * Math.sin((360 / 365) * (dayOfYear - 81) * (Math.PI / 180));
  const hourAngle = 15 * (12 - new Date().getHours());
  
  const cosIncidence = 
    Math.sin(latitude * (Math.PI / 180)) * Math.sin(declination * (Math.PI / 180)) +
    Math.cos(latitude * (Math.PI / 180)) * Math.cos(declination * (Math.PI / 180)) *
    Math.cos(hourAngle * (Math.PI / 180));

  const panelEfficiency = calculatePanelEfficiency(config);
  
  return SOLAR_CONSTANT * cosIncidence * panelEfficiency * (1 - config.shadingFactor);
}

export function calculatePanelEfficiency(config: PanelConfiguration): number {
  // Temperature coefficient for power typically -0.4% per degree C above 25°C
  const temperatureEffect = 1 - Math.max(0, (config.temperature - 25) * 0.004);
  
  // Base efficiency adjusted for temperature
  const actualEfficiency = config.efficiency * temperatureEffect;
  
  // Adjust for tilt and azimuth
  const tiltFactor = Math.cos((90 - config.tiltAngle) * (Math.PI / 180));
  const azimuthFactor = Math.cos((180 - config.azimuthAngle) * (Math.PI / 180));
  
  return actualEfficiency * tiltFactor * azimuthFactor;
}

export function calculateSeasonalProduction(
  latitude: number,
  config: PanelConfiguration,
  systemSize: number
): SeasonalData[] {
  const seasons: SeasonalData[] = [];
  
  // Calculate for each month
  for (let month = 1; month <= 12; month++) {
    // Approximate day of year for middle of each month
    const dayOfYear = Math.floor((month - 1) * 30.44 + 15);
    
    // Estimate average temperature for the month (simplified)
    const avgTemp = estimateMonthlyTemperature(latitude, month);
    
    // Adjust shading factor seasonally (simplified)
    const seasonalShading = adjustSeasonalShading(config.shadingFactor, month, latitude);
    
    const monthConfig: PanelConfiguration = {
      ...config,
      temperature: avgTemp,
      shadingFactor: seasonalShading
    };
    
    // Calculate average daily irradiance for the month
    const solarIrradiance = calculateSolarIrradiance(latitude, monthConfig, dayOfYear);
    
    // Calculate expected production (kWh)
    const hoursOfDaylight = calculateDaylightHours(latitude, dayOfYear);
    const expectedProduction = (solarIrradiance * hoursOfDaylight * systemSize) / 1000;
    
    seasons.push({
      month,
      solarIrradiance,
      temperature: avgTemp,
      shadingFactor: seasonalShading,
      expectedProduction
    });
  }
  
  return seasons;
}

function estimateMonthlyTemperature(latitude: number, month: number): number {
  // Simplified temperature model based on latitude and month
  const baseTemp = 25 - (Math.abs(latitude) / 3);
  const seasonalVariation = 10 * Math.cos((month - 6) * Math.PI / 6);
  return baseTemp + seasonalVariation;
}

function adjustSeasonalShading(
  baseShading: number,
  month: number,
  latitude: number
): number {
  // Adjust shading based on sun's elevation in different seasons
  const seasonalFactor = Math.cos((month - 6) * Math.PI / 6);
  const latitudeFactor = Math.abs(latitude) / 90;
  
  // Increase shading in winter months, decrease in summer
  const adjustment = 0.1 * seasonalFactor * latitudeFactor;
  
  return Math.min(1, Math.max(0, baseShading + adjustment));
}

function calculateDaylightHours(latitude: number, dayOfYear: number): number {
  const declination = 23.45 * Math.sin((360 / 365) * (dayOfYear - 81) * (Math.PI / 180));
  const latRad = latitude * (Math.PI / 180);
  const decRad = declination * (Math.PI / 180);
  
  const cosHourAngle = -Math.tan(latRad) * Math.tan(decRad);
  
  // Ensure the value is within valid range for acos
  const hourAngle = Math.acos(Math.max(-1, Math.min(1, cosHourAngle)));
  
  // Convert from radians to hours
  return (2 * hourAngle * 180) / (15 * Math.PI);
}