import { useEffect, useRef } from 'react';
import { performanceService } from '../services/performanceService';

interface UsePerformanceTrackingOptions {
  componentName: string;
  enabled?: boolean;
}

export const usePerformanceTracking = ({ componentName, enabled = true }: UsePerformanceTrackingOptions) => {
  const renderCount = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const endTimer = performanceService.startTimer('render', `${componentName}-mount`);
    renderCount.current = 0;

    return () => {
      endTimer();
    };
  }, [componentName, enabled]);

  useEffect(() => {
    if (!enabled) return;

    renderCount.current += 1;
    const endTimer = performanceService.startTimer('render', `${componentName}-render`, {
      renderCount: renderCount.current
    });

    return () => {
      endTimer();
    };
  });

  return {
    getRenderCount: () => renderCount.current,
    getPerformanceMetrics: () => ({
      mountTime: performanceService.getAverageTime('render', `${componentName}-mount`),
      renderTime: performanceService.getAverageTime('render', `${componentName}-render`)
    })
  };
};