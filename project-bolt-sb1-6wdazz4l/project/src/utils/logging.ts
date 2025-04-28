import { config } from './config';
import { securityMiddleware } from './security';

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  userId?: string;
  sessionId?: string;
}

interface LogMessage {
  message: string;
  data?: any;
  timestamp: number;
}

class LoggingService {
  private logs: {
    info: LogMessage[];
    error: LogMessage[];
    warn: LogMessage[];
  } = {
    info: [],
    error: [],
    warn: []
  };

  private readonly MAX_LOGS = 1000;

  private addLog(type: 'info' | 'error' | 'warn', message: string, data?: any) {
    const log: LogMessage = {
      message,
      data,
      timestamp: Date.now()
    };

    this.logs[type].push(log);
    if (this.logs[type].length > this.MAX_LOGS) {
      this.logs[type].shift();
    }

    // In development, also log to console
    if (process.env.NODE_ENV === 'development') {
      console[type](message, data);
    }
  }

  info(message: string, data?: any) {
    this.addLog('info', message, data);
  }

  error(message: string, data?: any) {
    this.addLog('error', message, data);
  }

  warn(message: string, data?: any) {
    this.addLog('warn', message, data);
  }

  getLogs(type?: 'info' | 'error' | 'warn') {
    if (type) {
      return this.logs[type];
    }
    return {
      info: this.logs.info,
      error: this.logs.error,
      warn: this.logs.warn
    };
  }

  clear() {
    this.logs = {
      info: [],
      error: [],
      warn: []
    };
  }
}

export const loggingService = new LoggingService();