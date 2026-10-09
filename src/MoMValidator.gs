/*******************************************************
 * ADAM 2.0
 * MoMValidator.gs
 * Version 1.0
 *******************************************************/

/**
 * Validate one department's MoM submission.
 */
function validateMoMSubmission(record) {

const result = {

  findings: [],

  uploaded: record.uploaded,

  expected: record.expected,

  validFiles: [],

  invalidFiles: [],

  duplicateFiles: [],

  lateFiles: [],

  startOfYearFiles: []

};

  const files = record.files || [];
  const deadline = getMoMDeadline();

  result.validFiles = getValidFiles(files);

  result.invalidFiles = getInvalidFiles(files);

  result.duplicateFiles = findDuplicateNames(files);

  result.lateFiles = getLateFiles(
    files,
    deadline
  );

  result.startOfYearFiles = getStartOfYearFiles(files);

if(result.invalidFiles.length){

     result.findings.push("One or more submitted documents are not in an approved format (PDF, DOC, DOCX, or Google Docs).");

}

if(result.duplicateFiles.length){

      result.findings.push("Duplicate file names detected.");
}

if(result.uploaded===0){

    result.findings.push("No documents were submitted.");

}

  if(result.uploaded < result.expected){

      result.findings.push(

        "Expected " +

        result.expected +

        " MoM document(s), but found " +

        result.uploaded +

        "."

    );

    result.findings.push("Manual review required before assigning Missing Submission.");

}

    if(result.uploaded > result.expected){

    result.findings.push("More documents than expected.");

    }

    if(result.lateFiles.length){

        result.findings.push("One or more documents were uploaded after the submission deadline.");

    }
  if(result.findings.length === 0){

    result.findings.push("Submission complies with all automated validation checks.");

}


  return result;

}

/*******************************************************
 * Validate Start of Year Rule
 *******************************************************/
function validateStartOfYear(record){

  const files = record.files || [];

  const startOfYearFiles = getStartOfYearFiles(files);

  return startOfYearFiles.length === getExpectedStartOfYearMoMs();

}

/*******************************************************
 * Validate PDF Only
 *******************************************************/
function validatePDFOnly(record){

  const files = record.files || [];

  return getInvalidFiles(files).length === 0;

}

/*******************************************************
 * Validate Expected Count
 *******************************************************/
function validateExpectedFiles(record){

  return record.uploaded===record.expected;

}

/*******************************************************
 * Validate Deadline
 *******************************************************/
function validateDeadline(record){

  const files = record.files || [];

  const deadline = getMoMDeadline();

  return getLateFiles(
    files,
    deadline
  ).length === 0;

}

/*******************************************************
 * Validate Entire Audit
 *******************************************************/
function validateMoMAudit(results){

  return results.map(function(record){

    record.validation=

      validateMoMSubmission(record);

    return record;

  });

}