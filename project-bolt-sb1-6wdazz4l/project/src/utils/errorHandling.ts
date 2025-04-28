interface RetryConfig {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
  backoffFactor: number;
}

interface ErrorHandlerConfig {
  fallbackValue?: any;
  onError?: (error: Error) => void;
  isCritical?: boolean;
}

export class ErrorHandler {
  private static readonly DEFAULT_RETRY_CONFIG: RetryConfig = {
    maxRetries: 3,
    initialDelay: 1000,
    maxDelay: 10000,
    backoffFactor: 2
  };

  static async withRetry<T>(
    operation: () => Promise<T>,
    config: Partial<RetryConfig> = {}
  ): Promise<T> {
    const retryConfig = { ...this.DEFAULT_RETRY_CONFIG, ...config };
    let lastError: Error;
    let delay = retryConfig.initialDelay;

    for (let attempt = 1; attempt <= retryConfig.maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        if (attempt === retryConfig.maxRetries) break;

        await new Promise(resolve => setTimeout(resolve, delay));
        delay = Math.min(delay * retryConfig.backoffFactor, retryConfig.maxDelay);
      }
    }

    throw lastError!;
  }

  static async withFallback<T>(
    operation: () => Promise<T>,
    config: ErrorHandlerConfig = {}
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (config.onError) {
        config.onError(error as Error);
      }

      if (config.isCritical) {
        throw error;
      }

      return config.fallbackValue;
    }
  }

  static async withRecovery<T>(
    operation: () => Promise<T>,
    recoveryOperation: () => Promise<T>,
    config: ErrorHandlerConfig = {}
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (config.onError) {
        config.onError(error as Error);
      }

      try {
        return await recoveryOperation();
      } catch (recoveryError) {
        if (config.isCritical) {
          throw recoveryError;
        }
        return config.fallbackValue;
      }
    }
  }

  static isNetworkError(error: Error): boolean {
    return (
      error instanceof TypeError &&
      error.message.includes('network') ||
      error.message.includes('Network') ||
      error.message.includes('Failed to fetch')
    );
  }

  static isRateLimitError(error: Error): boolean {
    return error.message.includes('429') ||
           error.message.toLowerCase().includes('rate limit') ||
           error.message.toLowerCase().includes('too many requests');
  }

  static async withRateLimit<T>(
    operation: () => Promise<T>,
    key: string,
    config: { maxAttempts: number; interval: number }
  ): Promise<T> {
    const timestamp = Date.now();
    const attempts = ErrorHandler.rateLimit.get(key) || [];
    
    // Clean up old attempts
    const recentAttempts = attempts.filter(t => timestamp - t < config.interval);
    
    if (recentAttempts.length >= config.maxAttempts) {
      throw new Error('Rate limit exceeded');
    }
    
    recentAttempts.push(timestamp);
    ErrorHandler.rateLimit.set(key, recentAttempts);
    
    return operation();
  }

  private static rateLimit = new Map<string, number[]>();

  static validateGoogleSheetsResponse(response: any): boolean {
    if (!response) return false;
    if (response.error) return false;
    if (!response.values && !response.updatedData) return false;
    return true;
  }

  static handleGoogleSheetsError(error: any): never {
    if (this.isRateLimitError(error)) {
      throw new Error('Google Sheets rate limit exceeded. Please try again later.');
    }
    
    if (this.isNetworkError(error)) {
      throw new Error('Network error occurred while accessing Google Sheets. Please check your connection.');
    }
    
    if (error.message.includes('Permission')) {
      throw new Error('Access denied. Please check your Google Sheets permissions.');
    }
    
    throw new Error('An error occurred while accessing Google Sheets: ' + error.message);
  }
}