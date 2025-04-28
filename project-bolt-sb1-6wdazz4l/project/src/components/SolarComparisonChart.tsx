import React from 'react';
import { Line } from 'react-chartjs-2';
import { CalculatorResults } from '../types/calculator';

interface SolarComparisonChartProps {
  systems: CalculatorResults[];
  currencySymbol: string;
}

export const SolarComparisonChart: React.FC<SolarComparisonChartProps> = ({
  systems,
  currencySymbol
}) => {
  // Calculate cumulative savings over 20 years
  const yearLabels = Array.from({ length: 21 }, (_, i) => i);
  const datasets = systems.map((system, index) => {
    const cumulativeSavings = yearLabels.map(year => {
      const initialCost = system.costs.total;
      const annualSavings = system.savings.annual;
      return -initialCost + (annualSavings * year);
    });

    return {
      label: `System ${index + 1}`,
      data: cumulativeSavings,
      borderColor: index === 0 ? 'rgb(75, 192, 192)' : 'rgb(255, 159, 64)',
      tension: 0.1,
      fill: false
    };
  });

  const chartData = {
    labels: yearLabels,
    datasets
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Cumulative Savings Over Time'
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y;
            return `${context.dataset.label}: ${currencySymbol}${value.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })}`;
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Years'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Cumulative Savings'
        },
        ticks: {
          callback: (value: number) => 
            `${currencySymbol}${value.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })}`
        }
      }
    }
  };

  if (systems.length < 2) {
    return (
      <div className="text-center text-gray-500 py-8">
        Add another system configuration to compare savings over time
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <Line data={chartData} options={chartOptions} />
      <div className="mt-4 space-y-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">System</th>
              <th className="text-right py-2">Initial Cost</th>
              <th className="text-right py-2">Annual Savings</th>
              <th className="text-right py-2">Payback Period</th>
            </tr>
          </thead>
          <tbody>
            {systems.map((system, index) => (
              <tr key={index} className="border-b last:border-0">
                <td className="py-2">System {index + 1}</td>
                <td className="text-right">{currencySymbol}{system.costs.total.toLocaleString()}</td>
                <td className="text-right">{currencySymbol}{system.savings.annual.toLocaleString()}</td>
                <td className="text-right">{system.savings.paybackPeriod.toFixed(1)} years</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};