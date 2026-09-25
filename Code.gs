/**
 * Marine Vessel Monitoring 2026 — Google Apps Script JSONP API
 *
 * Bind this script to the 2026 Google Sheet:
 * 1. Open the Google Sheet.
 * 2. Extensions → Apps Script.
 * 3. Replace the default code with this file.
 * 4. Deploy → New deployment → Web app.
 * 5. Execute as: Me
 * 6. Who has access: Anyone with the link (or your organization's allowed users).
 * 7. Copy the /exec URL.
 *
 * The dashboard uses JSONP, so it does not require browser CORS configuration.
 */
const SHEET_NAME = '2026 Master Data';

function doGet(e) {
  const callback = (e && e.parameter && e.parameter.callback) || 'callback';
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) return jsonp_(callback, {ok:false,error:'Sheet not found: '+SHEET_NAME});

  const values = sh.getDataRange().getDisplayValues();
  if (values.length < 5) return jsonp_(callback, {ok:false,error:'Not enough rows in sheet.'});

  // Header row is row 5 in the supplied 2026 source.
  const headers = values[4].map((v,i)=>String(v).trim() || ('Column '+(i+1)));
  const rows = [];
  for (let r=5; r<values.length; r++) {
    const row = values[r];
    if (!row.some(v => String(v).trim() !== '')) continue;
    const obj = {};
    headers.forEach((h,i)=>obj[h]=row[i] ?? '');
    rows.push(obj);
  }
  return jsonp_(callback, {ok:true,rows:rows,count:rows.length});
}

function jsonp_(callback, payload) {
  const safe = String(callback).replace(/[^A-Za-z0-9_.$]/g,'');
  return ContentService
    .createTextOutput(safe+'('+JSON.stringify(payload)+')')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}
