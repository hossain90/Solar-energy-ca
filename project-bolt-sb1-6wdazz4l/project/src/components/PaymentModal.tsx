import React, { useState } from 'react';
import { X } from 'lucide-react';
import { CalculatorResults } from '../types/calculator';
import { paymentService } from '../services/paymentService';
import { useLoadingState } from '../hooks/useLoadingState';
import { Notification } from './Notification';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  results: CalculatorResults;
  currency: string;
  currencySymbol: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  results,
  currency,
  currencySymbol
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const { isLoading, error, withLoading } = useLoadingState({
    operationName: 'process-payment'
  });

  const handlePayment = async () => {
    await withLoading(async () => {
      const amount = paymentService.calculateProfessionalUpgrade(results);
      const priceId = selectedPlan === 'yearly' ? 'price_yearly' : 'price_monthly';

      await paymentService.createSubscription(priceId);
      window.location.href = '/payment-success';
    });
  };

  if (!isOpen) return null;

  const yearlyDiscount = 20; // 20% discount for yearly plans
  const monthlyPrice = paymentService.calculateProfessionalUpgrade(results);
  const yearlyPrice = (monthlyPrice * 12 * (100 - yearlyDiscount)) / 100;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-40" onClick={onClose} />
        
        <div className="relative bg-white rounded-lg max-w-lg w-full p-6 shadow-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-semibold mb-6">Upgrade to Professional</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <button
                className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                  selectedPlan === 'monthly'
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 hover:border-black'
                }`}
                onClick={() => setSelectedPlan('monthly')}
              >
                <div className="text-lg font-medium mb-1">Monthly</div>
                <div className="text-2xl">
                  {currencySymbol}{monthlyPrice}
                  <span className="text-sm">/month</span>
                </div>
              </button>

              <button
                className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                  selectedPlan === 'yearly'
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 hover:border-black'
                }`}
                onClick={() => setSelectedPlan('yearly')}
              >
                <div className="text-lg font-medium mb-1">
                  Yearly
                  <span className="text-sm ml-2 text-green-500">Save {yearlyDiscount}%</span>
                </div>
                <div className="text-2xl">
                  {currencySymbol}{Math.round(yearlyPrice / 12)}
                  <span className="text-sm">/month</span>
                </div>
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium mb-4">What's included:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-5 h-5 rounded-full bg-green-500 flex-shrink-0 mr-3 mt-1" />
                  <span>Detailed system specifications and material breakdown</span>
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 rounded-full bg-green-500 flex-shrink-0 mr-3 mt-1" />
                  <span>Advanced efficiency calculations with seasonal variations</span>
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 rounded-full bg-green-500 flex-shrink-0 mr-3 mt-1" />
                  <span>Professional PDF report generation</span>
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 rounded-full bg-green-500 flex-shrink-0 mr-3 mt-1" />
                  <span>Priority support and updates</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handlePayment}
              disabled={isLoading}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Start Professional Trial'}
            </button>

            <p className="text-sm text-gray-500 text-center">
              14-day money-back guarantee. Cancel anytime.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <Notification
          type="error"
          message="Payment processing failed. Please try again."
          onClose={() => null}
        />
      )}
    </div>
  );
};