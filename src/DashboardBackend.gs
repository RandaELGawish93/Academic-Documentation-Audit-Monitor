/*******************************************************
 * ADAM 2.0
 * Dashboard.gs
 * Version 1.0
 *******************************************************/
/*******************************************************
 * Return Dashboard Settings
 *******************************************************/
function getDashboardSettings() {

  return {

    academicYear: getAcademicYear(),

    trimester: getCurrentTrimester()

  };

}

/*******************************************************
 * Return Recipient Ranking
 *******************************************************/
function getRecipientRanking(module) {

  const sh = getSheet(SHEETS.EMAIL_LOG);

  const values = sh.getDataRange().getValues();

  if (values.length <= 1) return [];

  const headers = values.shift();

  const moduleCol = headers.indexOf("Module");
  const recipientCol = headers.indexOf("Recipient");
  const categoryCol = headers.indexOf("Category");

  const ranking = {};

  values.forEach(row => {

    if (row[moduleCol] !== module) return;

    const recipient = row[recipientCol];
    const category = row[categoryCol];

    if (!ranking[recipient]) {

      ranking[recipient] = {
        recipient: recipient,
        flawless: 0,
        amendment: 0,
        notice: 0,
        missing: 0,
        excused: 0,
        compliance: 0
      };

    }

    switch (category) {

      case "Flawless":
        ranking[recipient].flawless++;
        break;

      case "Amendment Required":
        ranking[recipient].amendment++;
        break;

      case "Notice":
        ranking[recipient].notice++;
        break;

      case "Missing Submission":
        ranking[recipient].missing++;
        break;

      case "Excused":
        ranking[recipient].excused++;
        break;

    }

  });

  const result = Object.values(ranking);
  const approvedExcused = getApprovedExcusals(module);

  Object.entries(approvedExcused).forEach(([hod, count]) => {

  let recipient = result.find(r => r.recipient === hod);

  if (recipient) {

    recipient.excused += count;

  } else {

    result.push({
      recipient: hod,
      flawless: 0,
      amendment: 0,
      notice: 0,
      missing: 0,
      excused: count,
      compliance: 0
    });

  }

});

  result.forEach(item => {
    item.compliance = calculateCompliance(item);
  });

  result.sort((a, b) => b.compliance - a.compliance);

  return result;

}

/*******************************************************
 * Calculate Compliance
 *******************************************************/
function calculateCompliance(stats) {

  const total =
    stats.flawless +
    stats.amendment +
    stats.notice +
    stats.missing +
    stats.excused;

  if (total === 0) return 0;

  return Math.round(
    ((stats.flawless + stats.amendment + stats.excused) / total) * 100
  );

}

/*******************************************************
 * Return Dashboard Summary
 *******************************************************/
function getDashboardSummary(module) {

  const sh = getSheet(SHEETS.EMAIL_LOG);

  const values = sh.getDataRange().getValues();

  if (values.length <= 1) {

    return {
      flawless: { count: 0, percentage: 0 },
      amendment: { count: 0, percentage: 0 },
      notice: { count: 0, percentage: 0 },
      missing: { count: 0, percentage: 0 },
      excused: { count: 0, percentage: 0 },
      compliance: 0
    };

  }

  const headers = values.shift();

  const moduleCol = headers.indexOf("Module");
  const categoryCol = headers.indexOf("Category");

  const stats = {
    flawless: 0,
    amendment: 0,
    notice: 0,
    missing: 0,
    excused: 0
  };

  // Read Email Log
  values.forEach(row => {

    if (row[moduleCol] !== module) return;

    switch (row[categoryCol]) {

      case "Flawless":
        stats.flawless++;
        break;

      case "Amendment Required":
        stats.amendment++;
        break;

      case "Notice":
        stats.notice++;
        break;

      case "Missing Submission":
        stats.missing++;
        break;

    }

  });

  // Read approved excusals from the Excusal Registry
  const approvedExcused = getApprovedExcusals(module);

  stats.excused = Object.values(approvedExcused)
    .reduce((total, count) => total + count, 0);

  const total =
    stats.flawless +
    stats.amendment +
    stats.notice +
    stats.missing +
    stats.excused;

  return {
    flawless: {
      count: stats.flawless,
      percentage: total ? Math.round((stats.flawless / total) * 100) : 0
    },
    amendment: {
      count: stats.amendment,
      percentage: total ? Math.round((stats.amendment / total) * 100) : 0
    },
    notice: {
      count: stats.notice,
      percentage: total ? Math.round((stats.notice / total) * 100) : 0
    },
    missing: {
      count: stats.missing,
      percentage: total ? Math.round((stats.missing / total) * 100) : 0
    },
    excused: {
      count: stats.excused,
      percentage: total ? Math.round((stats.excused / total) * 100) : 0
    },
    compliance: calculateCompliance(stats)
  };

}
/*******************************************************
 * Return Dashboard Data
 *******************************************************/
function getDashboardData(module) {

  const ranking = getRecipientRanking(module);

  return {
    settings: getDashboardSettings(),
    ranking: ranking,
    summary: getDashboardSummary(module)
  };

}

/*******************************************************
 * Return Approved Excuses from the Excusal Registry
 *******************************************************/
function getApprovedExcusals(module) {

  const sh = getSheet(SHEETS.EXCUSAL);

  const values = sh.getDataRange().getValues();

  if (values.length <= 1) return {};

  const headers = values.shift();

  const moduleCol = headers.indexOf("Module");
  const hodCol = headers.indexOf("HoD");

  const excused = {};

  values.forEach(row => {

    if (row[moduleCol] !== module) return;

    const hod = row[hodCol];

    excused[hod] = (excused[hod] || 0) + 1;

  });

  return excused;

}