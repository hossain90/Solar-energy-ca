import React from 'react';
import { ArrowRight, Sun, Users, Award, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h1 className="mb-6">About Us</h1>
          <div className="separator mx-auto" />
          <p className="text-xl max-w-2xl mx-auto">
            We're on a mission to make solar energy accessible, beautiful, and essential for every home.
          </p>
        </div>
        
        {/* Vision Section */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl mb-6">Our Vision</h2>
              <div className="separator" />
              <p className="mb-6 text-lg">
                We envision a world where sustainable energy is not just a practical choice, but an artistic expression of our commitment to the planet.
              </p>
              <p className="text-gray-700">
                Founded in 2023, our company brings together experts in renewable energy, design, and technology to create solar solutions that are both functional and beautifully designed. We believe that the transition to clean energy should be an empowering and aesthetically pleasing experience.
              </p>
            </div>
            
            <div className="bg-gray-50 aspect-square flex items-center justify-center p-12">
              <div className="relative">
                <div className="absolute w-32 h-32 rounded-full bg-yellow-100 -top-8 -left-8"></div>
                <div className="absolute w-24 h-24 rounded-full bg-yellow-200 top-16 -right-4"></div>
                <div className="absolute w-16 h-16 rounded-full bg-yellow-300 bottom-0 left-8"></div>
                <Sun className="w-48 h-48 text-black relative z-10" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl mb-6">Our Values</h2>
            <div className="separator mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 bg-white border border-gray-200 rounded-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gray-50">
                <Sun className="w-8 h-8" />
              </div>
              <h3 className="text-xl mb-4">Sustainability</h3>
              <p className="text-gray-700">
                We prioritize environmental responsibility in every aspect of our business, from product design to operations.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white border border-gray-200 rounded-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gray-50">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl mb-4">Excellence</h3>
              <p className="text-gray-700">
                We strive for the highest quality in our products, customer service, and installation practices.
              </p>
            </div>
            
            <div className="text-center p-8 bg-white border border-gray-200 rounded-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gray-50">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl mb-4">Community</h3>
              <p className="text-gray-700">
                We believe in empowering communities through education and access to clean, renewable energy solutions.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Impact Section */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 bg-gray-50 p-12 rounded-lg">
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <p className="text-4xl font-light mb-2">2,500+</p>
                  <p className="text-gray-700">Installations</p>
                </div>
                
                <div className="text-center">
                  <p className="text-4xl font-light mb-2">15M+</p>
                  <p className="text-gray-700">kWh Generated</p>
                </div>
                
                <div className="text-center">
                  <p className="text-4xl font-light mb-2">10k+</p>
                  <p className="text-gray-700">Tons CO₂ Saved</p>
                </div>
                
                <div className="text-center">
                  <p className="text-4xl font-light mb-2">12</p>
                  <p className="text-gray-700">Countries</p>
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <h2 className="text-3xl mb-6">Our Impact</h2>
              <div className="separator" />
              <p className="mb-6 text-lg">
                Since our inception, we've been committed to making a measurable difference in the world's transition to renewable energy.
              </p>
              <p className="text-gray-700 mb-6">
                Every solar panel we install contributes to reducing carbon emissions and creating a more sustainable future. We track our collective impact and share these achievements with our community.
              </p>
              <Link to="/calculator" className="btn btn-outline flex items-center space-x-2 w-fit">
                <span>Calculate your impact</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Join Us Section */}
        <section className="text-center bg-gray-50 p-12 rounded-lg">
          <Globe className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl mb-6">Join our mission</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Together, we can create a more sustainable and beautiful world powered by the sun.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/calculator" className="btn btn-primary">
              Get started
            </Link>
            <button className="btn btn-outline">
              Contact us
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;