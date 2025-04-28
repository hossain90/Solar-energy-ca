import { useState, useCallback } from 'react';
import { CalculatorResults, AdvancedCalculatorResults } from '../types/calculator';
import { performanceService } from '../services/performanceService';

interface ComparisonResult {
  savingsDifference: number;
  paybackDifference: number;
  efficiencyDifference: number;
  recommendation: string;
}

export const useSolarComparison = () => {
  const [comparisons, setComparisons] = useState<CalculatorResults[]>([]);

  const addComparison = useCallback((result: CalculatorResults | AdvancedCalculatorResults) => {
    setComparisons(prev => [...prev, result]);
    performanceService.startTimer('calculation', 'add-comparison');
  }, []);

  const compareResults = useCallback((resultA: CalculatorResults, resultB: CalculatorResults): ComparisonResult => {
    const endTimer = performanceService.startTimer('calculation', 'compare-systems');

    const savingsDifference = resultB.savings.annual - resultA.savings.annual;
    const paybackDifference = resultB.savings.paybackPeriod - resultA.savings.paybackPeriod;
    const efficiencyDifference = 
      (resultB.dailyProduction / resultB.systemSize) - 
      (resultA.dailyProduction / resultA.systemSize);

    let recommendation = '';
    if (savingsDifference > 0 && paybackDifference < 0) {
      recommendation = 'System B offers better financial returns with faster payback.';
    } else if (savingsDifference > 0 && paybackDifference > 0) {
      recommendation = 'System B offers higher savings but takes longer to pay back.';
    } else if (savingsDifference < 0 && paybackDifference < 0) {
      recommendation = 'System A offers better long-term savings with slower payback.';
    } else {
      recommendation = 'System A appears to be more cost-effective overall.';
    }

    endTimer();
    return {
      savingsDifference,
      paybackDifference,
      efficiencyDifference,
      recommendation
    };
  }, []);

  const clearComparisons = useCallback(() => {
    setComparisons([]);
  }, []);

  return {
    comparisons,
    addComparison,
    compareResults,
    clearComparisons,
    hasComparisons: comparisons.length > 0
  };
};