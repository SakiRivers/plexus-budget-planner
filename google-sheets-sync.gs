// =====================================================
// PLEXUS BUDGET PLANNER → GOOGLE SHEETS AUTO-SYNC
// =====================================================
// HOW TO SET UP:
// 1. Create a new Google Sheet
// 2. Go to Extensions → Apps Script
// 3. Delete any existing code and paste this entire file
// 4. Click Deploy → New Deployment
// 5. Select "Web app"
// 6. Set "Execute as" → Me
// 7. Set "Who has access" → Anyone
// 8. Click Deploy and copy the URL
// 9. In Railway, add env var: GOOGLE_SHEETS_WEBHOOK = <that URL>
// =====================================================

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // Create or get the "Budget Data" sheet
    var sheet = ss.getSheetByName("Budget Data");
    if (!sheet) {
      sheet = ss.insertSheet("Budget Data");
    }

    // Clear and rebuild
    sheet.clear();

    // Header row
    var months = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
    var header = ['Year', 'Category', 'Item', 'Annual Budget', 'Annual Actual', 'Variance'];
    months.forEach(function(m) {
      header.push(m + ' Budget');
      header.push(m + ' Actual');
    });
    sheet.appendRow(header);

    // Style header
    var headerRange = sheet.getRange(1, 1, 1, header.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#f0f0f0");

    // Data rows
    var rows = data.rows || [];
    rows.forEach(function(row) {
      var r = [
        row.year,
        row.category,
        row.item,
        row.budget,
        row.actual,
        row.budget - row.actual
      ];
      var mb = row.monthlyBudget || [];
      var ma = row.monthlyActual || [];
      for (var m = 0; m < 12; m++) {
        r.push(mb[m] || 0);
        r.push(ma[m] || 0);
      }
      sheet.appendRow(r);
    });

    // Format currency columns
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      // Annual Budget, Actual, Variance (cols D, E, F)
      sheet.getRange(2, 4, lastRow - 1, 3).setNumberFormat("£#,##0");
      // Monthly columns (cols G onwards)
      sheet.getRange(2, 7, lastRow - 1, 24).setNumberFormat("£#,##0");
    }

    // Auto-resize columns
    for (var i = 1; i <= header.length; i++) {
      sheet.autoResizeColumn(i);
    }

    // Add timestamp
    var tsSheet = ss.getSheetByName("Sync Log");
    if (!tsSheet) {
      tsSheet = ss.insertSheet("Sync Log");
      tsSheet.appendRow(["Timestamp", "Rows Synced"]);
      tsSheet.getRange(1, 1, 1, 2).setFontWeight("bold");
    }
    tsSheet.appendRow([new Date().toISOString(), rows.length]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Plexus Budget Sync is active.")
    .setMimeType(ContentService.MimeType.TEXT);
}
