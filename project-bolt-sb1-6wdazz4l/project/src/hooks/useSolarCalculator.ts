import { useState, useCallback } from 'react';
import { CalculatorResults, AdvancedCalculatorResults, PanelConfiguration } from '../types/calculator';
import { calculateSolarSystem } from '../utils/calculator';
import { performanceService } from '../services/performanceService';
import { loggingService } from '../utils/logging';

interface UseSolarCalculatorProps {
  isProfessional: boolean;
  onError?: (error: Error) => void;
}

export const useSolarCalculator = ({ isProfessional, onError }: UseSolarCalculatorProps) => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<CalculatorResults | AdvancedCalculatorResults | null>(null);

  const calculate = useCallback(async (params: {
    projectType: string;
    systemType: string;
    location: string;
    consumption: number;
    batteryBackup: boolean;
    autonomyDays: number;
    panelEfficiency: number;
    currency: string;
    solarData?: any;
    advancedConfig?: PanelConfiguration;
  }) => {
    setIsCalculating(true);
    const endTimer = performanceService.startTimer('calculation', 'solar-system', {
      isProfessional,
      hasAdvancedConfig: !!params.advancedConfig
    });

    try {
      const calculationResults = calculateSolarSystem({
        ...params,
        isProfessional
      });

      setResults(calculationResults);
      endTimer();

      // Log successful calculation
      loggingService.info('Solar calculation completed', {
        duration: performanceService.getAverageTime('calculation', 'solar-system'),
        results: {
          systemSize: calculationResults.systemSize,
          numberOfPanels: calculationResults.numberOfPanels,
          totalCost: calculationResults.costs.total,
          hasAdvancedConfig: !!params.advancedConfig
        }
      });

      return calculationResults;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Calculation failed');
      onError?.(error);
      
      // Log calculation error
      loggingService.error('Solar calculation failed', {
        error: {
          message: error.message,
          stack: error.stack
        },
        inputs: params
      });

      throw error;
    } finally {
      setIsCalculating(false);
    }
  }, [isProfessional, onError]);

  const getPerformanceStats = useCallback(() => {
    const avgCalculationTime = performanceService.getAverageTime('calculation', 'solar-system');
    const allMetrics = performanceService.getMetrics('calculation');
    
    return {
      averageCalculationTime: avgCalculationTime,
      totalCalculations: allMetrics.length,
      slowestCalculation: Math.max(...allMetrics.map(m => m.duration)),
      fastestCalculation: Math.min(...allMetrics.map(m => m.duration))
    };
  }, []);

  return {
    calculate,
    isCalculating,
    results,
    getPerformanceStats
  };
};