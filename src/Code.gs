/*******************************************************
 * ADAM 2.0
 * Code.gs
 * Version 1.0
 *******************************************************/

/**
 * Entry Point
 */
function doGet() {

  validateAccess();

  return HtmlService
    .createTemplateFromFile("MasterLayout")
    .evaluate()
    .setTitle(CONFIG.APP_NAME)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

}

/**
 * Include HTML Partials
 */
function include(filename) {

  return HtmlService
    .createHtmlOutputFromFile(filename)
    .getContent();

}

/**
 * Application Information
 */
function getApplicationInfo() {

  return {

    appName: CONFIG.APP_NAME,
    version: CONFIG.VERSION,
    timezone: CONFIG.TIMEZONE

  };

}

/**
 * Dashboard Initial Data
 */
function getDashboardData() {

  return {

    appName: CONFIG.APP_NAME,

    version: CONFIG.VERSION,

    modules: Object.values(CONFIG.MODULES),

    categories: Object.values(CONFIG.REVIEW_STATUS)

  };

}

/**
 * Settings Initial Data
 */
function getSettingsData() {

  return {

    academicYears: [],

    systemTypes: CONFIG.SYSTEM_TYPES,

    trimesters: CONFIG.TRIMESTERS

  };

}

/**
 * Active User
 */
function getCurrentUser() {

  const email = Session.getActiveUser().getEmail();

  return {

    email: email,

    name: email.split("@")[0]

  };

}

/**
 * Navigation
 */
function getModules() {

  return [

    {
      id: "dashboard",
      title: "Dashboard"
    },

    {
      id: "settings",
      title: "Settings"
    },

    {
      id: "mom",
      title: "Minutes of Meetings"
    },

    {
      id: "subject",
      title: "Subject Screening"
    },

    {
      id: "observation",
      title: "Teacher Observation"
    },


    {
      id: "archive",
      title: "Archive"
    }

  ];

}

/**
 * Server Health Check
 */
function ping() {

  return {

    success: true,

    timestamp: new Date(),

    version: CONFIG.VERSION

  };

}