/*******************************************************
 * ADAM 2.0
 * MoMScanner.gs
 * Version 1.0
 *******************************************************/

/**
 * Scan all MoM folders.
 */
function scanMoMFolders() {

  const directory = getMoMDirectory();

  const results = [];

  const expected = getExpectedMoMs();

  directory.forEach(function(record) {

    const folderId = getDepartmentFolder(record);

    const files = scanDepartment(folderId);

    results.push({

      system: record[0],

      division: record[1],

      department: record[2],

      hod: record[3],

      email: record[4],

      folderId: folderId,

      files: files,

      uploaded: files.length,

      expected: expected

    });

  });

  return results;

}

/*******************************************************
 * Scan One Department
 *******************************************************/
function scanDepartment(folderId) {

  if (!folderId) {

    return [];

  }

  let folder;

  try {

    folder = DriveApp.getFolderById(folderId);

  } catch (e) {

    return [];

  }

  const iterator = folder.getFiles();

  const files = [];

  while (iterator.hasNext()) {

    const file = iterator.next();

    files.push({

      id: file.getId(),

      name: file.getName(),

      mimeType: file.getMimeType(),

      created: file.getDateCreated(),

      updated: file.getLastUpdated(),

      owner: file.getOwner()
        ? file.getOwner().getEmail()
        : "",

      size: file.getSize(),

      url: file.getUrl()

    });

  }
  return files;

}

/*******************************************************
 * Count Valid Files
 *******************************************************/
function countValidFiles(files) {

  return files.filter(function(file) {

    return file.mimeType === MimeType.PDF;

  }).length;

}

/*******************************************************
 * Return different types of files
 *******************************************************/
function getValidFiles(files) {

  const allowed = [

    CONFIG.FILE_TYPES.PDF,

    CONFIG.FILE_TYPES.DOC,

    CONFIG.FILE_TYPES.DOCX,

    CONFIG.FILE_TYPES.GOOGLE_DOC

  ];

  return files.filter(function(file) {

    return allowed.includes(file.mimeType);

  });

}

/*******************************************************
 * Check Invalid Files
 *******************************************************/
function getInvalidFiles(files) {

  const allowed = [

    CONFIG.FILE_TYPES.PDF,

    CONFIG.FILE_TYPES.DOC,

    CONFIG.FILE_TYPES.DOCX,

    CONFIG.FILE_TYPES.GOOGLE_DOC

  ];

  return files.filter(function(file) {

    return !allowed.includes(file.mimeType);

  });

}

/*******************************************************
 * Check Duplicate Names
 *******************************************************/
function findDuplicateNames(files) {

const map = {};

  files.forEach(function(file) {

    if (map[file.name]) {

      map[file.name]++;

    } else {

      map[file.name] = 1;

    }

  });

  return Object.keys(map).filter(function(name) {

    return map[name] > 1;

  });

}

/*******************************************************
 * Start of Year Files
 *******************************************************/
function getStartOfYearFiles(files) {

  return files.filter(function(file) {

    return file.name
      .toLowerCase()
      .indexOf("start") > -1;

  });

}

/*******************************************************
 * Files Uploaded Before Deadline
 *******************************************************/
function getFilesBeforeDeadline(files, deadline) {

  if (!deadline) {

    return files;

  }

  const limit = new Date(deadline);

  return files.filter(function(file) {

    return file.updated <= limit;

  });

}

/*******************************************************
 * Files Uploaded After Deadline
 *******************************************************/
function getLateFiles(files, deadline) {

  if (!deadline) {

    return [];

  }

  const limit = new Date(deadline);

  return files.filter(function(file) {

    return file.updated > limit;

  });

}

/*******************************************************
 * Statistics
 *******************************************************/
function getMoMStatistics(results) {

  let departments = results.length;

  let expected = 0;

  let uploaded = 0;

  results.forEach(function(r) {

    expected += r.expected;

    uploaded += countValidFiles(r.files);

  });

  return {

    departments: departments,

    expected: expected,

    uploaded: uploaded,

    missing: Math.max(0, expected - uploaded)

  };

}