/*******************************************************
 * ADAM 2.0
 * TeacherObservationCommunication.gs
 * Version 1.0
 *******************************************************/

/*******************************************************
 * Preview One Email
 *******************************************************/
function previewObservationEmail(rowNumber) {

  const rows = getObservationActionCenter();
  const directory = getObservationDirectory();
  const row = rows[rowNumber - 2];

  if (!row) {
    throw new Error("Invalid row.");
  }

const emailData = {

  auditID: row[0],

  module: MODULES.OBSERVATION,

  name: row[3],

  email: getObservationHoDEmail(
    row[2],
    directory
  ),

  cc: "",

  category: row[9],

  amendmentReason: row[10],

  trimester: row[4],

  week: row[5],

  subjectName: "",

  grade: "",

  rowNumber: rowNumber,

  closeFunction: "removeObservationRecord",

  reloadFunction: "loadObservationActionCenter"

};

  const preview = previewEmail(emailData);

  emailData.subject = preview.subject;
  emailData.html = preview.html;

  return emailData;

}