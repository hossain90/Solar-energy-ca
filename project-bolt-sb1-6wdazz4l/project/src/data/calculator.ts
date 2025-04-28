import { ProjectType, SystemType } from '../types/calculator';
import { Building2, Factory, Warehouse, Home, Hotel, Store, School } from 'lucide-react';

export const projectTypes: ProjectType[] = [
  {
    id: 'residential-small',
    name: 'Small Residential',
    description: 'For apartments and small homes under 1,500 sq ft',
    icon: Home.name,
    baseLoad: 20,
    efficiencyMultiplier: 1.0
  },
  {
    id: 'residential-large',
    name: 'Large Residential',
    description: 'For houses over 1,500 sq ft',
    icon: Home.name,
    baseLoad: 35,
    efficiencyMultiplier: 0.95
  },
  {
    id: 'commercial-retail',
    name: 'Retail',
    description: 'For shops and retail spaces',
    icon: Store.name,
    baseLoad: 50,
    efficiencyMultiplier: 0.9
  },
  {
    id: 'commercial-office',
    name: 'Office Building',
    description: 'For office spaces and corporate buildings',
    icon: Building2.name,
    baseLoad: 75,
    efficiencyMultiplier: 0.85
  },
  {
    id: 'institutional',
    name: 'Institutional',
    description: 'For schools, hospitals, and public buildings',
    icon: School.name,
    baseLoad: 100,
    efficiencyMultiplier: 0.8
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    description: 'For hotels and restaurants',
    icon: Hotel.name,
    baseLoad: 80,
    efficiencyMultiplier: 0.85
  },
  {
    id: 'agricultural',
    name: 'Agricultural',
    description: 'For farms and agricultural facilities',
    icon: Warehouse.name,
    baseLoad: 60,
    efficiencyMultiplier: 0.9
  },
  {
    id: 'industrial',
    name: 'Industrial',
    description: 'For manufacturing and industrial facilities',
    icon: Factory.name,
    baseLoad: 150,
    efficiencyMultiplier: 0.75
  }
];

export const systemTypes: SystemType[] = [
  {
    id: 'on-grid',
    name: 'Grid-Tied System',
    description: 'Connected to the utility grid, no battery required',
    requiresBattery: false,
    efficiency: 0.95
  },
  {
    id: 'off-grid',
    name: 'Off-Grid System',
    description: 'Completely independent from the utility grid',
    requiresBattery: true,
    efficiency: 0.85
  },
  {
    id: 'hybrid',
    name: 'Hybrid System',
    description: 'Connected to grid with battery backup',
    requiresBattery: true,
    efficiency: 0.90
  }
];

export const defaultPrices = {
  USD: {
    panelPerWatt: 0.70,
    inverterPerWatt: 0.40,
    batteryPerKwh: 500,
    installation: 1000,
    mounting: 0.20,
    wiring: 0.15,
    monitoring: 300,
    permits: 500,
    electricityRate: 0.14 // Average US electricity rate per kWh
  },
  EUR: {
    panelPerWatt: 0.60,
    inverterPerWatt: 0.35,
    batteryPerKwh: 450,
    installation: 900,
    mounting: 0.18,
    wiring: 0.13,
    monitoring: 250,
    permits: 400,
    electricityRate: 0.25 // Average EU electricity rate per kWh
  },
  GBP: {
    panelPerWatt: 0.55,
    inverterPerWatt: 0.32,
    batteryPerKwh: 400,
    installation: 800,
    mounting: 0.16,
    wiring: 0.12,
    monitoring: 220,
    permits: 350,
    electricityRate: 0.21 // Average UK electricity rate per kWh
  },
  AUD: {
    panelPerWatt: 0.85,
    inverterPerWatt: 0.45,
    batteryPerKwh: 550,
    installation: 1200,
    mounting: 0.22,
    wiring: 0.17,
    monitoring: 350,
    permits: 600,
    electricityRate: 0.20 // Average AU electricity rate per kWh
  },
  CAD: {
    panelPerWatt: 0.80,
    inverterPerWatt: 0.42,
    batteryPerKwh: 520,
    installation: 1100,
    mounting: 0.21,
    wiring: 0.16,
    monitoring: 320,
    permits: 550,
    electricityRate: 0.13 // Average CA electricity rate per kWh
  }
};

export const currencySymbols: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  AUD: 'A$',
  CAD: 'C$'
};

export const sunHours: Record<string, number> = {
  'New York': 4.5,
  'Los Angeles': 5.5,
  'Miami': 5.8,
  'Chicago': 4.2,
  'Houston': 5.0,
  'Phoenix': 6.5,
  'Seattle': 3.8,
  'Denver': 5.7,
  'Boston': 4.3,
  'Atlanta': 5.2,
  'San Francisco': 5.3,
  'Las Vegas': 6.4,
  'Portland': 3.9,
  'Austin': 5.4,
  'Orlando': 5.7,
  'Toronto': 3.8,
  'Vancouver': 3.3,
  'London': 2.8,
  'Berlin': 3.0,
  'Paris': 3.5,
  'Madrid': 5.1,
  'Rome': 4.7,
  'Sydney': 4.9,
  'Melbourne': 4.2,
  'Brisbane': 5.2
};

export const efficiencyFactors = {
  temperature: {
    hot: 0.90,
    moderate: 0.95,
    cold: 0.98
  },
  shading: {
    none: 1.0,
    partial: 0.85,
    significant: 0.70
  },
  orientation: {
    optimal: 1.0,
    suboptimal: 0.85,
    poor: 0.70
  }
};