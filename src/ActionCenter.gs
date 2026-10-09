/*******************************************************
 * ADAM 2.0
 * ActionCenter.gs
 * Version 1.0
 *******************************************************/

/**
 * Returns the Action Center sheet for a module.
 */
function getActionSheet(module) {

  switch (module) {

    case MODULES.MOM:
      return getSheet(CONFIG.ACTION_SHEETS.MOM);

    case MODULES.SUBJECT:
      return getSheet(CONFIG.ACTION_SHEETS.SUBJECT);

    case MODULES.OBSERVATION:
      return getSheet(CONFIG.ACTION_SHEETS.OBSERVATION);

    default:
      throw new Error("Unknown module.");

  }

}

/*******************************************************
 * Returns all Action Center records.
 *******************************************************/
function getActionCenter(module) {

  const sh = getActionSheet(module);

  const values = sh.getDataRange().getValues();

  if (values.length <= 1) {

    return [];

  }

  return values.slice(1);

}

/*******************************************************
 * Add one record.
 *******************************************************/
function addActionRecord(module, record) {

  const sh = getActionSheet(module);

  sh.appendRow(record);

}

/*******************************************************
 * Replace all Action Center data.
 *******************************************************/
function replaceActionCenter(module, records) {

  const sh = getActionSheet(module);

  clearActionCenter(sh.getName());

  if (!records.length) return;

  sh.getRange(

    2,

    1,

    records.length,

    records[0].length

  ).setValues(records);

}

/*******************************************************
 * Delete one record.
 *******************************************************/
function deleteActionRecord(module, rowNumber) {

  const sh = getActionSheet(module);

  if (rowNumber <= 1) return;

  sh.deleteRow(rowNumber);

}

/*******************************************************
 * Update Category.
 *******************************************************/
function updateCategory(module, rowNumber, category) {

  const sh = getActionSheet(module);

  const lastColumn = sh.getLastColumn();

  sh.getRange(

    rowNumber,

    lastColumn - 1

  ).setValue(category);

}

/*******************************************************
 * Update Notes.
 *******************************************************/
function updateAmendmentReason(module, rowNumber, reason) {

  const sh = getActionSheet(module);

  const lastColumn = sh.getLastColumn();

  sh.getRange(

    rowNumber,

    lastColumn

  ).setValue(reason);

}

/*******************************************************
 * Count Action Center records.
 *******************************************************/
function getActionCount(module) {

  return getActionCenter(module).length;

}

/*******************************************************
 * Check if Action Center is empty.
 *******************************************************/
function isActionCenterEmpty(module) {

  return getActionCount(module) === 0;

}

/*******************************************************
 * Remove all records.
 *******************************************************/
function clearModuleActionCenter(module) {

  clearActionCenter(

    getActionSheet(module).getName()

  );

}

/*******************************************************
 * Returns category summary.
 *******************************************************/
function getActionSummary(module) {

  const rows = getActionCenter(module);

  const summary = {

    total: rows.length,

      flawless: 0,

      amendment: 0,

      notice: 0,

      missing: 0,

      excused: 0,

      review: 0

  };

  rows.forEach(function (row) {

    const category = row[7];

    switch (category) {

      case CATEGORY.FLAWLESS:
        summary.flawless++;
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

      default:
        summary.review++;

    }

  });

  return summary;

}

/*******************************************************
 * Validate Action Center.
 *******************************************************/
function validateActionCenter(module) {

  const rows = getActionCenter(module);

  if (rows.length === 0) {

    throw new Error("The Action Center is empty.");

  }

  rows.forEach(function (row, index) {

    const category = row[7]

    if (

      category === "" ||

      category === CATEGORY.REVIEW_REQUIRED

    ) {

      throw new Error(

        "Row " +

        (index + 2) +

        " has not been categorized."

      );

    }

  });

  return true;

}