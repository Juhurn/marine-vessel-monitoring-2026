MARINE VESSEL MONITORING 2026 — LIVE WEB READY FIXED

FIX:
The previous web-ready package had the embedded data variable declared but did not
initialize the dashboard's working rows variable. This version explicitly initializes:
let rows = EMBEDDED_ROWS;

The dashboard should therefore immediately capture the exact 2026 snapshot data
(995 populated movement records) even before the live Google Apps Script endpoint
is connected.

Files:
- index.html
- Code.gs
- SEAOIL_Logo.png
- SEAOIL_Fuel_and_Beyond.png

LIVE:
To connect the Google Sheet later, deploy Code.gs as a Google Apps Script Web App,
then paste its /exec URL into LIVE_API_URL in index.html.

For now, opening index.html directly should show the 995 source rows.
