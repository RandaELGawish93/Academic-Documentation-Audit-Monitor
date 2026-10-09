/*******************************************************
 * ADAM 2.0
 * Setup.gs
 * Version 1.0
 *******************************************************/

function setupSystem() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  createSheet(ss, "Settings");
  createSheet(ss, "Users");
  createSheet(ss, "Email Log");
  createSheet(ss, "Excusal Registry");

  createSheet(ss, "MoM Directory");
  createSheet(ss, "Subject Screening Directory");
  createSheet(ss, "Observation Directory");

  createSheet(ss, "MoM Action Center");
  createSheet(ss, "Subject Screening Action Center");
  createSheet(ss, "Observation Action Center");

  formatSettingsSheet();
  formatUsersSheet();
  formatEmailLog();
  formatExcusalRegistry();

  formatMoMDirectory();
  formatSubjectDirectory();
  formatObservationDirectory();

  formatMoMActionCenter();
  formatSubjectActionCenter();
  formatObservationActionCenter();

  initializeSettings();
  initializeUsers();

  SpreadsheetApp.flush();

  SpreadsheetApp.getUi().alert("ADAM 2.0 setup completed successfully.");
}

/*******************************************************
 * Create Sheet
 *******************************************************/

function createSheet(ss,name){

  let sheet=ss.getSheetByName(name);

  if(sheet) return sheet;

  sheet=ss.insertSheet(name);

  return sheet;

}

/*******************************************************
 * SETTINGS
 *******************************************************/

function formatSettingsSheet(){

  const sh=SpreadsheetApp.getActive().getSheetByName("Settings");

  sh.clear();

  const headers=[
    "Category",
    "Setting",
    "Value"
  ];

  sh.getRange(1,1,1,headers.length).setValues([headers]);

  sh.setFrozenRows(1);

}

/*******************************************************
 * EMAIL LOG
 *******************************************************/

function formatEmailLog(){

  const sh=SpreadsheetApp.getActive().getSheetByName("Email Log");

  sh.clear();

  const headers=[

    "Audit ID",
    "Module",
    "Recipient",
    "Email",
     "CC",
    "Category",
    "Subject",
    "Sent By",
    "Timestamp"

  ];

  sh.getRange(1,1,1,headers.length).setValues([headers]);

  sh.setFrozenRows(1);

}

/*******************************************************
 * EXCUSAL REGISTRY
 *******************************************************/

function formatExcusalRegistry(){

  const sh=SpreadsheetApp.getActive().getSheetByName("Excusal Registry");

  sh.clear();

  const headers=[

    "Audit ID",
    "Module",
    "Division",
    "Department",
    "HoD",
    "Excused By",
    "Excused On"
  ];

  sh.getRange(1,1,1,headers.length).setValues([headers]);

  sh.setFrozenRows(1);

}

/*******************************************************
 * MOM DIRECTORY
 *******************************************************/

function formatMoMDirectory(){

  const sh=SpreadsheetApp.getActive().getSheetByName("MoM Directory");

  sh.clear();

  const headers=[

    "System",
    "Division",
    "Department",
    "HoD",
    "Email",
    "Folder ID"

  ];

  sh.getRange(1,1,1,headers.length).setValues([headers]);

  sh.setFrozenRows(1);

}

/*******************************************************
 * SUBJECT DIRECTORY
 *******************************************************/

function formatSubjectDirectory(){

  const sh=SpreadsheetApp.getActive().getSheetByName("Subject Screening Directory");

  sh.clear();

  const headers=[

    "System",
    "Division",
    "Department",
    "Subject",
    "Grade",
    "HoD",
    "Email",
    "Folder ID"

  ];

  sh.getRange(1,1,1,headers.length).setValues([headers]);

  sh.setFrozenRows(1);

}

/*******************************************************
 * OBSERVATION DIRECTORY
 *******************************************************/

function formatObservationDirectory(){

  const sh=SpreadsheetApp.getActive().getSheetByName("Observation Directory");

  sh.clear();

  const headers=[

    "System",
    "Division",
    "Department",
    "HoD",
    "Email",
    "Expected Observations",
    "Folder ID"

  ];

  sh.getRange(1,1,1,headers.length).setValues([headers]);

  sh.setFrozenRows(1);

}

/*******************************************************
 * MoM ACTION CENTER
 *******************************************************/

function formatMoMActionCenter(){

  const sh=SpreadsheetApp.getActive().getSheetByName("MoM Action Center");

  sh.clear();

  const headers=[

    "Audit ID",
    "Division",
    "Department",
    "HoD",
    "File",
    "Status",
    "Found / Expected",
    "Category",
    "Amendment Reason",

  ];

  sh.getRange(1,1,1,headers.length).setValues([headers]);

  sh.setFrozenRows(1);

}

/*******************************************************
 * SUBJECT ACTION CENTER
 *******************************************************/

function formatSubjectActionCenter(){

  const sh=SpreadsheetApp.getActive().getSheetByName("Subject Screening Action Center");

  sh.clear();

 const headers=[

      "Audit ID",
      "System",
      "Division",
      "Department",
      "Subject",
      "Grade",
      "HoD",
      "Email",
      "Trimester",
      "Week",
      "Evidence",
      "Status",
      "Category",
      "Notes"

];

  sh.getRange(1,1,1,headers.length).setValues([headers]);

  sh.setFrozenRows(1);
  sh.getRange("L2:L").setDataValidation(
  SpreadsheetApp.newDataValidation()
    .requireValueInList([
      "Pending",
      "Completed"
    ], true)
    .build()
);

sh.getRange("M2:M").setDataValidation(
  SpreadsheetApp.newDataValidation()
    .requireValueInList([
      "Thank You",
      "Amendment",
      "Notice",
      "Missing Submission",
      "Excused"
    ], true)
    .build()
);
}

/*******************************************************
 * OBSERVATION ACTION CENTER
 *******************************************************/

function formatObservationActionCenter(){

  const sh=SpreadsheetApp.getActive().getSheetByName("Observation Action Center");

  sh.clear();

  const headers=[

    "Audit ID",
    "Division",
    "Department",
    "HoD",
    "Trimester",
    "Week",
    "Expected",
    "Uploaded",
    "Evidence",
    "Category",
    "Notes"

  ];

  sh.getRange(1,1,1,headers.length).setValues([headers]);

  sh.setFrozenRows(1);
  sh.autoResizeColumns(1, sh.getLastColumn());
  sh.getRange(2, 7, sh.getMaxRows() - 1, 1)
     .setWrap(true);
}

function formatUsersSheet() {

  const sh = SpreadsheetApp
    .getActive()
    .getSheetByName("Users");

  sh.clear();

  sh.getRange(1,1,1,7).setValues([[
    "Active",
    "Role",
    "Scope",
    "Name",
    "Email",
    "Receive Emails",
    "Notes"
  ]]);

  sh.setFrozenRows(1);

}

function initializeUsers() {

  const sh = getSheet("Users");

  sh.clear();

  sh.getRange(1,1,1,7).setValues([[
    "Active",
    "Role",
    "Scope",
    "Name",
    "Email",
    "Receive Emails",
    "Notes"
  ]]);

  const rows = [

    [true,"Academic Dean","All","","",false,""],

    [true,"Associate Academic Dean","All","","",false,""],

    [true,"Campus Director","All","","",false,""],

    [true,"Principal","Elementary","","",false,""],

    [true,"Principal","Middle School","","",false,""],

    [true,"Principal","High School","","",false,""],

    [true,"DCI","Elementary","","",false,""],

    [true,"DCI","Middle & High School","","",false,""],

    [true,"ADCI","All","","",false,""]

  ];

  sh.getRange(2,1,rows.length,7).setValues(rows);

  sh.setFrozenRows(1);

}
