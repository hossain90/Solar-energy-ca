import { render } from '@testing-library/react';
import { AuthContext, authService } from '../services/authService';

export const renderWithProviders = (ui: React.ReactNode) => {
  return render(
    <AuthContext.Provider value={authService}>
      {ui}
    </AuthContext.Provider>
  );
};

export const mockServices = {
  maintenanceService: {
    startScheduledCleanup: jest.fn(),
  },
  backupService: {
    startAutomaticBackups: jest.fn(),
  },
  googleSheetsService: {
    fetchProductData: jest.fn().mockResolvedValue([]),
  },
  authService: {
    isAuthenticated: jest.fn().mockReturnValue(false),
    login: jest.fn(),
    logout: jest.fn(),
  },
};
