/*******************************************************
 * ADAM 2.0
 * MoMCommunication.gs
 * Version 1.0
 *******************************************************/

/*******************************************************
 * Preview One Email
 *******************************************************/
function previewMoMEmail(rowNumber) {

  const rows = getMoMActionCenter();
  const directory = getMoMDirectory();
  const row = rows[rowNumber - 2];

  if (!row) {
    throw new Error("Invalid row.");
  }

  const emailData = {

    auditID: row[0],

    module: MODULES.MOM,

    name: row[3],

    email: getHoDEmail(
      row[1],
      row[2],
      directory
    ),

    cc: "",

    category: row[7],

    amendmentReason: row[8],

    rowNumber: rowNumber,

    closeFunction: "removeMoMRecord",

    reloadFunction: "loadMoMActionCenter"

  };

  const preview = previewEmail(emailData);

  emailData.subject = preview.subject;
  emailData.html = preview.html;

  return emailData;

}

/*******************************************************
 * Get HoD Email
 *******************************************************/
function getHoDEmail(division, department, directory) {

  if (!directory || directory.length === 0) {
    return "";
  }

  // Object-based directory (Subject Screening)
  if (!Array.isArray(directory[0])) {

    const record = directory.find(item =>
      item.division === division &&
      item.department === department
    );

    return record ? record.email : "";
  }

  // Array-based directory (MoM)
  for (let i = 0; i < directory.length; i++) {

    if (
      directory[i][1] === division &&
      directory[i][2] === department
    ) {
      return directory[i][4];
    }

  }

  return "";

}

/*******************************************************
 * Email Statistics
 *******************************************************/
function getMoMEmailSummary() {

  const rows = getMoMActionCenter();

  const summary = {

    thankYou: 0,

    amendment: 0,

    notice: 0,

    missing: 0,

    excused: 0

  };

  rows.forEach(function(row) {

    switch (row[7]) {

      case CATEGORY.FLAWLESS:
        summary.thankYou++;
        break;

      case CATEGORY.AMENDMENT:
        summary.amendment++;
        break;

      case CATEGORY.NOTICE:
        summary.notice++;
        break;

      case CATEGORY.MISSING:
        summary.missing++;
        break;

      case CATEGORY.EXCUSED:
        summary.excused++;
        break;

    }

  });

  return summary;

}



