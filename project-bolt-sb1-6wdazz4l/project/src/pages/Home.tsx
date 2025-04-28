import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sun, Zap, BarChart3, Award } from 'lucide-react';
import SolarPanel from '../components/SolarPanel';
import EnergyAnimation from '../components/EnergyAnimation';

const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        const opacity = Math.max(0, 1 - scrollPosition / 500);
        
        heroRef.current.style.opacity = opacity.toString();
        heroRef.current.style.transform = `translateY(${scrollPosition * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 30% 60%, rgba(255, 233, 213, 0.6) 0%, rgba(255, 255, 255, 0) 60%)'
          }}
        />
        
        <div ref={heroRef} className="container-narrow relative z-10">
          <div className="flex flex-col items-center text-center">
            <h1 className="mb-6 leading-tight">
              Harness the power<br />of the sun
            </h1>
            <div className="separator" />
            <p className="text-xl md:text-2xl max-w-2xl mb-12 font-light">
              A new experience in solar energy technology, bringing sustainable power with an artistic expression.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/calculator" className="btn btn-primary">
                Solar calculator
              </Link>
              <Link to="/products" className="btn btn-outline">
                Explore products
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none z-0">
          <EnergyAnimation />
        </div>
      </section>
      
      {/* Feature Section */}
      <section className="section bg-white">
        <div className="container-narrow">
          <div className="text-center mb-20">
            <h2 className="mb-6">Why solar energy</h2>
            <div className="separator mx-auto" />
            <p className="max-w-2xl mx-auto text-lg">
              Solar energy represents not just a sustainable choice, but an artistic expression of your commitment to the planet's future.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="flex flex-col items-start">
              <Sun className="w-12 h-12 mb-6" />
              <h3 className="text-xl mb-3">Renewable energy</h3>
              <p className="text-gray-700">
                A sustainable resource that replenishes naturally and indefinitely, reducing your carbon footprint.
              </p>
            </div>
            
            <div className="flex flex-col items-start">
              <Zap className="w-12 h-12 mb-6" />
              <h3 className="text-xl mb-3">Lower electricity bills</h3>
              <p className="text-gray-700">
                Generate your own electricity and reduce your dependency on the grid, leading to substantial savings.
              </p>
            </div>
            
            <div className="flex flex-col items-start">
              <BarChart3 className="w-12 h-12 mb-6" />
              <h3 className="text-xl mb-3">Energy independence</h3>
              <p className="text-gray-700">
                Take control of your energy production and protect yourself from rising utility costs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Calculator Preview Section */}
      <section className="section bg-gray-50">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="mb-6">Find your optimal solar setup</h2>
              <div className="separator" />
              <p className="mb-8 text-lg">
                Our intuitive solar calculator helps determine the perfect solar setup for your needs, considering location, energy usage, and available space.
              </p>
              <Link to="/calculator" className="btn btn-primary flex items-center space-x-2">
                <span>Try the calculator</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl">Solar Calculator</h3>
                <Zap className="w-5 h-5" />
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly electricity usage (kWh)
                  </label>
                  <input 
                    type="range" 
                    min="100" 
                    max="1000" 
                    defaultValue="500"
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>100</span>
                    <span>1000</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Average sunlight hours per day
                  </label>
                  <input 
                    type="range" 
                    min="2" 
                    max="8" 
                    defaultValue="5"
                    className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>2</span>
                    <span>8</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-700">Recommended system size:</span>
                  <span className="text-sm font-medium">5.6 kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-700">Estimated annual production:</span>
                  <span className="text-sm font-medium">7,800 kWh</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Product Preview Section */}
      <section className="section bg-white">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <h2 className="mb-6">Featured solar solutions</h2>
            <div className="separator mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col border border-gray-200 overflow-hidden">
              <div className="h-64 flex items-center justify-center bg-gray-50 p-6">
                <SolarPanel className="w-full max-w-xs" />
              </div>
              <div className="p-6">
                <h3 className="text-xl mb-2">Premium Solar Panel</h3>
                <p className="text-gray-700 mb-4">
                  High-efficiency monocrystalline solar panel with elegant design and superior performance.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">$599.00</span>
                  <Link to="/products" className="text-sm font-medium hover:underline flex items-center">
                    <span>View details</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col border border-gray-200 overflow-hidden">
              <div className="h-64 flex items-center justify-center bg-gray-50 p-6">
                <div className="relative w-full max-w-xs aspect-video">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-40 bg-gray-300 rounded-lg shadow-md"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full shadow flex items-center justify-center">
                      <Award className="w-8 h-8 text-gray-800" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl mb-2">Solar Inverter Pro</h3>
                <p className="text-gray-700 mb-4">
                  Smart inverter with wireless monitoring and optimized energy conversion efficiency.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">$799.00</span>
                  <Link to="/products" className="text-sm font-medium hover:underline flex items-center">
                    <span>View details</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col border border-gray-200 overflow-hidden">
              <div className="h-64 flex items-center justify-center bg-gray-50 p-6">
                <div className="w-full max-w-xs h-full flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gray-800"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl mb-2">Home Battery System</h3>
                <p className="text-gray-700 mb-4">
                  Energy storage solution to power your home during low sunlight hours and outages.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">$1,299.00</span>
                  <Link to="/products" className="text-sm font-medium hover:underline flex items-center">
                    <span>View details</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/products" className="btn btn-outline">
              View all products
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-gray-50">
        <div className="container-narrow text-center">
          <h2 className="mb-6">Ready to transition to solar energy?</h2>
          <div className="separator mx-auto" />
          <p className="text-xl max-w-2xl mx-auto mb-10">
            Take the first step toward energy independence and a sustainable future.
          </p>
          <Link to="/calculator" className="btn btn-primary">
            Get started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;