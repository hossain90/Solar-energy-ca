import { CalculatorResults } from '../types/calculator';

export class GoogleSheetsService {
  async storeCalculation(
    results: CalculatorResults,
    location: string,
    currency: string
  ): Promise<void> {
    // Implementation would go here
    // This is a stub for the interface
    console.log('Storing calculation:', { results, location, currency });
  }
}

export const googleSheetsService = new GoogleSheetsService();
