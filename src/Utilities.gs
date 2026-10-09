/*******************************************************
 * ADAM 2.0
 * Utilities.gs
 * Version 1.0
 *******************************************************/

/**
 * Returns active spreadsheet.
 */
function getSpreadsheet() {

  return SpreadsheetApp.getActiveSpreadsheet();

}

/**
 * Returns a sheet by name.
 */
function getSheet(name) {

  return getSpreadsheet().getSheetByName(name);

}

/**
 * Returns all data excluding header.
 */
function getSheetData(sheetName) {

  const sh = getSheet(sheetName);

  if (!sh) return [];

  const values = sh.getDataRange().getValues();

  if (values.length <= 1) return [];

  return values.slice(1);

}

/**
 * Append one row.
 */
function appendRow(sheetName, row) {

  getSheet(sheetName).appendRow(row);

}

/**
 * Clear all rows except header.
 */
function clearSheetData(sheetName) {

  const sh = getSheet(sheetName);

  if (!sh) return;

  if (sh.getLastRow() <= 1) return;

  sh.getRange(
    2,
    1,
    sh.getLastRow() - 1,
    sh.getLastColumn()
  ).clearContent();

}

/**
 * Generate Audit ID.
 */
function generateAuditID(module) {

  const year = Utilities.formatDate(
    new Date(),
    CONFIG.TIMEZONE,
    "yyyyMMdd"
  );

  const time = Utilities.formatDate(
    new Date(),
    CONFIG.TIMEZONE,
    "HHmmss"
  );

  return module + "-" + year + "-" + time;

}

/**
 * Timestamp.
 */
function getTimestamp() {

  return Utilities.formatDate(

    new Date(),

    CONFIG.TIMEZONE,

    CONFIG.DATETIME_FORMAT

  );

}

/**
 * Date.
 */
function getToday() {

  return Utilities.formatDate(

    new Date(),

    CONFIG.TIMEZONE,

    CONFIG.DATE_FORMAT

  );

}

/**
 * Returns TRUE if value is empty.
 */
function isBlank(value) {

  return value === "" ||
         value === null ||
         value === undefined;

}

/**
 * Safe string.
 */
function safeString(value) {

  if (isBlank(value)) return "";

  return value.toString().trim();

}

/**
 * Logger.
 */
function logMessage(message) {

  Logger.log(

    "[" +

    getTimestamp() +

    "] " +

    message

  );

}

/**
 * Write Email Log.
 */
function writeEmailLog(record) {

  appendRow(

    SHEETS.EMAIL_LOG,

    [

      record.auditID,

      record.module,

      record.recipient,

      record.email,

      record.cc || "",

      record.category,

      record.subject,

      record.sentBy,

      getTimestamp()

    ]

  );

}

/**
 * Write Excusal.
 */
function writeExcusal(record) {

  appendRow(

    SHEETS.EXCUSAL,

    [

      record.auditID,

      record.module,

      record.hod,

      record.reason,

      record.approvedBy,

      getTimestamp()

    ]

  );

}

/**
 * Clears an Action Center.
 */
function clearActionCenter(sheetName) {

  clearSheetData(sheetName);

}
