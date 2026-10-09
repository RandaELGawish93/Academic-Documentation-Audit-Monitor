/*******************************************************
 * ADAM 2.0
 * Excusal.gs
 * Version 1.0
 *******************************************************/

/*******************************************************
 * Write Excusal
 *******************************************************/
function writeExcusal(data){

  const sheet = getSheet(

    CONFIG.SHARED_SHEETS.EXCUSAL

  );

  sheet.appendRow([

    data.auditID,

    data.module,

    data.division,

    data.department,

    data.hod,

    data.excusedBy,

    getTimestamp()

  ]);

}