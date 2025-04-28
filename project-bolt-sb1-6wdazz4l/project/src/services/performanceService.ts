type MetricType = 'calculation' | 'api' | 'render';

interface PerformanceMetric {
  type: MetricType;
  name: string;
  duration: number;
  timestamp: number;
  metadata?: Record<string, any>;
}

class PerformanceService {
  private metrics: PerformanceMetric[] = [];
  private readonly MAX_METRICS = 1000;

  startTimer(type: MetricType, name: string, metadata?: Record<string, any>): () => void {
    const start = performance.now();
    return () => {
      const duration = performance.now() - start;
      this.recordMetric({
        type,
        name,
        duration,
        timestamp: Date.now(),
        metadata
      });
    };
  }

  private recordMetric(metric: PerformanceMetric) {
    this.metrics.push(metric);
    if (this.metrics.length > this.MAX_METRICS) {
      this.metrics.shift();
    }

    // Log slow operations
    if (metric.duration > 1000) {
      console.warn(`Slow ${metric.type} operation detected:`, {
        name: metric.name,
        duration: metric.duration,
        metadata: metric.metadata
      });
    }
  }

  getMetrics(type?: MetricType): PerformanceMetric[] {
    return type 
      ? this.metrics.filter(m => m.type === type)
      : this.metrics;
  }

  getAverageTime(type: MetricType, name: string): number {
    const relevantMetrics = this.metrics.filter(
      m => m.type === type && m.name === name
    );
    
    if (relevantMetrics.length === 0) return 0;
    
    const sum = relevantMetrics.reduce((acc, curr) => acc + curr.duration, 0);
    return sum / relevantMetrics.length;
  }

  clear() {
    this.metrics = [];
  }
}

export const performanceService = new PerformanceService();