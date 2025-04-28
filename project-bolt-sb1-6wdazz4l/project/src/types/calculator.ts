export interface Location {
  name: string;
  sunHours: number;
}

export interface CustomLocation {
  lat: number;
  lng: number;
  sunData: {
    annualIrradiance: number;
    monthlyIrradiance: number[];
  };
}

export interface ProjectType {
  id: string;
  name: string;
  description: string;
}

export interface SystemType {
  id: string;
  name: string;
  description: string;
  requiresBattery: boolean;
}

export interface CostBreakdown {
  panels: number;
  inverter: number;
  mounting: number;
  battery?: number;
  installation: number;
  permits: number;
}

export interface SavingsCalculation {
  annual: number;
  monthly: number;
  paybackPeriod: number;
  twentyYearSavings: number;
}

export interface CalculatorResults {
  systemSize: number;
  numberOfPanels: number;
  dailyProduction: number;
  batterySize?: number;
  costs: {
    total: number;
    breakdown: CostBreakdown;
  };
  savings: SavingsCalculation;
  id?: string;
}

export interface PanelConfiguration {
  tiltAngle: number;
  azimuthAngle: number;
  shadingFactor: number;
  efficiency: number;
  temperature: number;
}

export interface SeasonalData {
  month: number;
  solarIrradiance: number;
  temperature: number;
  shadingFactor: number;
  expectedProduction: number;
}

export interface AdvancedCalculatorResults extends CalculatorResults {
  seasonalProduction: SeasonalData[];
  optimalTilt: number;
  optimalAzimuth: number;
  annualProduction: number;
  efficiencyLoss: {
    temperature: number;
    shading: number;
    soiling: number;
    total: number;
  };
}