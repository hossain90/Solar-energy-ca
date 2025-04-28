import { loggingService } from '../utils/logging';

interface Incentive {
  name: string;
  type: 'tax_credit' | 'rebate' | 'grant' | 'loan';
  amount: number;
  description: string;
  requirements?: string[];
  expirationDate?: string;
  link?: string;
}

interface LocationData {
  state: string;
  county: string;
  utility: string;
}

interface IncentiveCalculation {
  totalIncentives: number;
  availableIncentives: Incentive[];
  federalIncentives: Incentive[];
  stateIncentives: Incentive[];
  utilityIncentives: Incentive[];
}

class IncentivesService {
  private readonly FEDERAL_TAX_CREDIT = 0.30; // 30% federal tax credit for 2024-2032

  async calculateIncentives(
    systemCost: number,
    location: LocationData
  ): Promise<IncentiveCalculation> {
    try {
      const federalIncentives = this.getFederalIncentives(systemCost);
      const stateIncentives = await this.getStateIncentives(systemCost, location.state);
      const utilityIncentives = await this.getUtilityIncentives(systemCost, location);

      const allIncentives = [
        ...federalIncentives,
        ...stateIncentives,
        ...utilityIncentives
      ];

      const totalIncentives = allIncentives.reduce((sum, incentive) => sum + incentive.amount, 0);

      loggingService.info('Incentives calculated', {
        location,
        systemCost,
        totalIncentives
      });

      return {
        totalIncentives,
        availableIncentives: allIncentives,
        federalIncentives,
        stateIncentives,
        utilityIncentives
      };
    } catch (error) {
      loggingService.error('Failed to calculate incentives', { error });
      throw error;
    }
  }

  private getFederalIncentives(systemCost: number): Incentive[] {
    const taxCreditAmount = systemCost * this.FEDERAL_TAX_CREDIT;

    return [{
      name: 'Federal Solar Tax Credit',
      type: 'tax_credit',
      amount: taxCreditAmount,
      description: '30% federal tax credit for solar installations',
      requirements: [
        'Must be installed between 2024-2032',
        'Must be a residential installation',
        'Must be used as a primary or secondary residence'
      ],
      expirationDate: '2032-12-31',
      link: 'https://www.energy.gov/savings/residential-clean-energy-credit'
    }];
  }

  private async getStateIncentives(
    systemCost: number,
    state: string
  ): Promise<Incentive[]> {
    // This would typically fetch from an API or database
    // For now, returning example data for California
    if (state.toLowerCase() === 'california') {
      return [
        {
          name: 'Self-Generation Incentive Program (SGIP)',
          type: 'rebate',
          amount: Math.min(systemCost * 0.20, 5000),
          description: 'California state rebate for energy storage systems',
          requirements: [
            'Must include battery storage',
            'Must be a Pacific Gas & Electric, Southern California Edison, Southern California Gas, or San Diego Gas & Electric customer'
          ],
          link: 'https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/demand-side-management/self-generation-incentive-program'
        }
      ];
    }

    return [];
  }

  private async getUtilityIncentives(
    systemCost: number,
    location: LocationData
  ): Promise<Incentive[]> {
    // This would typically fetch from an API or database
    // For now, returning example data for major utilities
    const utilityLookup: Record<string, Incentive[]> = {
      'pacific gas & electric': [
        {
          name: 'PG&E Solar Rebate',
          type: 'rebate',
          amount: 1000,
          description: 'One-time rebate for new solar installations',
          requirements: [
            'Must be a PG&E customer',
            'System must be grid-connected'
          ]
        }
      ],
      'southern california edison': [
        {
          name: 'SCE Storage Incentive',
          type: 'rebate',
          amount: 2000,
          description: 'Rebate for adding battery storage to solar systems',
          requirements: [
            'Must be an SCE customer',
            'Must install qualified battery system'
          ]
        }
      ]
    };

    return utilityLookup[location.utility.toLowerCase()] || [];
  }

  getIncentivesByZipCode(zipCode: string): Promise<LocationData> {
    // This would typically fetch utility and jurisdiction data from an API
    // For now, returning mock data
    return Promise.resolve({
      state: 'California',
      county: 'San Francisco',
      utility: 'Pacific Gas & Electric'
    });
  }
}

export const incentivesService = new IncentivesService();