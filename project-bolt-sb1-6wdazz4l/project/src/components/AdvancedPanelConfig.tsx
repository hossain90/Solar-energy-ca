import React, { useState, useEffect } from 'react';
import { SolarPanel } from './SolarPanel';
import Tooltip from './Tooltip';
import { tooltips } from '../data/tooltips';

interface AdvancedPanelConfigProps {
  latitude: number;
  onChange: (config: {
    tiltAngle: number;
    azimuthAngle: number;
    shadingFactor: number;
    temperature: number;
  }) => void;
}

export const AdvancedPanelConfig: React.FC<AdvancedPanelConfigProps> = ({
  latitude,
  onChange
}) => {
  const [tiltAngle, setTiltAngle] = useState(latitude - 10);
  const [azimuthAngle, setAzimuthAngle] = useState(180);
  const [shadingFactor, setShadingFactor] = useState(0);
  const [temperature, setTemperature] = useState(25);

  useEffect(() => {
    onChange({
      tiltAngle,
      azimuthAngle,
      shadingFactor: shadingFactor / 100,
      temperature
    });
  }, [tiltAngle, azimuthAngle, shadingFactor, temperature, onChange]);

  const handleTiltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setTiltAngle(Math.min(90, Math.max(0, value)));
  };

  const handleAzimuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setAzimuthAngle(Math.min(360, Math.max(0, value)));
  };

  const handleShadingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setShadingFactor(Math.min(100, Math.max(0, value)));
  };

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setTemperature(Math.min(50, Math.max(-10, value)));
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium mb-6">Panel Configuration</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <SolarPanel
            tiltAngle={tiltAngle}
            azimuthAngle={azimuthAngle}
            width={240}
            height={160}
          />
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center mb-2">
              <label htmlFor="tiltAngle" className="text-sm font-medium text-gray-700">
                Tilt Angle
              </label>
              <Tooltip content={tooltips.tiltAngle}>
                <span className="ml-1 text-gray-400">ℹ️</span>
              </Tooltip>
            </div>
            <input
              type="range"
              id="tiltAngle"
              min="0"
              max="90"
              value={tiltAngle}
              onChange={handleTiltChange}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>0°</span>
              <span>{tiltAngle}°</span>
              <span>90°</span>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-2">
              <label htmlFor="azimuthAngle" className="text-sm font-medium text-gray-700">
                Azimuth Angle
              </label>
              <Tooltip content={tooltips.azimuthAngle}>
                <span className="ml-1 text-gray-400">ℹ️</span>
              </Tooltip>
            </div>
            <input
              type="range"
              id="azimuthAngle"
              min="0"
              max="360"
              value={azimuthAngle}
              onChange={handleAzimuthChange}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>0°</span>
              <span>{azimuthAngle}°</span>
              <span>360°</span>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-2">
              <label htmlFor="shadingFactor" className="text-sm font-medium text-gray-700">
                Shading Factor
              </label>
              <Tooltip content={tooltips.shadingFactor}>
                <span className="ml-1 text-gray-400">ℹ️</span>
              </Tooltip>
            </div>
            <input
              type="range"
              id="shadingFactor"
              min="0"
              max="100"
              value={shadingFactor}
              onChange={handleShadingChange}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>0%</span>
              <span>{shadingFactor}%</span>
              <span>100%</span>
            </div>
          </div>

          <div>
            <div className="flex items-center mb-2">
              <label htmlFor="temperature" className="text-sm font-medium text-gray-700">
                Average Temperature
              </label>
              <Tooltip content={tooltips.temperatureEffect}>
                <span className="ml-1 text-gray-400">ℹ️</span>
              </Tooltip>
            </div>
            <input
              type="range"
              id="temperature"
              min="-10"
              max="50"
              value={temperature}
              onChange={handleTemperatureChange}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>-10°C</span>
              <span>{temperature}°C</span>
              <span>50°C</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};