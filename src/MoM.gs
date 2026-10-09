/*******************************************************
 * ADAM 2.0
 * MoM.gs
 * Minutes of Meetings Module
 * Version 1.0
 *******************************************************/

/**
 * Runs the complete MoM Audit
 */
function runMoMAudit() {

  validateAccess();

  const trimester = getCurrentTrimester();
  const week = getCurrentWeek();

  const deadline = getMoMDeadline();

  const audit = startAudit(
    MODULES.MOM,
    trimester,
    week,
    deadline
  );

  clearModuleActionCenter(MODULES.MOM);

  const results = scanMoMFolders();
 
  populateMoMActionCenter(results, audit.id);

  return {

    success: true,

    auditID: audit.id,

    total: results.length

  };
 
}

/*******************************************************
 * Deadline
 *******************************************************/
function getMoMDeadline() {

  return getSetting("MoM Deadline");

}
/*******************************************************
 * Merged Weeks
 *******************************************************/
function getMergedWeeks() {

  const mergedWeeks = (getSetting("Merged Weeks") || "")
    .toString()
    .trim();

  if (!mergedWeeks) {

    return [];

  }

  return mergedWeeks.split(",").map(function(group) {

    const parts = group.trim().split("-");

    return {
      start: Number(parts[0]),
      end: Number(parts[1])
    };

  });

}

/*******************************************************
 * Expected Number of MoMs
 *******************************************************/
function getExpectedMoMs() {

  const week = Number(getCurrentWeek());

  let expected = Math.max(0, week - 1);

  getMergedWeeks().forEach(function(group) {

    if (week >= group.end) {

      expected--;

    }

  });

  return Math.max(0, expected);

}

/*******************************************************
 * Start of Year Rule
 *
 * Every department must have
 * TWO Start of Year MoMs
 *******************************************************/
function getExpectedStartOfYearMoMs() {

  return 2;

}

/*******************************************************
 * Returns Directory
 *******************************************************/
function getMoMDirectory() {

  return getSheet(CONFIG.DIRECTORY_SHEETS.MOM)
      .getDataRange()
      .getValues()
      .slice(1);

}

/*******************************************************
 * Returns Folder ID
 *******************************************************/
function getDepartmentFolder(folderRecord){

  return folderRecord[5];

}

/*******************************************************
 * Audit Summary
 *******************************************************/
function getMoMSummary(){

  return getActionSummary(MODULES.MOM);

}
/*******************************************************
 * Refresh
 *******************************************************/
function refreshMoM(){

  return runMoMAudit();

}

/*******************************************************
 * Excuse One MoM Record
 *******************************************************/
function excuseMoMRecord(rowNumber){

  const rows = getMoMActionCenter();

  const row = rows[rowNumber - 2];

  if(!row){

    throw new Error("Invalid Action Center record.");

  }

  writeExcusal({

    auditID: row[0],

    module: MODULES.MOM,

    division: row[1],

    department: row[2],

    hod: row[3],

    excusedBy: getUserEmail()

  });

  removeMoMRecord(rowNumber);

  return true;

}