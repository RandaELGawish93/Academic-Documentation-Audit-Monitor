// @ts-nocheck
/*******************************************************
 * ADAM 2.0
 * Config.gs
 * Version 1.0
 *******************************************************/

/**
 * Global Configuration
 * This file contains only constants.
 * Never write business logic here.
 */

const CONFIG = {

  APP_NAME: "ADAM 2.0",

  VERSION: "1.0",

  TIMEZONE: Session.getScriptTimeZone(),

  DATE_FORMAT: "dd/MM/yyyy",

  DATETIME_FORMAT: "dd/MM/yyyy HH:mm:ss",

  REVIEW_STATUS: {

    REVIEW_REQUIRED: "Review Required",
    FLAWLESS: "Flawless",
    AMENDMENT: "Amendment Required",
    NOTICE: "Notice",
    MISSING: "Missing Submission",
    EXCUSED: "Excused"

  },

  MODULES: {

    MOM: "Minutes of Meetings",

    SUBJECT: "Subject Screening",

    OBSERVATION: "Teacher Observation"

  },

  ACTION_SHEETS: {

    MOM: "MoM Action Center",

    SUBJECT: "Subject Screening Action Center",

    OBSERVATION: "Observation Action Center"

  },

  DIRECTORY_SHEETS: {

    MOM: "MoM Directory",

    SUBJECT: "Subject Screening Directory",

    OBSERVATION: "Observation Directory"

  },

  SHARED_SHEETS: {

    SETTINGS: "Settings",
    
    USERS: "Users",

    EMAIL_LOG: "Email Log",

    EXCUSAL: "Excusal Registry"

  },

  SETTINGS_KEYS: {

    ACADEMIC_YEAR: "Academic Year",

    SYSTEM_TYPE: "System Type",

    CURRENT_TRIMESTER: "Current Trimester",

    CURRENT_WEEK: "Current Week",

    NUMBER_OF_WEEKS: "Number of Weeks",

    MERGED_WEEKS: "Merged Weeks",

    PRIMARY_DEAN: "Academic Dean",

    ASSOCIATE_DEAN: "Associate Academic Dean",

    PRINCIPALS: "Principals",

    DIRECTORS: "Directors",

    ARCHIVE_ROOT: "Archive Root Folder"

  },

  SYSTEM_TYPES: [

    "American",
    "British",
    "American & British"

  ],

  TRIMESTERS: [
    
    "Induction Week",
    "Trimester 1",
    "Trimester 2",
    "Trimester 3"

  ],

  EMAIL_TYPES: {

    THANK_YOU: "Thank You",

    AMENDMENT: "Amendment",

    MISSING: "Missing Submission"

  },

  FILE_TYPES: {

  PDF: "application/pdf",

  DOC: "application/msword",

  DOCX: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  GOOGLE_DOC: "application/vnd.google-apps.document"

  }

};

/*******************************************************
 * Sheet Names
 *******************************************************/

const SHEETS = CONFIG.SHARED_SHEETS;

/*******************************************************
 * Modules
 *******************************************************/

const MODULES = CONFIG.MODULES;

/*******************************************************
 * Categories
 *******************************************************/

const CATEGORY = CONFIG.REVIEW_STATUS;

/*******************************************************
 * Email Types
 *******************************************************/

const EMAIL = CONFIG.EMAIL_TYPES;
