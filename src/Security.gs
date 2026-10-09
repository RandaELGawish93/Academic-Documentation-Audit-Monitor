/*******************************************************
 * ADAM 2.0
 * Security.gs
 * Version 2.0
 *
 * Reads authorized users from the Users sheet.
 *******************************************************/

/**
 * Validate access.
 */
function validateAccess() {

  const email = getUserEmail();

  const allowedUsers = getAllowedUsers();

  if (!allowedUsers.includes(email)) {

    throw new Error(
      "Access denied.\n\nYour Google account is not authorized to use ADAM 2.0."
    );

  }

  return true;

}

/*******************************************************
 * Current user email.
 *******************************************************/
function getUserEmail() {

  return Session
    .getActiveUser()
    .getEmail()
    .trim()
    .toLowerCase();

}

/*******************************************************
 * Returns all ACTIVE users.
 *******************************************************/
function getAllowedUsers() {

  const sh = getSheet("Users");

  if (!sh) {

    throw new Error(
      "Users sheet not found."
    );

  }

  const values = sh.getDataRange().getValues();

  const users = [];

  for (let i = 1; i < values.length; i++) {

    const active = values[i][0];
    const email = values[i][4];

    if (
      active === true &&
      email !== ""
    ) {

      users.push(

        email
          .toString()
          .trim()
          .toLowerCase()

      );

    }

  }

  return users;

}

/*******************************************************
 * Returns the current user record.
 *******************************************************/
function getCurrentUserRecord() {

  const email = getUserEmail();

  const sh = getSheet("Users");

  const values = sh.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {

    if (

      values[i][4]
      .toString()
      .trim()
      .toLowerCase()

      ===

      email

    ) {

      return {

        active: values[i][0],

        role: values[i][1],

        scope: values[i][2],

        name: values[i][3],

        email: values[i][4],

        receiveEmails: values[i][5],

        notes: values[i][6]

      };

    }

  }

  return null;

}

/*******************************************************
 * Current user's role.
 *******************************************************/
function getCurrentUserRole() {

  const user = getCurrentUserRecord();

  if (!user) {

    return "";

  }

  return user.role;

}

/*******************************************************
 * Current user's scope.
 *******************************************************/
function getCurrentUserScope() {

  const user = getCurrentUserRecord();

  if (!user) {

    return "";

  }

  return user.scope;

}

/*******************************************************
 * Role check.
 *******************************************************/
function userHasRole(role) {

  const user = getCurrentUserRecord();

  if (!user) {

    return false;

  }

  return user.role === role;

}

/*******************************************************
 * Returns all users of one role.
 *******************************************************/
function getUsersByRole(role) {

  const sh = getSheet("Users");

  const values = sh.getDataRange().getValues();

  const users = [];

  for (let i = 1; i < values.length; i++) {

    if (

      values[i][0] === true &&

      values[i][1] === role

    ) {

      users.push({

        scope: values[i][2],

        name: values[i][3],

        email: values[i][4],

        receiveEmails: values[i][5],

        notes: values[i][6]

      });

    }

  }

  return users;

}

/*******************************************************
 * Returns all active users.
 *******************************************************/
function getAllUsers() {

  const sh = getSheet("Users");

  const values = sh.getDataRange().getValues();

  const users = [];

  for (let i = 1; i < values.length; i++) {

    users.push({

      active: values[i][0],

      role: values[i][1],

      scope: values[i][2],

      name: values[i][3],

      email: values[i][4],

      receiveEmails: values[i][5],

      notes: values[i][6]

    });

  }

  return users;

}
/*******************************************************
 * Save Users
 *******************************************************/
function saveUsers(users) {

  const sh = getSheet("Users");

  if (!sh) {

    throw new Error("Users sheet not found.");

  }

  if (!users || users.length === 0) {

    return;

  }
  const data = users.map(function(user) {

    return [

      user.active,

      user.role,

      user.scope,

      user.name,

      user.email,

      user.receiveEmails,

      ""

    ];

  });

  // Clear existing user records only
  if (sh.getLastRow() > 1) {

    sh.getRange(
      2,
      1,
      sh.getLastRow() - 1,
      7
    ).clearContent();

  }

  // Write updated users
  sh.getRange(
    2,
    1,
    data.length,
    7
  ).setValues(data);

}
/*******************************************************
 * Returns users who should receive emails.
 *******************************************************/
function receiveEmails() {

  const sh = getSheet("Users");
  if (!sh) {
    throw new Error("Users sheet not found.");
  }

  const values = sh.getDataRange().getValues();

  const users = [];

  for (let i = 1; i < values.length; i++) {

    const active = values[i][0];
    const role = values[i][1];
    const scope = values[i][2];
    const name = values[i][3];
    const email = values[i][4];
    const receive = values[i][5];
    const notes = values[i][6];

    if (
      active === true &&
      receive === true &&
      email !== ""
    ) {

      users.push({
        role: role,
        scope: scope,
        name: name,
        email: email.toString().trim().toLowerCase(),
        notes: notes
      });

    }

  }

  return users;

}
