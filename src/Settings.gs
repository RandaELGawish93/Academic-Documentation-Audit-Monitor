/*******************************************************
 * ADAM 2.0
 * Settings.gs
 * Version 1.0
 *******************************************************/

/**
 * Initialize the Settings sheet.
 * Run once after setupSystem().
 */
function initializeSettings() {

  const sh = getSheet(SHEETS.SETTINGS);

  sh.clear();

  sh.appendRow(["Category", "Setting", "Value"]);

  const rows = [

    // ==================================================
    // GENERAL
    // ==================================================

    ["General","Academic Year",""],
    ["General","System Type","American"],
    ["General","Current Trimester","Trimester 1"],
    ["General","Current Week",1],
    ["General","Number Of Weeks",36],
    ["General","Merged Weeks",""],


    // ==================================================
    // MODULES
    // ==================================================

    ["Modules","Minutes of Meetings",true],
    ["Modules","Subject Screening",true],
    ["Modules","Teacher Observation",true],

    // ==================================================
    // Folder DIRECTORY
    // ==================================================
    ["Directories","Archive Root Folder",""]

  ];

  sh.getRange(2,1,rows.length,3).setValues(rows);

  sh.setFrozenRows(1);

}

/*******************************************************
 * Return all settings as an object
 *******************************************************/
function getSettings() {

  const sh = getSheet(SHEETS.SETTINGS);

  const values = sh.getDataRange().getValues();

  const settings = {};

  for (let i = 1; i < values.length; i++) {

    const key = values[i][1];
    const value = values[i][2];

    settings[key] = value;

  }

  return settings;

}

/*******************************************************
 * Return one setting
 *******************************************************/
function getSetting(name) {

  const settings = getSettings();

  return settings[name];

}

/*******************************************************
 * Update one setting
 *******************************************************/
function setSetting(name, value) {

  const sh = getSheet(SHEETS.SETTINGS);

  const values = sh.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {

    if (values[i][1] === name) {

      sh.getRange(i + 1, 3).setValue(value);

      return true;

    }

  }

  return false;

}

/*******************************************************
 * Academic Year
 *******************************************************/
function getAcademicYear() {

  return getSetting("Academic Year");

}

/*******************************************************
 * Trimester
 *******************************************************/
function getCurrentTrimester() {

  return getSetting("Current Trimester");

}

/*******************************************************
 * Week
 *******************************************************/
function getCurrentWeek() {

  return Number(getSetting("Current Week"));

}

/*******************************************************
 * System Type
 *******************************************************/
function getSystemType() {

  return getSetting("System Type");

}

function getArchiveRootFolder() {

  return getSetting("Archive Root Folder");

}

/*******************************************************
 * Enabled Modules
 *******************************************************/
function isModuleEnabled(moduleName) {

  return getSetting(moduleName) === true;

}
/*******************************************************
 * Save Settings
 *******************************************************/
function saveSettings(settings) {

  const sh = getSheet("Settings");

  if (!sh) {

    throw new Error("Settings sheet not found.");

  }

  const map = {

    "Academic Year": settings.academicYear,

    "System Type": settings.systemType,

    "Current Trimester": settings.trimester,

    "Current Week": settings.week,

    "Number Of Weeks": settings.numberWeeks,

    "Merged Weeks": settings.mergedWeeks,

    "Archive Root Folder": settings.archiveFolder

  };

  const values = sh.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {

    const key = values[i][1];

    if (map.hasOwnProperty(key)) {

      sh.getRange(i + 1, 3).setValue(map[key]);

    }

  }

}

