import { CalculatorResults } from '../types/calculator';
import { performanceService } from './performanceService';
import { loggingService } from '../utils/logging';

export interface PaymentDetails {
  amount: number;
  currency: string;
  description: string;
  metadata?: Record<string, any>;
}

class PaymentService {
  private readonly API_URL = import.meta.env.VITE_PAYMENT_API_URL;

  async createPaymentIntent(details: PaymentDetails): Promise<{ clientSecret: string }> {
    const endTimer = performanceService.startTimer('api', 'create-payment-intent');
    
    try {
      const response = await fetch(`${this.API_URL}/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const data = await response.json();
      loggingService.info('Payment intent created', { amount: details.amount });
      return data;
    } catch (error) {
      loggingService.error('Payment intent creation failed', { error });
      throw error;
    } finally {
      endTimer();
    }
  }

  async createSubscription(priceId: string): Promise<{ subscriptionId: string }> {
    const endTimer = performanceService.startTimer('api', 'create-subscription');
    
    try {
      const response = await fetch(`${this.API_URL}/create-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create subscription');
      }

      const data = await response.json();
      loggingService.info('Subscription created', { priceId });
      return data;
    } catch (error) {
      loggingService.error('Subscription creation failed', { error });
      throw error;
    } finally {
      endTimer();
    }
  }

  calculateProfessionalUpgrade(results: CalculatorResults): number {
    // Base price for professional features
    const baseFee = 49;
    
    // Additional fee based on system size
    const systemSizeFee = Math.min(results.systemSize * 10, 200);
    
    // Additional fee for battery systems
    const batteryFee = results.batterySize ? 50 : 0;
    
    return baseFee + systemSizeFee + batteryFee;
  }
}

export const paymentService = new PaymentService();
