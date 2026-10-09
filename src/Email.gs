/*******************************************************
 * ADAM 2.0
 * Email.gs
 * Version 2.0
 *******************************************************/

/*******************************************************
 * Send Email
 *******************************************************/
function sendEmail(data){

  const subject = buildEmailSubject(data);

  const html = renderEmail(data);

  GmailApp.sendEmail(

    data.email,

    subject,

    "",

    {

      htmlBody: html,

      cc: data.cc || ""

    }

);

  writeEmailLog({

    auditID: data.auditID,

    module: data.module,

    recipient: data.name,

    email: data.email,

    cc: data.cc || "",

    category: data.category,

    subject: subject,

    sentBy: getUserEmail()

  });
  return true;

}

/*******************************************************
 * Preview
 *******************************************************/
function previewEmail(data){

  return{

    subject: buildEmailSubject(data),

    html:renderEmail(data)

  };

}

/*******************************************************
 * Render Email
 *******************************************************/
function renderEmail(data){

  const master=

    HtmlService.createTemplateFromFile(

      "MasterEmail"

    );

  master.title=getEmailTitle(data.category);

  master.subtitle=

    data.module;

  master.body=

    renderEmailBody(data);

  return master.evaluate().getContent();

}

/*******************************************************
 * Email Body
 *******************************************************/
function renderEmailBody(data){

  let file="";

  switch(data.category){

    case CATEGORY.FLAWLESS:

      file="ThankYou";

      break;

    case CATEGORY.AMENDMENT:

      file="Amendment";

      break;

    case CATEGORY.NOTICE:

      file="Notice";

      break;

    case CATEGORY.MISSING:

      file="MissingSubmission";

      break;

    default:

       throw new Error("Unknown email category.");

  }

  const html=

    HtmlService.createTemplateFromFile(file);

    html.name = data.name;

    html.moduleName = data.module;

    html.subjectName = data.subjectName || "";

    html.grade = data.grade || "";

    html.amendmentReason = data.amendmentReason || "";

    html.week = data.week || getCurrentWeek();

    html.trimester = data.trimester || getCurrentTrimester();

    html.academicYear = getAcademicYear();

  return html.evaluate().getContent();

}

/*******************************************************
 * Email Titles
 *******************************************************/
function getEmailTitle(category){

  switch(category){

    case CATEGORY.FLAWLESS:
      return "Thank You";

    case CATEGORY.AMENDMENT:
      return "Amendment Required";

    case CATEGORY.NOTICE:
      return "Notice";

    case CATEGORY.MISSING:
      return "Missing Submission";

    default:
      throw new Error(
        "Unknown email category: " + category
      );

  }

}

/*******************************************************
 * Subject
 *******************************************************/
function buildEmailSubject(data){

  let subject =

    getAcademicYear()

    +

    ": "

    +

    data.module;

  if(data.subjectName){

    subject +=

      " - "

      +

      data.subjectName

      +

      " ("

      +

      data.grade

      +

      ")";

  }

  subject +=

    " - "

    +

    data.category

    +

    " - "

    +

    (data.trimester || getCurrentTrimester())

    +

    " Week "

    +

    (data.week || getCurrentWeek());

  return subject;

}