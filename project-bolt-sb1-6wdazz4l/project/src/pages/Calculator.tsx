import React, { useState, useEffect } from 'react';
import { LocationMap } from '../components/LocationMap';
import { MonthlyProductionChart } from '../components/Charts';
import { AdvancedPanelConfig } from '../components/AdvancedPanelConfig';
import { EnvironmentalImpact } from '../components/EnvironmentalImpact';
import { IncentivesDisplay } from '../components/IncentivesDisplay';
import { EnergyAnimation } from '../components/EnergyAnimation';
import { incentivesService } from '../services/incentivesService';
import { CustomLocation } from '../types/calculator';
import Tooltip from '../components/Tooltip';
import { tooltips } from '../data/tooltips';

export const Calculator: React.FC = () => {
  const [location, setLocation] = useState<CustomLocation | null>(null);
  const [dailyConsumption, setDailyConsumption] = useState(30);
  const [panelConfig, setPanelConfig] = useState({
    tiltAngle: 35,
    azimuthAngle: 180,
    shadingFactor: 0,
    temperature: 25
  });
  const [incentives, setIncentives] = useState<any>(null);
  const currencySymbol = '$';

  // Calculate system metrics
  const systemSize = dailyConsumption * 0.25; // Simple estimation
  const systemCost = systemSize * 2800; // Average cost per kW
  const monthlyProduction = Array(12).fill(0).map((_, i) => {
    const seasonalFactor = 1 + Math.sin((i - 2) * Math.PI / 12) * 0.3;
    return dailyConsumption * 30 * seasonalFactor * (1 - panelConfig.shadingFactor);
  });
  const annualProduction = monthlyProduction.reduce((a, b) => a + b, 0);

  useEffect(() => {
    const fetchIncentives = async () => {
      if (location) {
        const locationData = await incentivesService.getIncentivesByZipCode('94105');
        const incentivesData = await incentivesService.calculateIncentives(
          systemCost,
          locationData
        );
        setIncentives(incentivesData);
      }
    };
    fetchIncentives();
  }, [location, systemCost]);

  const handleLocationSelect = async (newLocation: CustomLocation) => {
    setLocation(newLocation);
    setPanelConfig(prev => ({
      ...prev,
      tiltAngle: Math.max(0, Math.min(90, newLocation.lat - 10))
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Solar Calculator
        </h1>
        <p className="text-xl text-gray-600">
          Design your solar system and calculate potential savings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">1. Select Location</h2>
          <LocationMap onLocationSelect={handleLocationSelect} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">2. Energy Consumption</h2>
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center mb-4">
              <label htmlFor="consumption" className="text-gray-700 font-medium">
                Daily Consumption (kWh)
              </label>
              <Tooltip content={tooltips.dailyConsumption}>
                <span className="ml-1 text-gray-400">ℹ️</span>
              </Tooltip>
            </div>
            <input
              type="range"
              id="consumption"
              min="5"
              max="100"
              value={dailyConsumption}
              onChange={(e) => setDailyConsumption(Number(e.target.value))}
              className="w-full mb-2"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>5 kWh</span>
              <span>{dailyConsumption} kWh</span>
              <span>100 kWh</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">3. Panel Configuration</h2>
        <AdvancedPanelConfig
          latitude={location?.lat ?? 37.7749}
          onChange={setPanelConfig}
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">4. System Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EnergyAnimation
            solarProduction={systemSize}
            consumption={dailyConsumption / 24}
            batteryCapacity={5}
            isCharging={true}
          />
          <MonthlyProductionChart
            monthlyData={monthlyProduction}
            currencySymbol={currencySymbol}
            electricityRate={0.15}
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">5. Environmental Impact</h2>
        <EnvironmentalImpact
          annualProduction={annualProduction}
          systemLifespan={25}
        />
      </div>

      {incentives && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">6. Available Incentives</h2>
          <IncentivesDisplay
            federalIncentives={incentives.federalIncentives}
            stateIncentives={incentives.stateIncentives}
            utilityIncentives={incentives.utilityIncentives}
            totalIncentives={incentives.totalIncentives}
            systemCost={systemCost}
            currencySymbol={currencySymbol}
          />
        </div>
      )}
    </div>
  );
};