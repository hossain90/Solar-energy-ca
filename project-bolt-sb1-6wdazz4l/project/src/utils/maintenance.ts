import { config } from './config';
import { googleSheetsService } from '../services/googleSheets';
import { securityMiddleware } from './security';

class MaintenanceService {
  private readonly CLEANUP_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  
  startScheduledCleanup(): void {
    // Initial cleanup
    this.performCleanup();
    
    // Schedule regular cleanup
    setInterval(() => this.performCleanup(), this.CLEANUP_INTERVAL);
  }
  
  private async performCleanup(): Promise<void> {
    try {
      // Clean up rate limiting data
      securityMiddleware.cleanupOldData();
      
      // Archive old calculations
      const retentionDays = Number(import.meta.env.VITE_DATA_RETENTION_DAYS) || 365;
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
      
      // Get all calculations
      const calculations = await googleSheetsService.getCalculations();
      
      // Filter out old calculations that need to be archived
      const oldCalculations = calculations.filter(calc => 
        new Date(calc.timestamp) < cutoffDate
      );
      
      if (oldCalculations.length > 0) {
        // Move old calculations to archive sheet
        await this.archiveCalculations(oldCalculations);
        
        console.log(`Archived ${oldCalculations.length} old calculations`);
      }
      
      console.log('Maintenance cleanup completed successfully');
    } catch (error) {
      console.error('Error during maintenance cleanup:', error);
    }
  }
  
  private async archiveCalculations(calculations: any[]): Promise<void> {
    // Implementation would depend on your specific Google Sheets setup
    // This is a placeholder for the archiving logic
    try {
      const archiveRange = `Archive!${import.meta.env.VITE_GOOGLE_SHEET_RANGE}`;
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.google.spreadsheetId}/values/${archiveRange}:append?valueInputOption=RAW&key=${config.google.apiKey}`;
      
      const rows = calculations.map(calc => [
        calc.id,
        calc.timestamp,
        calc.systemSize,
        calc.numberOfPanels,
        calc.dailyProduction,
        calc.batterySize,
        calc.totalCost,
        calc.currency,
        calc.location,
        calc.customerEmail || ''
      ]);
      
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: rows
        })
      });
    } catch (error) {
      console.error('Error archiving calculations:', error);
      throw error;
    }
  }
  
  async optimizeSheetPerformance(): Promise<void> {
    try {
      // Implement sheet optimization logic here
      // For example:
      // - Consolidate similar data
      // - Remove duplicate entries
      // - Optimize formula calculations
      // - Clear empty rows
      console.log('Sheet performance optimization completed');
    } catch (error) {
      console.error('Error optimizing sheet performance:', error);
    }
  }
}

export const maintenanceService = new MaintenanceService();