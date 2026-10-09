/*******************************************************
 * ADAM 2.0
 * MoMActionCenter.gs
 * Version 1.0
 *******************************************************/

/**
 * Populate the MoM Action Center.
 */
function populateMoMActionCenter(results, auditID) {

  const sheet = getSheet(CONFIG.ACTION_SHEETS.MOM);

  clearActionCenter(sheet.getName());

  const rows = [];

  results.forEach(function(record) {

    const validation = validateMoMSubmission(record);

      rows.push([

      auditID,
      record.division,
      record.department,
      record.hod,
      getFileSummary(record.files),
      validation.findings.join("\n"),
      record.uploaded + " / " + record.expected,
      CATEGORY.REVIEW_REQUIRED,
       ""
      ]);

  });

  if (rows.length > 0) {

    sheet
      .getRange(2, 1, rows.length, rows[0].length)
      .setValues(rows);

  }

}

/*******************************************************
 * File Summary
 *******************************************************/
function getFileSummary(files) {

  if (!files || files.length === 0) {

    return "No Files";

  }

  return files
    .map(function(file) {

      return file.name;

    })
    .join(", ");

}

function getCurrentMoMAuditID() {

  const sheet = getSheet(CONFIG.ACTION_SHEETS.MOM);

  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {

    throw new Error("No active MoM audit found.");

  }

  return sheet.getRange(2, 1).getValue();

}
/*******************************************************
 * Refresh Action Center
 *******************************************************/
function refreshMoMActionCenter() {

  const auditID = getCurrentMoMAuditID();

  const results = scanMoMFolders();

  populateMoMActionCenter(
    results,
    auditID
  );

}

/*******************************************************
 * Return Action Center
 *******************************************************/
function getMoMActionCenter() {

  return getActionCenter(MODULES.MOM);

}

/*******************************************************
 * Categorize Record
 *******************************************************/
function setMoMCategory(row, category) {

  updateCategory(

    MODULES.MOM,

    row,

    category

  );

}

/*******************************************************
 * Add Review Notes
 *******************************************************/
function setMoMAmendmentReason(row, reason) {

  updateAmendmentReason(

    MODULES.MOM,

    row,

    reason

  );

}

/*******************************************************
 * Remove One Record
 *******************************************************/
function removeMoMRecord(row) {

  deleteActionRecord(

    MODULES.MOM,

    row

  );

}

/*******************************************************
 * Summary
 *******************************************************/
function getMoMActionSummary() {

  return getActionSummary(

    MODULES.MOM

  );

}

/*******************************************************
 * Clear Action Center
 *******************************************************/
function clearMoMActionCenter() {

  clearModuleActionCenter(

    MODULES.MOM

  );

}

/*******************************************************
 * Final Validation
 *******************************************************/
function validateMoMActionCenter() {

  return validateActionCenter(

    MODULES.MOM

  );

}

/*******************************************************
 * Close One MoM Record
 *******************************************************/
function closeMoMRecord(rowNumber) {

  removeMoMRecord(rowNumber);

}

