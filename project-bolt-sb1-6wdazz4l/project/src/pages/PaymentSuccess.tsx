import React, { useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { googleSheetsService } from '../services/googleSheets';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const paymentIntentId = searchParams.get('payment_intent');
    const calculationId = searchParams.get('calculation_id');
    
    if (paymentIntentId && calculationId) {
      const updatePaymentStatus = async () => {
        try {
          // Here you would typically verify the payment with Stripe
          // and update the calculation status in Google Sheets
          await fetch('/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              paymentIntentId,
              calculationId
            })
          });
        } catch (error) {
          console.error('Failed to verify payment:', error);
          // Handle error appropriately
        }
      };

      updatePaymentStatus();
    } else {
      // Redirect to home if no payment info is present
      navigate('/');
    }
  }, [searchParams, navigate]);

  return (
    <div className="pt-24 pb-16">
      <div className="container-narrow">
        <div className="max-w-2xl mx-auto text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-6 text-green-500" />
          <h1 className="mb-6">Payment Successful!</h1>
          <div className="separator mx-auto" />
          <p className="text-xl mb-8">
            Thank you for choosing our solar solutions. Your payment has been processed successfully.
          </p>
          
          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <h2 className="text-2xl mb-4">What's Next?</h2>
            <ul className="space-y-4 text-left">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-3">1</span>
                <div>
                  <h3 className="font-medium">Order Confirmation</h3>
                  <p className="text-gray-600">You will receive an email with your order details and receipt within the next few minutes.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-3">2</span>
                <div>
                  <h3 className="font-medium">Site Assessment</h3>
                  <p className="text-gray-600">Our team will contact you within 24 hours to schedule a site assessment.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mr-3">3</span>
                <div>
                  <h3 className="font-medium">Installation Planning</h3>
                  <p className="text-gray-600">We'll create a detailed installation plan based on your site assessment.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/dashboard" 
              className="btn btn-primary flex items-center justify-center space-x-2"
            >
              <span>View Your Dashboard</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link 
              to="/products" 
              className="btn btn-outline"
            >
              Browse More Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;