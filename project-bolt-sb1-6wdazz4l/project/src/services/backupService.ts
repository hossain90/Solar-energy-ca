import { config } from '../utils/config';
import { googleSheetsService } from './googleSheets';
import { securityMiddleware } from '../utils/security';

class BackupService {
  private readonly BACKUP_INTERVAL = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
  private readonly MAX_BACKUPS = 30; // Keep last 30 days of backups
  
  startAutomaticBackups(): void {
    // Initial backup
    this.performBackup();
    
    // Schedule regular backups
    setInterval(() => this.performBackup(), this.BACKUP_INTERVAL);
  }
  
  public async performBackup(): Promise<void> {
    try {
      // Get all calculations
      const calculations = await googleSheetsService.getCalculations();
      
      // Create backup sheet name with timestamp
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupSheetName = `Backup_${timestamp}`;
      
      // Create backup
      await this.createBackupSheet(backupSheetName, calculations);
      
      // Clean up old backups
      await this.cleanupOldBackups();
      
      console.log(`Backup completed successfully: ${backupSheetName}`);
    } catch (error) {
      console.error('Error during backup:', error);
    }
  }
  
  private async createBackupSheet(sheetName: string, data: any[]): Promise<void> {
    try {
      // Format data for backup
      const rows = data.map(item => [
        item.id,
        item.timestamp,
        item.systemSize,
        item.numberOfPanels,
        item.dailyProduction,
        item.batterySize,
        item.totalCost,
        item.currency,
        item.location,
        item.customerEmail || ''
      ]);
      
      // Add headers
      const headers = [
        'ID',
        'Timestamp',
        'System Size (kW)',
        'Number of Panels',
        'Daily Production (kWh)',
        'Battery Size (Wh)',
        'Total Cost',
        'Currency',
        'Location',
        'Customer Email'
      ];
      
      rows.unshift(headers);
      
      // Create new sheet
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.google.spreadsheetId}/values/${sheetName}!A1:append?valueInputOption=RAW&key=${config.google.apiKey}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: rows
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to create backup sheet');
      }
    } catch (error) {
      console.error('Error creating backup sheet:', error);
      throw error;
    }
  }
  
  private async cleanupOldBackups(): Promise<void> {
    try {
      // Get list of backup sheets
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.google.spreadsheetId}?key=${config.google.apiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      
      // Filter backup sheets
      const backupSheets = data.sheets
        .map((sheet: any) => sheet.properties.title)
        .filter((title: string) => title.startsWith('Backup_'))
        .sort()
        .reverse();
      
      // Keep only the most recent backups
      const sheetsToDelete = backupSheets.slice(this.MAX_BACKUPS);
      
      // Delete old backup sheets
      for (const sheetName of sheetsToDelete) {
        await this.deleteSheet(sheetName);
      }
    } catch (error) {
      console.error('Error cleaning up old backups:', error);
    }
  }
  
  private async deleteSheet(sheetName: string): Promise<void> {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.google.spreadsheetId}/sheets/${sheetName}?key=${config.google.apiKey}`;
      
      const response = await fetch(url, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to delete sheet: ${sheetName}`);
      }
    } catch (error) {
      console.error(`Error deleting sheet ${sheetName}:`, error);
      throw error;
    }
  }
  
  async restoreFromBackup(backupSheetName: string): Promise<void> {
    try {
      // Validate sheet name
      if (!securityMiddleware.validateInput(backupSheetName)) {
        throw new Error('Invalid backup sheet name');
      }
      
      // Get backup data
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.google.spreadsheetId}/values/${backupSheetName}?key=${config.google.apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch backup data');
      }
      
      const data = await response.json();
      const rows = data.values.slice(1); // Skip headers
      
      // Clear current data
      await this.clearMainSheet();
      
      // Restore backup data
      await this.restoreData(rows);
      
      console.log(`Restore from ${backupSheetName} completed successfully`);
    } catch (error) {
      console.error('Error restoring from backup:', error);
      throw error;
    }
  }
  
  private async clearMainSheet(): Promise<void> {
    try {
      const range = `${import.meta.env.VITE_GOOGLE_SHEET_NAME}!${import.meta.env.VITE_GOOGLE_SHEET_RANGE}`;
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.google.spreadsheetId}/values/${range}/clear?key=${config.google.apiKey}`;
      
      const response = await fetch(url, {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error('Failed to clear main sheet');
      }
    } catch (error) {
      console.error('Error clearing main sheet:', error);
      throw error;
    }
  }
  
  private async restoreData(rows: any[]): Promise<void> {
    try {
      const range = `${import.meta.env.VITE_GOOGLE_SHEET_NAME}!${import.meta.env.VITE_GOOGLE_SHEET_RANGE}`;
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.google.spreadsheetId}/values/${range}:append?valueInputOption=RAW&key=${config.google.apiKey}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: rows
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to restore data');
      }
    } catch (error) {
      console.error('Error restoring data:', error);
      throw error;
    }
  }
}

export const backupService = new BackupService();