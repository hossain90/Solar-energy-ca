import { screen } from '@testing-library/react';
import { renderWithProviders } from './test/testUtils';
import App from './App';
import { mockServices } from './test/testUtils';

jest.mock('./utils/maintenance', () => ({
  maintenanceService: mockServices.maintenanceService,
}));

jest.mock('./services/backupService', () => ({
  backupService: mockServices.backupService,
}));

jest.mock('./services/googleSheetsService', () => ({
  googleSheetsService: mockServices.googleSheetsService,
}));

describe('App', () => {
  it('renders without crashing', () => {
    renderWithProviders(<App />);
    expect(screen.getByTestId('app-root')).toBeInTheDocument();
  });

  it('initializes required services', async () => {
    const { initializeApp } = require('./main');
    await initializeApp();
    
    expect(mockServices.maintenanceService.startScheduledCleanup).toHaveBeenCalled();
    expect(mockServices.backupService.startAutomaticBackups).toHaveBeenCalled();
    expect(mockServices.googleSheetsService.fetchProductData).toHaveBeenCalled();
  });
});
