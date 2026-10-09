/**
 * ============================================================================
 * TEACHER OBSERVATION MODULE
 * ----------------------------------------------------------------------------
 * Module Controller
 * ============================================================================
 */

/**
 * Starts a Teacher Observation audit session.
 *
 * @param {string} observationTrimester
 * @param {string} observationWeek
 * @returns {Object}
 */
function runTeacherObservationAudit(
  observationTrimester,
  observationWeek
) 


{ 

  validateAccess();

  const audit = startAudit(
    MODULES.OBSERVATION,
    observationTrimester,
    observationWeek,
    null
  );

  clearModuleActionCenter(
    MODULES.OBSERVATION
  );

  const directory = getObservationDirectory();

  const results = scanTeacherObservationFolders(
    directory,
    observationTrimester,
    observationWeek
  );

  populateObservationActionCenter(
    results,
    audit.id
  );

  return {

    success: true,

    auditID: audit.id,

    total: results.length

  };

}

function populateObservationActionCenter(
  results,
  auditID
) {

  const sheet = getSheet(
    CONFIG.ACTION_SHEETS.OBSERVATION
  );

  const rows = [];

  results.forEach(function(record) {

    rows.push([

    auditID,

    record.division,

    record.department,

    record.hod,

    record.trimester,

    record.week,

    record.expected,

    record.uploaded,

    record.evidence
      .map(function(file) {
        return file.fileName;
      })
      .join("\n"),

    record.category,

    record.notes

    ]);

  });

replaceActionCenter(
  MODULES.OBSERVATION,
  rows
);
sheet.autoResizeColumns(1, sheet.getLastColumn());
sheet.getRange(2, 7, sheet.getMaxRows(), 1)
     .setWrap(true);
}

/**
 * Returns all Observation Directory records.
 *
 * @returns {Array<Object>}
 */
function getObservationDirectory() {

  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(CONFIG.DIRECTORY_SHEETS.OBSERVATION);

  const values = sheet.getDataRange().getValues();

  values.shift();

  return values.map(row => ({

    system: row[0],

    division: row[1],

    department: row[2],

    hod: row[3],

    email: row[4],

    expectedObservations: Number(row[5]),

    folderId: row[6]

  }));

}

function getObservationActionCenter() {

  return getActionCenter(
    MODULES.OBSERVATION
  );

}

function setObservationCategory(row, category){

  updateCategory(

    MODULES.OBSERVATION,

    row,

    category

  );

}

function setObservationAmendmentReason(row, reason){

  updateAmendmentReason(

    MODULES.OBSERVATION,

    row,

    reason

  );

}

function removeObservationRecord(row){

  deleteActionRecord(

    MODULES.OBSERVATION,

    row

  );

}

function excuseObservationRecord(rowNumber){

  const rows = getObservationActionCenter();

  const row = rows[rowNumber - 2];

  if(!row){

    throw new Error("Invalid Action Center record.");

  }

  writeExcusal({

    auditID: row[0],

    module: MODULES.OBSERVATION,

    division: row[1],

    department: row[2],

    hod: row[3],

    excusedBy: getUserEmail()

  });

  removeObservationRecord(rowNumber);

  return true;

}

function generateObservationAudit(
  observationTrimester,
  observationWeek
) {

  return runTeacherObservationAudit(
    observationTrimester,
    observationWeek
  );

}

/**
 * Returns the HoD email for a department.
 *
 * @param {string} department
 * @param {Array<Object>} directory
 * @returns {string}
 */
function getObservationHoDEmail(
  department,
  directory
) {

  const record = directory.find(function(item) {

    return item.department === department;

  });

  if (!record) {

    throw new Error(
      "Department not found in Observation Directory: " +
      department
    );

  }

  return record.email;

}