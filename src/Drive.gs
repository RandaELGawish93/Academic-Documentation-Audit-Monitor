/*******************************************************
 * ADAM 2.0
 * Drive.gs
 * Version 1.0
 *******************************************************/

/**
 * Returns a Drive folder by ID.
 */
function getFolder(folderId) {

  if (!folderId) {

    throw new Error("Folder ID is empty.");

  }

  return DriveApp.getFolderById(folderId);

}

/**
 * Checks whether a folder exists.
 */
function folderExists(folderId) {

  try {

    DriveApp.getFolderById(folderId);

    return true;

  } catch (e) {

    return false;

  }

}

/**
 * Returns all files inside a folder.
 */
function getFiles(folderId) {

  const folder = getFolder(folderId);

  const files = folder.getFiles();

  const data = [];

  while (files.hasNext()) {

    const file = files.next();

    data.push({

      id: file.getId(),

      name: file.getName(),

      type: file.getMimeType(),

      url: file.getUrl(),

      created: file.getDateCreated(),

      updated: file.getLastUpdated(),

      owner: file.getOwner()
        ? file.getOwner().getEmail()
        : "",

      size: file.getSize()

    });

  }

  return data;

}

/**
 * Returns subfolders.
 */
function getFolders(folderId) {

  const folder = getFolder(folderId);

  const folders = folder.getFolders();

  const data = [];

  while (folders.hasNext()) {

    const f = folders.next();

    data.push({

      id: f.getId(),

      name: f.getName(),

      url: f.getUrl()

    });

  }

  return data;

}

/**
 * Search for a file by exact name.
 */
function findFile(folderId, fileName) {

  const folder = getFolder(folderId);

  const files = folder.getFilesByName(fileName);

  if (!files.hasNext()) {

    return null;

  }

  const file = files.next();

  return {

    id: file.getId(),

    name: file.getName(),

    type: file.getMimeType(),

    url: file.getUrl()

  };

}

/**
 * Returns all files with allowed mime types.
 */
function getFilesByType(folderId, allowedTypes) {

  const folder = getFolder(folderId);

  const files = folder.getFiles();

  const data = [];

  while (files.hasNext()) {

    const file = files.next();

    if (allowedTypes.includes(file.getMimeType())) {

      data.push({

        id: file.getId(),

        name: file.getName(),

        type: file.getMimeType(),

        updated: file.getLastUpdated(),

        url: file.getUrl()

      });

    }

  }

  return data;

}

/**
 * Checks if a duplicate filename exists.
 */
function hasDuplicate(folderId, fileName) {

  const folder = getFolder(folderId);

  const files = folder.getFilesByName(fileName);

  return files.hasNext();

}

/**
 * Creates a folder if it doesn't exist.
 */
function getOrCreateFolder(parentId, folderName) {

  const parent = getFolder(parentId);

  const folders = parent.getFoldersByName(folderName);

  if (folders.hasNext()) {

    return folders.next();

  }

  return parent.createFolder(folderName);

}

/**
 * Returns file extension.
 */
function getExtension(fileName) {

  const parts = fileName.split(".");

  return parts.length > 1

    ? parts.pop().toLowerCase()

    : "";

}

/**
 * Returns filename without extension.
 */
function getBaseName(fileName) {

  const index = fileName.lastIndexOf(".");

  if (index === -1) {

    return fileName;

  }

  return fileName.substring(0, index);

}

/**
 * Formats Drive file information.
 */
function formatDriveFile(file) {

  return {

    id: file.getId(),

    name: file.getName(),

    type: file.getMimeType(),

    extension: getExtension(file.getName()),

    url: file.getUrl(),

    created: file.getDateCreated(),

    updated: file.getLastUpdated(),

    size: file.getSize()

  };

}