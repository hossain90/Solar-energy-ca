import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { pricingService } from '../services/pricingService';

const Pricing: React.FC = () => {
  const plans = pricingService.getPlans();
  
  return (
    <div className="pt-24 pb-16">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h1 className="mb-6">Simple, Transparent Pricing</h1>
          <div className="separator mx-auto" />
          <p className="text-xl max-w-2xl mx-auto mt-6">
            Choose the plan that best fits your needs. All plans include our core solar calculation features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`flex flex-col border rounded-xl overflow-hidden ${
                plan.highlighted
                  ? 'border-primary shadow-lg scale-105'
                  : 'border-gray-200'
              }`}
            >
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600">/monthly</span>
                </div>

                <Link
                  to={plan.id === 'enterprise' ? '/contact' : '/register'}
                  className={`btn w-full ${
                    plan.buttonType === 'primary'
                      ? 'btn-primary'
                      : plan.buttonType === 'secondary'
                      ? 'btn-secondary'
                      : 'btn-outline'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>

              <div className="p-8 bg-gray-50 border-t border-gray-100 flex-grow">
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Need a Custom Solution?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We offer tailored solutions for unique requirements. Contact our sales team to discuss your needs.
          </p>
          <Link to="/contact" className="btn btn-outline">
            Contact Sales
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;