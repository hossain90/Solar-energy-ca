interface Config {
  google: {
    apiKey: string;
    spreadsheetId: string;
  };
  encryption: {
    secret: string;
  };
  logging: {
    endpoint: string;
    apiKey: string;
    level: string;
  };
}

export const config: Config = {
  google: {
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY || '',
    spreadsheetId: import.meta.env.VITE_GOOGLE_SHEET_ID || ''
  },
  encryption: {
    secret: import.meta.env.VITE_ENCRYPTION_SECRET || ''
  },
  logging: {
    endpoint: import.meta.env.VITE_LOGGING_ENDPOINT || 'https://api.logging-service.com/v1',
    apiKey: import.meta.env.VITE_LOGGING_API_KEY || '',
    level: import.meta.env.VITE_LOG_LEVEL || 'info'
  }
};