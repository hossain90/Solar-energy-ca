import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { SolarCalculation } from '../services/googleSheets';

export class ExportUtils {
  static async exportToCSV(data: SolarCalculation[]): Promise<void> {
    const headers = [
      'ID',
      'Date',
      'System Size (kW)',
      'Number of Panels',
      'Daily Production (kWh)',
      'Battery Size (Wh)',
      'Total Cost',
      'Currency',
      'Location'
    ];

    const rows = data.map(item => [
      item.id,
      new Date(item.timestamp).toLocaleString(),
      item.systemSize.toFixed(1),
      item.numberOfPanels,
      item.dailyProduction.toFixed(1),
      item.batterySize,
      item.totalCost.toLocaleString(),
      item.currency,
      item.location
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `solar_data_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  static async exportToPDF(data: SolarCalculation[]): Promise<void> {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Solar Installation Data', 14, 15);
    doc.setFontSize(12);
    doc.text(`Generated on ${new Date().toLocaleString()}`, 14, 25);

    // Add summary statistics
    const totalInstallations = data.length;
    const totalCapacity = data.reduce((sum, item) => sum + item.systemSize, 0);
    const averageCost = data.reduce((sum, item) => sum + item.totalCost, 0) / totalInstallations;

    doc.setFontSize(14);
    doc.text('Summary', 14, 35);
    doc.setFontSize(12);
    doc.text([
      `Total Installations: ${totalInstallations}`,
      `Total Capacity: ${totalCapacity.toFixed(1)} kW`,
      `Average Cost: $${averageCost.toFixed(2)}`
    ], 14, 45);

    // Add data table
    const headers = [
      ['Date', 'Location', 'System Size', 'Panels', 'Production', 'Cost']
    ];

    const rows = data.map(item => [
      new Date(item.timestamp).toLocaleDateString(),
      item.location,
      `${item.systemSize.toFixed(1)} kW`,
      item.numberOfPanels.toString(),
      `${item.dailyProduction.toFixed(1)} kWh`,
      `${item.currency} ${item.totalCost.toLocaleString()}`
    ]);

    autoTable(doc, {
      startY: 65,
      head: headers,
      body: rows,
      theme: 'grid',
      styles: { fontSize: 8 },
      headStyles: { fillColor: [0, 0, 0] }
    });

    // Save the PDF
    doc.save(`solar_report_${new Date().toISOString().slice(0,10)}.pdf`);
  }

  static async exportToExcel(data: SolarCalculation[]): Promise<void> {
    const headers = [
      'ID',
      'Date',
      'System Size (kW)',
      'Number of Panels',
      'Daily Production (kWh)',
      'Battery Size (Wh)',
      'Total Cost',
      'Currency',
      'Location'
    ];

    const rows = data.map(item => [
      item.id,
      new Date(item.timestamp).toLocaleString(),
      item.systemSize.toFixed(1),
      item.numberOfPanels,
      item.dailyProduction.toFixed(1),
      item.batterySize,
      item.totalCost.toLocaleString(),
      item.currency,
      item.location
    ]);

    // Create Excel-compatible CSV with UTF-8 BOM
    const BOM = '\uFEFF';
    const csvContent = BOM + [
      headers.join('\t'),
      ...rows.map(row => row.join('\t'))
    ].join('\\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `solar_data_${new Date().toISOString().slice(0,10)}.xls`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}