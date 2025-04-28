function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const [headers, ...rows] = sheet.getDataRange().getValues();
  
  const products = rows.map(row => {
    const product = {};
    headers.forEach((header, index) => {
      product[header] = row[index];
    });
    return product;
  });

  return ContentService
    .createTextOutput(JSON.stringify(products))
    .setMimeType(ContentService.MimeType.JSON);
}

function createProductDetails() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    const details = {
      specifications: data[i][5] || {},
      features: data[i][6] || [],
      installation: data[i][7] || {},
      warranty: data[i][8] || {}
    };
    
    sheet.getRange(i + 1, 9).setValue(JSON.stringify(details));
  }
}
