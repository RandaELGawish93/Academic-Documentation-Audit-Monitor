/**
 * ============================================================================
 * SUBJECT SCREENING MODULE
 * ----------------------------------------------------------------------------
 * Module Controller
 *
 * Responsibilities
 * - Start a Subject Screening audit
 * - Read the Subject Screening Directory
 * - Call the scanner
 * - Return Review Cards
 *
 * Version : 1.0
 * ============================================================================
 */

/**
 * Starts a Subject Screening audit session.
 *
 * @param {string} screeningTrimester
 * @param {string} screeningWeek
 * @returns {Array<Object>}
 */
function runSubjectScreeningAudit(screeningTrimester, screeningWeek) {

  validateAccess();

  const audit = startAudit(
    MODULES.SUBJECT,
    screeningTrimester,
    screeningWeek,
    null
  );

  clearModuleActionCenter(MODULES.SUBJECT);

  const directory = getSubjectScreeningDirectory();

  const results = scanSubjectScreeningFolders(
    directory,
    screeningTrimester,
    screeningWeek
  );

  populateSubjectScreeningActionCenter(
    results,
    audit.id
  );

  return {

    success: true,

    auditID: audit.id,

    total: results.length

  };

}

function populateSubjectScreeningActionCenter(results, auditID) {

  const sheet = getSheet(CONFIG.ACTION_SHEETS.SUBJECT);

  clearActionCenter(sheet.getName());

  const rows = [];

  results.forEach(function(record) {

    rows.push([

      auditID,

      record.system,

      record.division,

      record.department,

      record.subject,

      record.grade,

      record.hod,

      record.email,

      record.trimester,

      record.week,

      record.evidence
        .map(function(file) {
          return file.fileName;
        })
        .join("\n"),

      record.status,

      record.category,

      record.notes

    ]);

  });

  if (rows.length > 0) {

    sheet
      .getRange(2, 1, rows.length, rows[0].length)
      .setValues(rows);

  }

}

function getSubjectActionCenter() {

  return getActionCenter(MODULES.SUBJECT);

}

function setSubjectCategory(row, category){

  updateCategory(

    MODULES.SUBJECT,

    row,

    category

  );

}

function setSubjectAmendmentReason(row, reason){

  updateAmendmentReason(

    MODULES.SUBJECT,

    row,

    reason

  );

}

function excuseSubjectRecord(rowNumber){

  const rows = getSubjectActionCenter();

  const row = rows[rowNumber - 2];

  if(!row){

    throw new Error("Invalid Action Center record.");

  }

  writeExcusal({

    auditID: row[0],

    module: MODULES.SUBJECT,

    division: row[1],

    department: row[2],

    hod: row[6],

    excusedBy: getUserEmail()

  });

  removeSubjectRecord(rowNumber);

  return true;

}

function removeSubjectRecord(row){

  deleteActionRecord(

    MODULES.SUBJECT,

    row

  );

}

function generateSubjectScreeningAudit(screeningTrimester, screeningWeek) {

  const reviewCards = runSubjectScreeningAudit(
    screeningTrimester,
    screeningWeek
  );

  return reviewCards;

}


/**
 * Returns all Subject Screening directory records.
 *
 * @returns {Array<Object>}
 */
function getSubjectScreeningDirectory() {

  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(CONFIG.DIRECTORY_SHEETS.SUBJECT);

  const values = sheet.getDataRange().getValues();

  values.shift();

  return values.map(row => ({

    system: row[0],

    division: row[1],

    department: row[2],

    subject: row[3],

    grade: row[4],

    hod: row[5],

    email: row[6],

    folderId: row[7]

  }));

}
