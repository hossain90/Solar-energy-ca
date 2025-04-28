import { config } from './config';

interface RateLimitEntry {
  count: number;
  timestamp: number;
}

class SecurityMiddleware {
  private rateLimitMap = new Map<string, RateLimitEntry>();
  private readonly RATE_LIMIT = Number(import.meta.env.VITE_API_RATE_LIMIT) || 100;
  private readonly RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds
  
  checkRateLimit(clientId: string): boolean {
    const now = Date.now();
    const entry = this.rateLimitMap.get(clientId);
    
    if (!entry) {
      this.rateLimitMap.set(clientId, { count: 1, timestamp: now });
      return true;
    }

    if (now - entry.timestamp > this.RATE_LIMIT_WINDOW) {
      this.rateLimitMap.set(clientId, { count: 1, timestamp: now });
      return true;
    }

    if (entry.count >= this.RATE_LIMIT) {
      return false;
    }

    entry.count++;
    return true;
  }

  validateCalculationSize(systemSize: number): boolean {
    const maxSize = Number(import.meta.env.VITE_MAX_CALCULATION_SIZE) || 1000;
    return systemSize <= maxSize;
  }

  cleanupOldData(): void {
    const retentionDays = Number(import.meta.env.VITE_DATA_RETENTION_DAYS) || 365;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
    
    // Cleanup rate limit data
    const now = Date.now();
    for (const [clientId, entry] of this.rateLimitMap.entries()) {
      if (now - entry.timestamp > this.RATE_LIMIT_WINDOW) {
        this.rateLimitMap.delete(clientId);
      }
    }
  }

  encryptSensitiveData(data: string): string {
    // Use the encryption utility from the Google Sheets service
    // This is just a reference - actual implementation is in the Google Sheets service
    return data;
  }

  validateInput(input: any): boolean {
    // Basic input validation
    if (!input) return false;
    
    // Check for SQL injection patterns
    const sqlInjectionPattern = /('|"|;|--|\|)/i;
    if (typeof input === 'string' && sqlInjectionPattern.test(input)) {
      return false;
    }

    // Check for suspicious patterns in objects
    if (typeof input === 'object') {
      const stringified = JSON.stringify(input);
      if (sqlInjectionPattern.test(stringified)) {
        return false;
      }
    }

    return true;
  }

  sanitizeOutput(data: any): any {
    if (typeof data === 'string') {
      return data.replace(/<[^>]*>/g, ''); // Remove HTML tags
    }

    if (Array.isArray(data)) {
      return data.map(item => this.sanitizeOutput(item));
    }

    if (typeof data === 'object' && data !== null) {
      const sanitized: Record<string, any> = {};
      for (const [key, value] of Object.entries(data)) {
        sanitized[key] = this.sanitizeOutput(value);
      }
      return sanitized;
    }

    return data;
  }
}

export const securityMiddleware = new SecurityMiddleware();