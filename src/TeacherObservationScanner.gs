/**
 * ============================================================================
 * TEACHER OBSERVATION SCANNER
 * ============================================================================
 */

/**
 * Scans all Teacher Observation folders.
 *
 * @param {Array<Object>} directory
 * @param {string} trimester
 * @param {string} week
 * @returns {Array<Object>}
 */
function scanTeacherObservationFolders(
  directory,
  trimester,
  week
) {

  const reviewCards = [];

  directory.forEach(function(record) {

    const evidence = scanTeacherObservationDepartment(
      record,
      trimester,
      week
    );

    reviewCards.push({

      auditId: Utilities.getUuid(),

      system: record.system,

      division: record.division,

      department: record.department,

      hod: record.hod,

      email: record.email,

      trimester: trimester,

      week: week,

      expected: record.expectedObservations,

      uploaded: evidence.length,

      evidence: evidence,

      category: "",

      notes: "",

      emailType: "",

    });

  });

  return reviewCards;

}


/**
 * Scans one department.
 *
 * @param {Object} record
 * @param {string} trimester
 * @param {string} week
 * @returns {Array<Object>}
 */
function scanTeacherObservationDepartment(
  record,
  trimester,
  week
) {

  if (!record.folderId) {
    return [];
  }

  let observationRootFolder;

  try {

    observationRootFolder = DriveApp.getFolderById(record.folderId);

  } catch (e) {

    return [];

  }

  const departmentFolder = findDepartmentFolder(
    observationRootFolder,
    record.department
  );
  

  if (!departmentFolder) {
    return [];
  }

  const trimesterFolder = findObservationTrimesterFolder(
    departmentFolder,
    trimester
  );

  if (!trimesterFolder) {
    return [];
  }

  const weekFolder = findObservationWeekFolder(
    trimesterFolder,
    trimester,
    week
  );


  if (!weekFolder) {
    return [];
  }

  return collectObservationEvidence(
    weekFolder,
    record.email
  );

}

/**
 * Finds the Department folder.
 *
 * @param {Folder} rootFolder
 * @param {string} department
 * @returns {Folder|null}
 */
function findDepartmentFolder(rootFolder, department) {

  const folders = rootFolder.getFolders();

  while (folders.hasNext()) {

    const folder = folders.next();

const folderName = folder.getName()
  .trim()
  .replace(/\s+/g, " ")
  .toLowerCase();

const departmentName = department
  .trim()
  .replace(/\s+/g, " ")
  .toLowerCase();

if (folderName === departmentName)
 {
      return folder;
    }

  }

  return null;

}

/**
 * Finds the selected Trimester folder.
 *
 * @param {Folder} departmentFolder
 * @param {string} trimester
 * @returns {Folder|null}
 */
function findObservationTrimesterFolder(
  departmentFolder,
  trimester
) {

  const folders = departmentFolder.getFolders();

  while (folders.hasNext()) {

    const folder = folders.next();

    if (isObservationTrimesterMatch(
      folder.getName(),
      trimester
    )) {

      return folder;

    }

  }

  return null;

}

/**
 * Finds the selected Week folder.
 *
 * @param {Folder} trimesterFolder
 * @param {string} trimester
 * @param {string} week
 * @returns {Folder|null}
 */
function findObservationWeekFolder(
  trimesterFolder,
  trimester,
  week
) {

  const folders = trimesterFolder.getFolders();

  while (folders.hasNext()) {

    const folder = folders.next();

    if (
      isObservationWeekMatch(
        folder.getName(),
        trimester,
        week
      )
    ) {
      return folder;
    }

  }

  return null;

}

/**
 * Checks whether a folder matches the selected Trimester.
 *
 * Supported:
 * Trimester 1
 * Term 1
 * T1
 */
function isObservationTrimesterMatch(
  folderName,
  trimester
) {

  const folder = folderName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");

  const match = String(trimester).match(/\d+/);

  if (!match) {
    return false;
  }

  const t = match[0];


  return [
    "t" + t,
    "term" + t,
    "trimester" + t
  ].includes(folder);

}

/**
 * Checks whether a folder matches the selected Week.
 *
 * Supported formats:
 *
 * Week 1
 * Week1
 * W1
 * T1W1
 * t1w1
 * T1w1
 * AT1W1
 * at1w1
 * BT1W1
 * bt1w1
 */
function isObservationWeekMatch(
  folderName,
  trimester,
  week
) {

  const name = folderName
    .toLowerCase()
    .replace(/\s+/g, "");

  const trimesterMatch = String(trimester).match(/\d+/);
  const weekMatch = String(week).match(/\d+/);

  if (!trimesterMatch || !weekMatch) {
    return false;
  }

  const t = trimesterMatch[0];
  const w = weekMatch[0];

  return (

    name === "week" + w ||

    name === "w" + w ||

    name === "t" + t + "w" + w ||

    name === "at" + t + "w" + w ||

    name === "bt" + t + "w" + w

  );

}

/**
 * Collects Teacher Observation evidence.
 *
 * Only files uploaded by the configured HoD
 * are collected.
 *
 * @param {Folder} weekFolder
 * @param {string} hodEmail
 * @returns {Array<Object>}
 */
function collectObservationEvidence(
  weekFolder,
  hodEmail
) {

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

    if (
      ownerEmail.toLowerCase() !==
      hodEmail.toLowerCase()
    ) {
      continue;
    }

    evidence.push({

      fileId: file.getId(),

      fileName: file.getName(),

      owner: ownerEmail,

      mimeType: file.getMimeType(),

      url: file.getUrl(),

      created: file.getDateCreated(),

      updated: file.getLastUpdated()

    });

  }
  return evidence;

}
