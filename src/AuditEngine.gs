/*******************************************************
 * ADAM 2.0
 * AuditEngine.gs
 * Version 1.0
 *******************************************************/

/**
 * Starts a new audit session.
 */
function startAudit(module, trimester, week, deadline) {

  return {

    id: generateAuditID(module),

    module: module,

    academicYear: getAcademicYear(),

    trimester: trimester,

    week: week,

    deadline: deadline,

    reviewer: getUserEmail(),

    started: getTimestamp()

  };

}
/*******************************************************
 * Finalize Audit
 *******************************************************/
function finalizeAudit(module){

  if (!isActionCenterEmpty(module)) {

    throw new Error(
        "There are pending records in the Action Center. Please process all records before finalizing the audit."
    );

  }
  return true;

}

/*******************************************************
 * Compliance %
 *******************************************************/
function calculateCompliance(totals){

  const total=

    totals.flawless+

    totals.amendment+

    totals.notice +

    totals.missing;

  if(total===0){

    return 0;

  }

  return Math.round(

    (totals.flawless/total)*100

  );

}

