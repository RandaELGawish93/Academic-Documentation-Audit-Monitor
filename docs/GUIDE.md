# ADAM (Academic Documentation Audit Monitor): illustrated guide

ADAM audits the documentation that departments upload to Google Drive each week (Minutes of Meetings, Subject Screening evidence and Teacher Observation forms). It lets a reviewer confirm a category for each department, then sends the matching email and tracks compliance.

> Every picture in this guide is an **illustration filled with fictional sample data** (names like *Sarah Collins*, emails at `example.edu`). No real school, staff or student data appears anywhere in this repository.

## Contents

- [Menu](#menu)
- [Web app pages](#web-app-pages)
- [Review and email flow](#review-and-email-flow)
- [Emails](#emails)
- [Data workbook tabs](#data-workbook-tabs)

## Menu

ADAM runs as a web app opened from the data spreadsheet. The custom **ADAM 2.0** menu is the entry point.

### ADAM 2.0 menu

![ADAM 2.0 menu](screenshots/adam-menu.png)

| Item | What it does |
|---|---|
| **Open Dashboard** | Opens the deployed ADAM web app in a new browser tab. All daily work happens there. (If the project has not been deployed as a web app yet, it tells you so.) |
| **Run Initial Setup** | Creates every data tab (Settings, Users, Email Log, Excusal Registry, the three directories and the three action centers) with headers and formatting. Safe to re-run. |
| **Validate Settings** | Checks that the required settings (Academic Year and Archive Root Folder) are filled in, and lists any that are missing. |
| **System Information** | Shows the app name and version with the current academic year, trimester and week. |
| **Reload Menu** | Rebuilds the menu after you edit code or settings. |

## Web app pages

The left sidebar switches between pages. The signed-in reviewer's email is shown top-right; only users listed on the Users page can open the app.

### Dashboard

![Dashboard](screenshots/adam-dashboard.png)

Pick an academic year, trimester and module to see the **recipient ranking** (each Head of Department's count of Flawless, Amendment, Notice, Missing and Excused results) and the overall compliance cards. Compliance is the share of results that are Flawless, Amendment Required or Excused.

### Settings

![Settings](screenshots/adam-page-settings.png)

General settings: academic year, **system type** (American or British grade naming), current trimester and week, total number of weeks and any merged weeks. *Directories* holds the Drive folder where archives and exports are saved. **Save Settings** writes to the Settings tab.

### Users

![Users](screenshots/adam-page-users.png)

Everyone who can use the app or receive copies of emails. Each row has a role (Academic Dean, Principal, Director of Curriculum and Instruction…), a scope (division) and a **Receive Emails** switch. People with Receive Emails on appear as optional CC recipients in every email preview.

### Minutes of Meetings audit

![Minutes of Meetings audit](screenshots/adam-page-mom.png)

Choose the trimester and week, then **Run Audit**. ADAM scans each department's Drive folder, counts the MoM files found against the number expected, checks the file type and naming, and suggests a category. You confirm or change the **Category** for each department, then click **Preview** to see the email before it is sent.

### Subject Screening audit

![Subject Screening audit](screenshots/adam-page-subject.png)

The same workflow for subject screening evidence. Each row is one department, subject and grade. The Evidence column summarises what was found (screening sheet plus samples, sheet only, nothing uploaded).

### Teacher Observation audit

![Teacher Observation audit](screenshots/adam-page-observation.png)

Compares the number of observation forms **expected** for each department with the number **uploaded**. Departments with an approved excusal can be set to *Excused*, which is recorded in the Excusal Registry and excluded from penalties.

### Archive

![Archive](screenshots/adam-page-archive.png)

Placeholder page for the end-of-year archive module, which is still under development.

## Review and email flow

Once a category is chosen, ADAM writes the right email for it.

### Amendment reason

![Amendment reason](screenshots/adam-amendment-reason.png)

Choosing **Amendment Required** asks for the reason: wrong file naming, unsupported file type, both, or a custom reason. The reason is inserted into the email and saved in the action center.

### Email preview (MoM)

![Email preview (MoM)](screenshots/adam-email-preview-mom.png)

**Preview** opens the finished email. The subject and To address are filled in from the directory; tick any of the Additional Recipients to CC them. **Send Email** sends it and logs it.

### Email preview (Subject Screening)

![Email preview (Subject Screening)](screenshots/adam-email-preview-subject.png)

The same preview for a Subject Screening result. The subject line names the subject and grade.

## Emails

There is one template per category. All share the same branded layout and summary table.

### Thank You (Flawless)

![Thank You (Flawless)](screenshots/adam-email-thank-you.png)

Sent when the submission is complete, on time and correctly named.

### Amendment Required

![Amendment Required](screenshots/adam-email-amendment-required.png)

Lists the reason for the amendment and asks the Head of Department to fix and re-upload.

### Notice (late submission)

![Notice (late submission)](screenshots/adam-email-notice.png)

The work was accepted but arrived after the deadline; a reminder to meet future deadlines.

### Missing Submission

![Missing Submission](screenshots/adam-email-missing-submission.png)

Nothing was found in the department's folder for that week.

## Data workbook tabs

ADAM stores everything in ordinary sheets, so you can always audit or export the data.

### Settings tab

![Settings tab](screenshots/adam-sheet-settings.png)

Key-value settings written by the Settings page, including which modules are switched on.

### Users tab

![Users tab](screenshots/adam-sheet-users.png)

The source for the Users page and the CC lists.

### MoM Directory

![MoM Directory](screenshots/adam-sheet-mom-directory.png)

One row per department: division, Head of Department, email and the Drive **Folder ID** that the MoM scanner reads.

### Subject Screening Directory

![Subject Screening Directory](screenshots/adam-sheet-subject-screening-directory.png)

One row per department, subject and grade, with its evidence folder.

### Observation Directory

![Observation Directory](screenshots/adam-sheet-observation-directory.png)

One row per department with the number of observations expected per cycle and its folder.

### MoM Action Center

![MoM Action Center](screenshots/adam-mom-action-center.png)

Every audit result for Minutes of Meetings: the audit ID, files found versus expected, the status, the chosen category and any amendment reason.

### Subject Screening Action Center

![Subject Screening Action Center](screenshots/adam-sheet-subject-screening-action-center.png)

Audit results for Subject Screening.

### Observation Action Center

![Observation Action Center](screenshots/adam-sheet-observation-action-center.png)

Audit results for Teacher Observation.

### Email Log

![Email Log](screenshots/adam-sheet-email-log.png)

Every email sent: who it went to, the CCs, the category, the subject, who sent it and when.

### Excusal Registry

![Excusal Registry](screenshots/adam-sheet-excusal-registry.png)

Departments excused from a given audit, who approved the excusal and when.

---

[← Back to the README](../README.md)
