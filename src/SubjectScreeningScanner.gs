/**
 * ============================================================================
 * SUBJECT SCREENING SCANNER
 * ----------------------------------------------------------------------------
 * Responsibilities
 *
 * - Traverse configured department folders
 * - Locate the selected Trimester
 * - Locate the selected Week
 * - Collect evidence
 *
 * No validation.
 * No emails.
 * No categorization.
 * ============================================================================
 */

/**
 * Scans all Subject Screening folders.
 *
 * @param {Array<Object>} directory
 * @param {string} screeningTrimester
 * @param {string} screeningWeek
 * @returns {Array<Object>}
 */
function scanSubjectScreeningFolders(
  directory,
  screeningTrimester,
  screeningWeek
) {

  const reviewCards = [];

  directory.forEach(function(record) {

    const evidence = scanSubjectDepartment(
      record,
      screeningTrimester,
      screeningWeek
    );

reviewCards.push({

      auditId: Utilities.getUuid(),

      system: record.system,

      division: record.division,

      department: record.department,

      subject: record.subject,

      grade: record.grade,

      hod: record.hod,

      email: record.email,

      folderId: record.folderId,

      trimester: screeningTrimester,

      week: screeningWeek,

      evidence: evidence,

      category: "",

      notes: "",

      emailType: "",

      status: "Pending"

});

  });

  return reviewCards;

}

/**
 * Scans one department for Subject Screening evidence.
 *
 * @param {Object} record
 * @param {string} screeningTrimester
 * @param {string} screeningWeek
 * @returns {Array<Object>}
 */
function scanSubjectDepartment(
  record,
  screeningTrimester,
  screeningWeek
) {

  if (!record.folderId) {
    return [];
  }

  let departmentFolder;

  try {

    departmentFolder = DriveApp.getFolderById(record.folderId);

  } catch (e) {

    return [];

  }
   
     const trimesterFolder = findTrimesterFolder(
          departmentFolder,
          screeningTrimester
      );

        if (!trimesterFolder) {
        return [];
      }

      const weekFolder = findWeekFolder(
            trimesterFolder,
            screeningTrimester,
            screeningWeek
      );
     
      if (!weekFolder) {
        return [];
      }

  return collectEvidence(
    weekFolder,
    record.email
      );
}

/**
 * Finds the selected Trimester folder.
 *
 * @param {Folder} departmentFolder
 * @param {string} screeningTrimester
 * @returns {Folder|null}
 */
function findTrimesterFolder(departmentFolder, screeningTrimester) {

  const folders = departmentFolder.getFolders();

  while (folders.hasNext()) {

    const folder = folders.next();

    if (isTrimesterMatch(folder.getName(), screeningTrimester)) {

      return folder;

    }

  }

  return null;

}

/**
 * Checks whether a folder name matches the selected Trimester.
 *
 * Supported formats:
 * - Trimester 1
 * - T1
 * - Term 1
 *
 * @param {string} folderName
 * @param {string} screeningTrimester
 * @returns {boolean}
 */
function isTrimesterMatch(folderName, screeningTrimester) {

  const name = folderName
    .toLowerCase()
    .replace(/\s+/g, "");

  const trimester = screeningTrimester
    .toLowerCase()
    .replace(/\s+/g, "");

  const trimesterNumber = trimester.match(/\d+/);

  if (!trimesterNumber) {
    return false;
  }

  const number = trimesterNumber[0];

  return (
    name === "trimester" + number ||
    name === "t" + number ||
    name === "term" + number
  );

}

/**
 * Finds the selected Week folder.
 *
 * @param {Folder} trimesterFolder
 * @param {string} screeningTrimester
 * @param {string} screeningWeek
 * @returns {Folder|null}
 */
function findWeekFolder(
  trimesterFolder,
  screeningTrimester,
  screeningWeek
) {

  const folders = trimesterFolder.getFolders();

  while (folders.hasNext()) {

    const folder = folders.next();

    if (
      isWeekMatch(
        folder.getName(),
        screeningTrimester,
        screeningWeek
      )
    ) {

      return folder;

    }

  }

  return null;

}

/**
 * Checks whether a folder name matches the selected Week.
 *
 * Supported formats:
 * - Week 5
 * - Week5
 * - W5
 * - w5
 * - AT1W5
 * - AT2W5
 * - AT3W5
 *
 * @param {string} folderName
 * @param {string} screeningTrimester
 * @param {string} screeningWeek
 * @returns {boolean}
 */
function isWeekMatch(
  folderName,
  screeningTrimester,
  screeningWeek
) {

  const name = folderName
    .toLowerCase()
    .replace(/\s+/g, "");

const trimester = String(screeningTrimester).match(/\d+/);

const week = String(screeningWeek).match(/\d+/);

  if (!trimester || !week) {
    return false;
  }

  const trimesterNumber = trimester[0];

  const weekNumber = week[0];

  return (

  name === "week" + weekNumber ||

  name === "w" + weekNumber ||

  name === "at" + trimesterNumber + "w" + weekNumber ||

  name === "t" + trimesterNumber + "w" + weekNumber

  );

}

/**
 * Collects Subject Screening evidence from a Week folder.
 *
 * Only files owned by the configured HoD are collected.
 *
 * @param {Folder} weekFolder
 * @param {string} hodEmail
 * @returns {Array<Object>}
 */
function collectEvidence(weekFolder, hodEmail) {

  const files = weekFolder.getFiles();

  const evidence = [];

  while (files.hasNext()) {

    const file = files.next();

    const owner = file.getOwner();

    const ownerEmail = owner
      ? owner.getEmail()
      : "";
    if (!hodEmail) {
      continue;
    }

    if (ownerEmail.toLowerCase() !== hodEmail.toLowerCase()) {
      continue;
    }

    evidence.push({

      fileName: file.getName(),

      owner: ownerEmail,

      url: file.getUrl(),

      mimeType: file.getMimeType(),

      created: file.getDateCreated()

    });

  }

  return evidence;

}
