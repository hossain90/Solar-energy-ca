import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
npm run test        # Run all tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Run tests with coverage reportimport { maintenanceService } from './utils/maintenance';
import { backupService } from './services/backupService';
import { googleSheetsService } from './services/googleSheetsService';
import { AuthContext, authService } from './services/authService';

const initializeApp = async () => {
  try {
    await Promise.all([
      maintenanceService.startScheduledCleanup(),
      backupService.startAutomaticBackups(),
      googleSheetsService.fetchProductData()
    ]);

    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <AuthContext.Provider value={authService}>
          <App />
        </AuthContext.Provider>
      </StrictMode>
    );
  } catch (error) {
    console.error('Failed to initialize app:', error);
  }
};

if (process.env.NODE_ENV !== 'test') {
  initializeApp();
}

export { initializeApp };
