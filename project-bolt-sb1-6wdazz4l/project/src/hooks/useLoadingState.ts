import { useState, useCallback } from 'react';
import { performanceService } from '../services/performanceService';

interface UseLoadingStateOptions {
  minimumLoadingTime?: number;
  trackPerformance?: boolean;
  operationName?: string;
}

export const useLoadingState = (options: UseLoadingStateOptions = {}) => {
  const {
    minimumLoadingTime = 500,
    trackPerformance = true,
    operationName = 'operation'
  } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const withLoading = useCallback(async <T,>(
    operation: () => Promise<T>,
    customOptions?: { skipMinLoadingTime?: boolean }
  ): Promise<T> => {
    setIsLoading(true);
    setError(null);

    const startTime = Date.now();
    let endTimer: (() => void) | undefined;

    if (trackPerformance) {
      endTimer = performanceService.startTimer('api', operationName);
    }

    try {
      const result = await operation();

      const elapsedTime = Date.now() - startTime;
      const remainingTime = customOptions?.skipMinLoadingTime ? 0 : 
        Math.max(0, minimumLoadingTime - elapsedTime);

      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }

      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Operation failed');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
      endTimer?.();
    }
  }, [minimumLoadingTime, trackPerformance, operationName]);

  return {
    isLoading,
    error,
    withLoading,
    setError
  };
};