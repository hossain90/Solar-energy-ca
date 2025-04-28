import React from 'react';
import Tooltip from './Tooltip';
import { tooltips } from '../data/tooltips';

interface EnvironmentalImpactProps {
  annualProduction: number; // in kWh
  systemLifespan?: number; // in years
}

export const EnvironmentalImpact: React.FC<EnvironmentalImpactProps> = ({
  annualProduction,
  systemLifespan = 25
}) => {
  // Environmental impact calculations
  const co2PerKwh = 0.855; // kg CO2 per kWh (grid average)
  const treesPerTonCo2 = 45; // trees needed to absorb 1 metric ton of CO2 per year
  const waterSavedPerKwh = 0.5; // gallons of water saved per kWh (thermal power plants)
  
  const annualCo2Reduction = (annualProduction * co2PerKwh) / 1000; // metric tons
  const lifetimeCo2Reduction = annualCo2Reduction * systemLifespan;
  const equivalentTrees = Math.round(annualCo2Reduction * treesPerTonCo2);
  const annualWaterSaved = Math.round(annualProduction * waterSavedPerKwh);

  const metrics = [
    {
      label: 'Annual CO₂ Reduction',
      value: `${annualCo2Reduction.toFixed(1)} metric tons`,
      tooltip: 'Amount of carbon dioxide emissions avoided by using solar power instead of grid electricity'
    },
    {
      label: 'Lifetime CO₂ Reduction',
      value: `${lifetimeCo2Reduction.toFixed(1)} metric tons`,
      tooltip: `Total CO₂ emissions avoided over the ${systemLifespan}-year system lifespan`
    },
    {
      label: 'Equivalent Trees Planted',
      value: equivalentTrees.toLocaleString(),
      tooltip: 'Number of trees needed to absorb the same amount of CO₂ annually'
    },
    {
      label: 'Annual Water Saved',
      value: `${annualWaterSaved.toLocaleString()} gallons`,
      tooltip: 'Amount of water saved by not using thermal power generation'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center mb-6">
        <h3 className="text-lg font-medium">Environmental Impact</h3>
        <Tooltip content={tooltips.environmentalImpact}>
          <span className="ml-1 text-gray-400">ℹ️</span>
        </Tooltip>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="p-4 bg-green-50 rounded-lg border border-green-100"
          >
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-green-800">{metric.label}</span>
              <Tooltip content={metric.tooltip}>
                <span className="ml-1 text-gray-400">ℹ️</span>
              </Tooltip>
            </div>
            <div className="text-2xl font-semibold text-green-700">{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm text-gray-500">
        * Calculations based on average grid emissions and standard environmental conversion factors.
        Actual impact may vary based on your location and local energy mix.
      </div>
    </div>
  );
};