/*******************************************************
 * ADAM 2.0
 * SubjectScreeningCommunication.gs
 * Version 1.0
 *******************************************************/

/*******************************************************
 * Preview One Email
 *******************************************************/
function previewSubjectEmail(rowNumber) {

  const rows = getSubjectActionCenter();
  const directory = getSubjectScreeningDirectory();
  const row = rows[rowNumber - 2];

  if (!row) {
    throw new Error("Invalid row.");
  }

  const emailData = {

    auditID: row[0],

    module: MODULES.SUBJECT,

    name: row[6],

    email: getHoDEmail(
      row[2],
      row[3],
      directory
    ),

    cc: "",

    category: row[12],

    amendmentReason: row[13],

    trimester: row[8],

    week: row[9],

    subjectName: row[4],

    grade: row[5],

    rowNumber: rowNumber,

    closeFunction: "removeSubjectRecord",

    reloadFunction: "loadSubjectActionCenter"

  };

  const preview = previewEmail(emailData);

  emailData.subject = preview.subject;
  emailData.html = preview.html;

  return emailData;

}