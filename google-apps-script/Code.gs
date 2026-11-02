/**
 * After Dark Society — website form receiver
 * -----------------------------------------------------------------------
 * Saves every website form submission as a new row in the Google Sheet
 * "After Dark Society — Website Submissions", one tab per form.
 *
 * Set-up (once):
 *   1. Open the Sheet → Extensions → Apps Script
 *   2. Delete everything in Code.gs and paste this whole file → Save
 *   3. Deploy → New deployment → type "Web app"
 *        Execute as:      Me
 *        Who has access:  Anyone
 *      → Deploy → allow the permissions → copy the "Web app URL"
 *   4. Send that URL to be put in assets/js/data.js (formEndpoint)
 *
 * If you later change this code: Deploy → Manage deployments → Edit (pencil)
 * → Version: "New version" → Deploy. The URL stays the same.
 */

// The Sheet that receives submissions.
const SPREADSHEET_ID = "1AFUOFyQ0bebO2Pw0CXIm9XYofuxZP6zLoI2VKtooH4w";

// Optional: an email address to notify on every new submission ("" = off).
const NOTIFY_EMAIL = "";

// Website form name → tab name + which column gets which form field.
const FORMS = {
  "Table booking": {
    sheet: "Table Bookings",
    fields: { "Name": "name", "Phone / WhatsApp": "phone", "Email": "email", "Event": "event",
              "Date": "date", "Guests": "guests", "Table": "table", "Notes": "notes" }
  },
  "PR enquiry": {
    sheet: "PR Enquiries",
    fields: { "Name": "name", "Phone / WhatsApp": "phone", "Email": "email",
              "Instagram": "instagram", "Topic": "topic", "Message": "message" }
  },
  "Career application": {
    sheet: "Career Applications",
    fields: { "First name": "first_name", "Last name": "last_name", "Age": "age",
              "Phone / WhatsApp": "phone", "Email": "email", "Music genre": "music_genre",
              "Role": "role", "Expectations": "expectation" }
  },
  "Contact": {
    sheet: "Contact",
    fields: { "Name": "name", "Email": "email", "Phone": "phone", "Message": "message" }
  },
  "Early access": {
    sheet: "Early Access",
    fields: { "Name": "name", "WhatsApp or email": "contact" }
  }
};

function doPost(e) {
  try {
    const p = readParams_(e);
    if (p.website) return json_({ ok: true });            // spam trap: real visitors leave this empty
    const form = FORMS[p._form];
    if (!form) return json_({ ok: false, error: "Unknown form" });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = getSheet_(form);
      const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      const row = headers.map(function (h) {
        if (h === "Submitted") return new Date();
        if (h === "Status") return "New";
        const key = form.fields[h];
        return key ? clean_(p[key]) : "";
      });
      sheet.appendRow(row);
    } finally {
      lock.releaseLock();
    }

    if (NOTIFY_EMAIL) notify_(p, form);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// Open the web app URL in a browser to check it is running.
function doGet() {
  return ContentService.createTextOutput("After Dark Society form receiver is running.");
}

function readParams_(e) {
  const p = Object.assign({}, (e && e.parameter) || {});
  if (e && e.postData && /json/i.test(e.postData.type || "")) {
    try { Object.assign(p, JSON.parse(e.postData.contents)); } catch (_) {}
  }
  return p;
}

function getSheet_(form) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(form.sheet);
  if (!sheet) {                                          // recreate a tab if it was deleted
    sheet = ss.insertSheet(form.sheet);
    const headers = ["Submitted"].concat(Object.keys(form.fields), ["Status"]);
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Keep text as text: stop values starting with = + - @ being run as formulas.
function clean_(v) {
  if (v === undefined || v === null) return "";
  const s = String(v).trim().slice(0, 5000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function notify_(p, form) {
  const lines = Object.keys(form.fields).map(function (h) { return h + ": " + (p[form.fields[h]] || "—"); });
  MailApp.sendEmail(NOTIFY_EMAIL, "New " + p._form + " — After Dark Society website", lines.join("\n"));
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
