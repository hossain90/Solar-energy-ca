import { PricingPlan } from '../types/calculator';

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Basic solar calculations for homeowners',
    price: 0,
    interval: 'monthly',
    buttonText: 'Get started',
    buttonType: 'outline',
    features: [
      'Calculate basic solar system requirements',
      'Get rough cost estimates for your solar setup',
      'Generate simple PDF reports',
      'Basic analysis of your energy usage'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Complete solar design suite for professionals',
    price: 49.99,
    interval: 'monthly',
    buttonText: 'Get started',
    buttonType: 'primary',
    highlighted: true,
    features: [
      'Everything in the Free plan',
      'Professional-grade solar system design tools',
      'Comprehensive PDF reports with custom branding',
      'Manage multiple solar projects',
      'ROI calculations and financial projections',
      '24/7 priority customer support',
      'Work with up to 5 team members',
      'Access to our REST API'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom solutions for large organizations',
    price: 199.99,
    interval: 'monthly',
    buttonText: 'Contact sales',
    buttonType: 'secondary',
    features: [
      'Everything in the Professional plan',
      'No limit on number of projects',
      'Add as many team members as needed',
      'Custom API and system integrations',
      'Complete white-label solution',
      'Dedicated account manager and support team',
      'Personalized training sessions',
      '99.9% uptime SLA guarantee'
    ]
  }
];

class PricingService {
  getPlans(): PricingPlan[] {
    return pricingPlans;
  }

  getPlanById(id: string): PricingPlan | undefined {
    return pricingPlans.find(plan => plan.id === id);
  }

  getPlanFeatures(planId: string): string[] {
    const plan = this.getPlanById(planId);
    return plan?.features || [];
  }

  comparePlans(): PricingPlan[] {
    return this.getPlans();
  }

  isFeatureAvailable(planId: string, feature: string): boolean {
    const plan = this.getPlanById(planId);
    return plan?.features.includes(feature) || false;
  }
}

export const pricingService = new PricingService();