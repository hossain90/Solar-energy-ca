import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sun, 
  Cloud, 
  DollarSign, 
  Leaf, 
  Zap, 
  Lightbulb, 
  ArrowRight, 
  Calendar,
  Shield,
  Wrench,
  Clock,
  Home
} from 'lucide-react';

const Comparison: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'financial' | 'environmental' | 'practical' | 'maintenance'>('financial');
  const [monthlyBill, setMonthlyBill] = useState<number>(150);
  const [systemCost, setSystemCost] = useState<number>(20000);
  const [systemLife, setSystemLife] = useState<number>(25);
  
  const calculateSavings = () => {
    const yearlyBill = monthlyBill * 12;
    const totalGridCost = yearlyBill * systemLife;
    const totalSolarCost = systemCost + (systemCost * 0.05); // Including maintenance
    const savings = totalGridCost - totalSolarCost;
    
    return {
      gridCost: totalGridCost,
      solarCost: totalSolarCost,
      savings: savings
    };
  };
  
  const renderTabContent = () => {
    switch (selectedTab) {
      case 'financial':
        return (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <Sun className="w-8 h-8 text-yellow-500" />
                <h3 className="text-2xl">Solar Energy</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Initial Investment</h4>
                  <p className="text-gray-700">
                    $15,000 - $25,000 for a typical residential system (5-8kW)
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Monthly Cost</h4>
                  <p className="text-gray-700">
                    $0 after installation (except for small grid connection fee)
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Return on Investment</h4>
                  <p className="text-gray-700">
                    Most systems pay for themselves in 7-10 years
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Tax Incentives</h4>
                  <p className="text-gray-700">
                    Federal tax credit of 30% of system costs
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Property Value</h4>
                  <p className="text-gray-700">
                    Can increase home value by up to 4%
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Long-term Benefits</h4>
                  <p className="text-gray-700">
                    Fixed energy costs for 25+ years, protection against rising utility rates
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <Cloud className="w-8 h-8 text-gray-500" />
                <h3 className="text-2xl">Grid Energy</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Initial Investment</h4>
                  <p className="text-gray-700">
                    $0 (no upfront costs)
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Monthly Cost</h4>
                  <p className="text-gray-700">
                    $100 - $200 for average household (increasing annually)
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Return on Investment</h4>
                  <p className="text-gray-700">
                    No return (ongoing expense)
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Tax Incentives</h4>
                  <p className="text-gray-700">
                    None available
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Property Value</h4>
                  <p className="text-gray-700">
                    No impact on home value
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Long-term Costs</h4>
                  <p className="text-gray-700">
                    Subject to utility rate increases, averaging 2-3% annually
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'environmental':
        return (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <Sun className="w-8 h-8 text-yellow-500" />
                <h3 className="text-2xl">Solar Energy</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Carbon Emissions</h4>
                  <p className="text-gray-700">
                    No direct emissions during operation
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Carbon Footprint</h4>
                  <p className="text-gray-700">
                    Small footprint during manufacturing, recovered within 1-3 years of use
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Resource Consumption</h4>
                  <p className="text-gray-700">
                    Uses renewable sunshine, requires no ongoing fuel
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Waste</h4>
                  <p className="text-gray-700">
                    Panels are recyclable at end-of-life (25-30 years)
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Land Use</h4>
                  <p className="text-gray-700">
                    Utilizes existing roof space, no additional land required for residential installations
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Water Usage</h4>
                  <p className="text-gray-700">
                    Minimal water needed for occasional cleaning
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <Cloud className="w-8 h-8 text-gray-500" />
                <h3 className="text-2xl">Grid Energy</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Carbon Emissions</h4>
                  <p className="text-gray-700">
                    Significant emissions from fossil fuel power plants
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Carbon Footprint</h4>
                  <p className="text-gray-700">
                    Average home produces 5-10 tons of CO₂ annually from electricity
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Resource Consumption</h4>
                  <p className="text-gray-700">
                    Consumes finite fossil fuels (coal, natural gas) or uranium
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Waste</h4>
                  <p className="text-gray-700">
                    Produces air pollution, greenhouse gases, and sometimes nuclear waste
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Land Use</h4>
                  <p className="text-gray-700">
                    Requires large power plants and transmission infrastructure
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Water Usage</h4>
                  <p className="text-gray-700">
                    Significant water consumption for cooling in thermal power plants
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'practical':
        return (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <Sun className="w-8 h-8 text-yellow-500" />
                <h3 className="text-2xl">Solar Energy</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Reliability</h4>
                  <p className="text-gray-700">
                    Dependent on weather and daylight hours, can be paired with battery storage
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Maintenance</h4>
                  <p className="text-gray-700">
                    Minimal maintenance, occasional cleaning, inverter replacement every 10-15 years
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Space Requirements</h4>
                  <p className="text-gray-700">
                    Requires sufficient roof or yard space with good sun exposure
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Energy Independence</h4>
                  <p className="text-gray-700">
                    Provides partial to complete energy independence
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Installation Time</h4>
                  <p className="text-gray-700">
                    1-3 days for residential installation
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">System Lifespan</h4>
                  <p className="text-gray-700">
                    25-30 years with proper maintenance
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <Cloud className="w-8 h-8 text-gray-500" />
                <h3 className="text-2xl">Grid Energy</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Reliability</h4>
                  <p className="text-gray-700">
                    Generally reliable, but subject to outages during extreme weather or grid failures
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Maintenance</h4>
                  <p className="text-gray-700">
                    No maintenance required by homeowner
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Space Requirements</h4>
                  <p className="text-gray-700">
                    No space requirements on property
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Energy Independence</h4>
                  <p className="text-gray-700">
                    Complete dependence on utility company and grid infrastructure
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Installation Time</h4>
                  <p className="text-gray-700">
                    Immediate connection available in most areas
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">System Lifespan</h4>
                  <p className="text-gray-700">
                    Continuous service with regular grid maintenance
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'maintenance':
        return (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <Sun className="w-8 h-8 text-yellow-500" />
                <h3 className="text-2xl">Solar Energy</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Regular Maintenance</h4>
                  <p className="text-gray-700">
                    Annual inspection and cleaning
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Component Replacement</h4>
                  <p className="text-gray-700">
                    Inverter: 10-15 years
                    Batteries (if installed): 10-15 years
                    Panels: 25-30 years
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Monitoring</h4>
                  <p className="text-gray-700">
                    Real-time performance monitoring via app or web interface
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Warranty</h4>
                  <p className="text-gray-700">
                    25-year performance warranty on panels
                    10-year warranty on inverter
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Professional Services</h4>
                  <p className="text-gray-700">
                    Annual maintenance contracts available
                    24/7 support for system issues
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <Cloud className="w-8 h-8 text-gray-500" />
                <h3 className="text-2xl">Grid Energy</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Regular Maintenance</h4>
                  <p className="text-gray-700">
                    No maintenance required by homeowner
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Component Replacement</h4>
                  <p className="text-gray-700">
                    Utility company handles all infrastructure maintenance
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Monitoring</h4>
                  <p className="text-gray-700">
                    Basic usage monitoring through utility meter
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Service Guarantee</h4>
                  <p className="text-gray-700">
                    Utility company responsible for service reliability
                    May offer compensation for extended outages
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Professional Services</h4>
                  <p className="text-gray-700">
                    Utility company handles all repairs and maintenance
                    Customer service for billing and outages
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h1 className="mb-6">Solar vs. Grid Energy</h1>
          <div className="separator mx-auto" />
          <p className="text-xl max-w-2xl mx-auto">
            Compare the benefits and considerations of solar energy versus traditional grid electricity.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
              selectedTab === 'financial' 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedTab('financial')}
          >
            <DollarSign className="w-5 h-5" />
            <span>Financial</span>
          </button>
          
          <button
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
              selectedTab === 'environmental' 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedTab('environmental')}
          >
            <Leaf className="w-5 h-5" />
            <span>Environmental</span>
          </button>
          
          <button
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
              selectedTab === 'practical' 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedTab('practical')}
          >
            <Lightbulb className="w-5 h-5" />
            <span>Practical</span>
          </button>

          <button
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
              selectedTab === 'maintenance' 
                ? 'bg-black text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedTab('maintenance')}
          >
            <Wrench className="w-5 h-5" />
            <span>Maintenance</span>
          </button>
        </div>
        
        {renderTabContent()}
        
        <div className="mt-16">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <h2 className="text-2xl mb-6">Calculate Your Lifetime Savings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 md:col-span-2">
                <div className="flex flex-col space-y-6">
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center text-lg">
                      <Home className="w-5 h-5 mr-2" />
                      <span>Average Monthly Electric Bill</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        value={monthlyBill}
                        onChange={(e) => setMonthlyBill(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="150"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center text-lg">
                      <DollarSign className="w-5 h-5 mr-2" />
                      <span>Estimated Solar System Cost</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        $
                      </span>
                      <input
                        type="number"
                        value={systemCost}
                        onChange={(e) => setSystemCost(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="20000"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center text-lg">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>System Lifespan (years)</span>
                    </label>
                    <input
                      type="number"
                      value={systemLife}
                      onChange={(e) => setSystemLife(Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="25"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white p-6 rounded-lg border border-gray-200 h-full flex flex-col">
                  <h3 className="text-lg font-medium mb-4">Results</h3>
                  
                  <div className="space-y-4 flex-grow">
                    <div>
                      <h4 className="text-sm text-gray-500">Grid Energy Cost</h4>
                      <p className="text-2xl font-light">
                        ${calculateSavings().gridCost.toLocaleString()}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-gray-500">Solar Energy Cost</h4>
                      <p className="text-2xl font-light">
                        ${calculateSavings().solarCost.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="text-sm text-gray-500">Lifetime Savings</h4>
                      <p className="text-2xl font-medium text-green-600">
                        ${calculateSavings().savings.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <Link to="/calculator" className="btn btn-primary w-full mt-4 flex items-center justify-center space-x-2">
                    <span>Get Detailed Quote</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comparison;