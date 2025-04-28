import React from 'react';
import { Compass, Sun, Ruler, Shield, Zap, CheckCircle } from 'lucide-react';

const InstallationTips: React.FC = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Solar Installation Tips</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional guidance to ensure your solar installation is optimized for maximum efficiency and longevity.
          </p>
        </div>

        <div className="space-y-8">
          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <Compass className="w-8 h-8 text-blue-500 mr-3" />
              <h2 className="text-2xl font-semibold">Optimal Panel Placement</h2>
            </div>
            <div className="prose max-w-none">
              <p>
                The effectiveness of your solar installation heavily depends on proper panel placement. Consider these key factors:
              </p>
              <ul>
                <li>Roof orientation (south-facing is optimal in the northern hemisphere)</li>
                <li>Roof angle (typically 30-45 degrees is ideal)</li>
                <li>Shade analysis throughout the day</li>
                <li>Local weather patterns and sun path</li>
              </ul>
              <p>
                Pro tip: Use solar pathfinder tools to analyze potential shading issues throughout the year.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <Shield className="w-8 h-8 text-green-500 mr-3" />
              <h2 className="text-2xl font-semibold">Safety Considerations</h2>
            </div>
            <div className="prose max-w-none">
              <p>
                Safety should be your top priority during installation. Essential safety measures include:
              </p>
              <ul>
                <li>Proper roof safety equipment and harnesses</li>
                <li>Electrical safety protocols and proper grounding</li>
                <li>Weather considerations during installation</li>
                <li>Compliance with local building codes</li>
              </ul>
              <p>
                Remember: Always consult with certified professionals for complex electrical work.
              </p>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <Ruler className="w-8 h-8 text-purple-500 mr-3" />
              <h2 className="text-2xl font-semibold">Installation Best Practices</h2>
            </div>
            <div className="prose max-w-none">
              <p>
                Follow these best practices to ensure a successful installation:
              </p>
              <ul>
                <li>Conduct thorough roof structural assessment</li>
                <li>Use appropriate mounting hardware for your roof type</li>
                <li>Maintain proper spacing between panels for ventilation</li>
                <li>Install proper flashing to prevent water infiltration</li>
                <li>Label all electrical components clearly</li>
              </ul>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6">
              <Zap className="w-8 h-8 text-yellow-500 mr-3" />
              <h2 className="text-2xl font-semibold">System Testing</h2>
            </div>
            <div className="prose max-w-none">
              <p>
                Before finalizing the installation, complete these essential tests:
              </p>
              <ul>
                <li>Voltage and current measurements for each string</li>
                <li>Proper grounding verification</li>
                <li>Inverter functionality testing</li>
                <li>Monitoring system setup and verification</li>
                <li>Performance ratio calculation</li>
              </ul>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Installation Checklist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Obtain necessary permits and approvals",
                "Complete site assessment and shade analysis",
                "Verify structural integrity of roof",
                "Plan panel layout and wiring routes",
                "Install mounting hardware and flashing",
                "Mount solar panels and secure connections",
                "Install inverter and electrical equipment",
                "Complete system wiring and grounding",
                "Test all connections and components",
                "Set up monitoring system",
                "Schedule inspection with local authorities",
                "Document system specifications and warranty info"
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InstallationTips;