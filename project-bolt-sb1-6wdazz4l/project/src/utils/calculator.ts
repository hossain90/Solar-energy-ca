import { PanelConfiguration, CalculatorResults, AdvancedCalculatorResults } from '../types/calculator';
import { calculateSolarIrradiance, calculateSeasonalProduction } from './solarCalculations';

interface CalculateParams {
  projectType: string;
  systemType: string;
  location: string;
  consumption: number;
  batteryBackup: boolean;
  autonomyDays: number;
  panelEfficiency: number;
  currency: string;
  isProfessional: boolean;
  solarData?: any;
  advancedConfig?: PanelConfiguration | null;
}

const PANEL_WATTAGE = 400; // Watts per panel
const BATTERY_EFFICIENCY = 0.9;
const INVERTER_EFFICIENCY = 0.96;
const AVERAGE_INSTALLATION_COST_PER_WATT = 2.5;

export function calculateSolarSystem(params: CalculateParams): CalculatorResults | AdvancedCalculatorResults {
  const {
    consumption,
    batteryBackup,
    autonomyDays,
    panelEfficiency,
    currency,
    isProfessional,
    solarData,
    advancedConfig
  } = params;

  // Calculate base system size in kW
  const dailyEnergyNeeded = consumption; // kWh
  const averageSunHours = solarData?.annualIrradiance || 5; // Default to 5 hours if no data
  
  let systemEfficiency = panelEfficiency / 100;
  
  // Apply advanced configuration adjustments if available
  if (isProfessional && advancedConfig) {
    const currentDate = new Date();
    const dayOfYear = Math.floor((currentDate.getTime() - new Date(currentDate.getFullYear(), 0, 0).getTime()) / 86400000);
    
    // Calculate actual irradiance based on panel configuration
    const actualIrradiance = calculateSolarIrradiance(
      solarData?.latitude || 0,
      advancedConfig,
      dayOfYear
    );
    
    // Adjust system efficiency based on advanced configuration
    systemEfficiency *= (1 - advancedConfig.shadingFactor);
  }

  // Calculate system size with efficiencies
  const systemSize = (dailyEnergyNeeded / (averageSunHours * systemEfficiency * INVERTER_EFFICIENCY));
  
  // Calculate number of panels
  const numberOfPanels = Math.ceil((systemSize * 1000) / PANEL_WATTAGE);
  
  // Calculate actual system size based on number of panels
  const actualSystemSize = (numberOfPanels * PANEL_WATTAGE) / 1000;
  
  // Calculate daily production
  const dailyProduction = actualSystemSize * averageSunHours * systemEfficiency * INVERTER_EFFICIENCY;
  
  // Calculate battery size if needed
  let batterySize = null;
  if (batteryBackup) {
    batterySize = (consumption * autonomyDays * 1000) / BATTERY_EFFICIENCY;
  }

  // Calculate costs
  const panelsCost = actualSystemSize * 1000 * 0.5; // $0.50 per watt for panels
  const inverterCost = actualSystemSize * 1000 * 0.3; // $0.30 per watt for inverter
  const mountingCost = actualSystemSize * 1000 * 0.2; // $0.20 per watt for mounting
  const batteryCost = batterySize ? batterySize * 0.5 : 0; // $0.50 per Wh for batteries
  const installationCost = actualSystemSize * 1000 * AVERAGE_INSTALLATION_COST_PER_WATT;
  const permitsCost = 2500; // Fixed cost for permits

  const totalCost = panelsCost + inverterCost + mountingCost + batteryCost + installationCost + permitsCost;

  // Calculate savings
  const electricityRate = 0.15; // Average electricity rate per kWh
  const annualProduction = dailyProduction * 365;
  const annualSavings = annualProduction * electricityRate;
  const monthlyPayment = totalCost / 240; // 20-year financing
  const monthlySavings = annualSavings / 12;
  const paybackPeriod = totalCost / annualSavings;
  const twentyYearSavings = (annualSavings * 20) - totalCost;

  const baseResults: CalculatorResults = {
    systemSize: actualSystemSize,
    numberOfPanels,
    dailyProduction,
    batterySize,
    costs: {
      total: totalCost,
      breakdown: {
        panels: panelsCost,
        inverter: inverterCost,
        mounting: mountingCost,
        ...(batterySize && { battery: batteryCost }),
        installation: installationCost,
        permits: permitsCost
      }
    },
    savings: {
      annual: annualSavings,
      monthly: monthlySavings,
      paybackPeriod,
      twentyYearSavings
    }
  };

  // Add advanced calculations if in professional mode with advanced config
  if (isProfessional && advancedConfig && solarData?.latitude) {
    const seasonalData = calculateSeasonalProduction(
      solarData.latitude,
      advancedConfig,
      actualSystemSize
    );

    const advancedResults: AdvancedCalculatorResults = {
      ...baseResults,
      seasonalProduction: seasonalData,
      optimalTilt: 0, // Will be calculated by AdvancedSolarConfig
      optimalAzimuth: 0, // Will be calculated by AdvancedSolarConfig
      annualProduction,
      efficiencyLoss: {
        temperature: (25 - advancedConfig.temperature) * 0.004, // 0.4% per degree above 25°C
        shading: advancedConfig.shadingFactor,
        soiling: 0.02, // Typical value for soiling losses
        total: 0 // Will be calculated by AdvancedSolarConfig
      }
    };

    return advancedResults;
  }

  return baseResults;
}