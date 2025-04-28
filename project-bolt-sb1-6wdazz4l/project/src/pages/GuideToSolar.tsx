import React from 'react';
import { BookOpen, Sun, Battery, Tool, LineChart } from 'lucide-react';

const GuideToSolar: React.FC = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Guide to Solar Energy</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about solar energy, from basic concepts to advanced installation details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-4">
              <Sun className="w-8 h-8 text-yellow-500 mr-3" />
              <h2 className="text-2xl font-semibold">Solar Basics</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Understand how solar panels work and the fundamental principles of solar energy conversion.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• How solar panels generate electricity</li>
              <li>• Types of solar panels</li>
              <li>• Efficiency ratings explained</li>
              <li>• Peak sun hours and production</li>
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-4">
              <Battery className="w-8 h-8 text-green-500 mr-3" />
              <h2 className="text-2xl font-semibold">Energy Storage</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Learn about battery systems and how to store excess solar energy for later use.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Battery types and technologies</li>
              <li>• Storage capacity planning</li>
              <li>• Grid connection vs. off-grid</li>
              <li>• Battery maintenance</li>
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-4">
              <Tool className="w-8 h-8 text-blue-500 mr-3" />
              <h2 className="text-2xl font-semibold">System Components</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Discover all the essential components that make up a complete solar power system.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Solar panels and mounting</li>
              <li>• Inverters and optimizers</li>
              <li>• Monitoring systems</li>
              <li>• Safety equipment</li>
            </ul>
          </section>

          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-4">
              <LineChart className="w-8 h-8 text-purple-500 mr-3" />
              <h2 className="text-2xl font-semibold">Performance & ROI</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Calculate your potential savings and understand system performance metrics.
            </p>
            <ul className="space-y-2 text-gray-700">
              <li>• Energy production calculations</li>
              <li>• Cost-benefit analysis</li>
              <li>• Tax incentives and rebates</li>
              <li>• Performance monitoring</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GuideToSolar;