import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { PanelConfiguration, SeasonalData } from '../types/calculator';
import Tooltip from './Tooltip';
import {
  calculateOptimalTilt,
  calculateOptimalAzimuth,
  calculateSeasonalProduction
} from '../utils/solarCalculations';

interface AdvancedSolarConfigProps {
  latitude: number;
  systemSize: number;
  onConfigChange: (config: PanelConfiguration) => void;
}

const AdvancedSolarConfig: React.FC<AdvancedSolarConfigProps> = ({
  latitude,
  systemSize,
  onConfigChange
}) => {
  const [config, setConfig] = useState<PanelConfiguration>({
    tiltAngle: calculateOptimalTilt(latitude),
    azimuthAngle: calculateOptimalAzimuth(latitude),
    shadingFactor: 0.1,
    efficiency: 20,
    temperature: 25
  });

  const [seasonalData, setSeasonalData] = useState<SeasonalData[]>([]);

  useEffect(() => {
    const data = calculateSeasonalProduction(latitude, config, systemSize);
    setSeasonalData(data);
    onConfigChange(config);
  }, [latitude, config, systemSize, onConfigChange]);

  const handleConfigChange = (field: keyof PanelConfiguration, value: number) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const chartData = {
    labels: seasonalData.map(d => new Date(2024, d.month - 1).toLocaleString('default', { month: 'short' })),
    datasets: [
      {
        label: 'Expected Production (kWh/day)',
        data: seasonalData.map(d => d.expectedProduction),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Solar Production Forecast'
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="space-y-4">
            <div>
              <label className="flex items-center justify-between">
                <Tooltip content="Angle of solar panels relative to horizontal surface">
                  <span>Panel Tilt Angle</span>
                </Tooltip>
                <span className="font-medium">{config.tiltAngle.toFixed(1)}°</span>
              </label>
              <input
                type="range"
                min="0"
                max="90"
                step="0.5"
                value={config.tiltAngle}
                onChange={(e) => handleConfigChange('tiltAngle', Number(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-gray-500 flex justify-between">
                <span>0°</span>
                <span>Optimal: {calculateOptimalTilt(latitude).toFixed(1)}°</span>
                <span>90°</span>
              </div>
            </div>

            <div>
              <label className="flex items-center justify-between">
                <Tooltip content="Direction panels face (180° = South, 90° = East, 270° = West)">
                  <span>Azimuth Angle</span>
                </Tooltip>
                <span className="font-medium">{config.azimuthAngle.toFixed(1)}°</span>
              </label>
              <input
                type="range"
                min="0"
                max="360"
                step="1"
                value={config.azimuthAngle}
                onChange={(e) => handleConfigChange('azimuthAngle', Number(e.target.value))}
                className="w-full"
              />
              <div className="text-xs text-gray-500 flex justify-between">
                <span>N (0°)</span>
                <span>E (90°)</span>
                <span>S (180°)</span>
                <span>W (270°)</span>
              </div>
            </div>

            <div>
              <label className="flex items-center justify-between">
                <Tooltip content="Reduction in production due to shadows from trees, buildings, etc.">
                  <span>Shading Factor</span>
                </Tooltip>
                <span className="font-medium">{(config.shadingFactor * 100).toFixed(0)}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={config.shadingFactor}
                onChange={(e) => handleConfigChange('shadingFactor', Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div className="h-64">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Optimal Configuration</h3>
        <p className="text-sm text-gray-600">
          Based on your latitude ({latitude.toFixed(2)}°), the optimal configuration is:
          <br />
          Tilt: {calculateOptimalTilt(latitude).toFixed(1)}° | 
          Azimuth: {calculateOptimalAzimuth(latitude)}° (South-facing)
        </p>
      </div>
    </div>
  );
};

export default AdvancedSolarConfig;