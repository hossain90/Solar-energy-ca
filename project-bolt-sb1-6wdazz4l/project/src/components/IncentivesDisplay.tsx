import React from 'react';
import { Incentive } from '../services/incentivesService';
import Tooltip from './Tooltip';
import { tooltips } from '../data/tooltips';

interface IncentivesDisplayProps {
  federalIncentives: Incentive[];
  stateIncentives: Incentive[];
  utilityIncentives: Incentive[];
  totalIncentives: number;
  systemCost: number;
  currencySymbol: string;
}

export const IncentivesDisplay: React.FC<IncentivesDisplayProps> = ({
  federalIncentives,
  stateIncentives,
  utilityIncentives,
  totalIncentives,
  systemCost,
  currencySymbol
}) => {
  const effectiveCost = systemCost - totalIncentives;
  const savingsPercent = (totalIncentives / systemCost) * 100;

  const renderIncentiveSection = (title: string, incentives: Incentive[]) => {
    if (incentives.length === 0) return null;

    return (
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-4">{title}</h4>
        <div className="space-y-4">
          {incentives.map((incentive, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900">{incentive.name}</h5>
                  <p className="text-sm text-gray-600">{incentive.description}</p>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-lg font-semibold text-green-600">
                    {currencySymbol}{incentive.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {incentive.type.replace('_', ' ')}
                  </div>
                </div>
              </div>

              {incentive.requirements && (
                <div className="mt-3">
                  <h6 className="text-sm font-medium text-gray-700 mb-2">Requirements:</h6>
                  <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                    {incentive.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {incentive.expirationDate && (
                <div className="mt-2 text-sm text-amber-600">
                  Expires: {new Date(incentive.expirationDate).toLocaleDateString()}
                </div>
              )}

              {incentive.link && (
                <a
                  href={incentive.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm text-blue-600 hover:text-blue-800"
                >
                  Learn more →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-medium">Available Incentives</h3>
        <Tooltip content={tooltips.incentives}>
          <span className="text-gray-400">ℹ️</span>
        </Tooltip>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">System Cost</div>
          <div className="text-2xl font-semibold">
            {currencySymbol}{systemCost.toLocaleString()}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-green-200">
          <div className="text-sm text-gray-600 mb-1">Total Incentives</div>
          <div className="text-2xl font-semibold text-green-600">
            {currencySymbol}{totalIncentives.toLocaleString()}
            <span className="text-sm text-green-500 ml-1">
              ({savingsPercent.toFixed(1)}% savings)
            </span>
          </div>
        </div>
      </div>

      <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="text-sm text-gray-600 mb-1">Effective Cost After Incentives</div>
        <div className="text-3xl font-semibold text-blue-600">
          {currencySymbol}{effectiveCost.toLocaleString()}
        </div>
      </div>

      {renderIncentiveSection('Federal Incentives', federalIncentives)}
      {renderIncentiveSection('State Incentives', stateIncentives)}
      {renderIncentiveSection('Utility Incentives', utilityIncentives)}

      <div className="text-sm text-gray-500 mt-6">
        * Actual incentive amounts may vary. Consult with a tax professional and your local utility
        company for the most accurate information.
      </div>
    </div>
  );
};