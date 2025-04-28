import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MonthlyProductionChartProps {
  monthlyData: number[];
  currencySymbol: string;
  electricityRate: number;
}

export const MonthlyProductionChart: React.FC<MonthlyProductionChartProps> = ({
  monthlyData,
  currencySymbol,
  electricityRate
}) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const data = {
    labels: months,
    datasets: [
      {
        type: 'line' as const,
        label: 'Energy Production (kWh)',
        data: monthlyData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.1)',
        yAxisID: 'y',
        fill: true,
        tension: 0.4
      },
      {
        type: 'bar' as const,
        label: 'Savings',
        data: monthlyData.map(kwh => kwh * electricityRate),
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderColor: 'rgb(255, 159, 64)',
        yAxisID: 'y1',
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: 'Monthly Solar Production & Savings'
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            if (context.datasetIndex === 0) {
              return `Production: ${value.toFixed(1)} kWh`;
            } else {
              return `Savings: ${currencySymbol}${value.toFixed(2)}`;
            }
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Energy Production (kWh)'
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: `Savings (${currencySymbol})`
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <Line data={data} options={options} />
      <div className="mt-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-700">Peak Production Month</p>
            <p className="text-gray-600">
              {months[monthlyData.indexOf(Math.max(...monthlyData))]}
              {' - '}
              {Math.max(...monthlyData).toFixed(1)} kWh
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Lowest Production Month</p>
            <p className="text-gray-600">
              {months[monthlyData.indexOf(Math.min(...monthlyData))]}
              {' - '}
              {Math.min(...monthlyData).toFixed(1)} kWh
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Average Monthly Production</p>
            <p className="text-gray-600">
              {(monthlyData.reduce((a, b) => a + b, 0) / 12).toFixed(1)} kWh
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Average Monthly Savings</p>
            <p className="text-gray-600">
              {currencySymbol}
              {((monthlyData.reduce((a, b) => a + b, 0) / 12) * electricityRate).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};