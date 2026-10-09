# ADAM — Academic Documentation Audit Monitor

![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-V8-4285F4?logo=google&logoColor=white)
![Type](https://img.shields.io/badge/type-Web%20App-0b5394)
![License: MIT](https://img.shields.io/badge/license-MIT-green)

**ADAM** is a Google Apps Script web application that automates weekly documentation audits for a school's academic leadership team. It scans each department's Google Drive folders, checks what was submitted against what was expected, and turns the results into a review queue with ready-to-send, templated emails.

It replaces a manual routine of opening dozens of folders every week, checking file names and dates, and writing individual follow-up emails.

---

## Features

- **Three audit modules in one app**
  - **Minutes of Meetings (MoM)**: checks that every department uploaded its meeting minutes on time and in an approved format.
  - **Subject Screening**: finds each department's trimester and week folder and collects the evidence uploaded by the Head of Department.
  - **Teacher Observation**: scans observation folders by department, trimester and week.
- **Recursive Drive scanning** with smart trimester and week folder matching, tolerant of naming variations.
- **Review-status workflow**: every result is classified as *Flawless*, *Amendment Required*, *Notice*, *Missing Submission*, *Excused* or *Review Required*.
- **Action Centers**: one sheet per module where the reviewer confirms each status before anything is sent.
- **Category-based email workflow**: HTML templates for Thank-You, Amendment, Notice and Missing-Submission emails, with a preview before sending.
- **Excusal Registry**: record approved excuses so departments aren't flagged twice.
- **Compliance analytics**: per-module compliance rate and trimester-level dashboard.
- **Role-based access**: a Users sheet controls who can open the app, their role and their scope (division and system).
- **Email log**: every message sent is recorded.
- **Multi-system support**: American, British, or both, chosen in Settings.

## How it works

```
Google Drive (department folders)
        │  recursive scan
        ▼
  Scanners ──► Validators ──► Action Center sheet ──► Reviewer confirms
                                                  │
                                                  ▼
                                   Email templates ──► Email Log
                                                  │
                                                  ▼
                                    Dashboard (compliance analytics)
```

| Layer | Files |
|---|---|
| Entry point and web app | `Code.gs`, `Menu.gs`, `MasterLayout.html`, `Dashboard.html`, `Scripts.html`, `Styles.html` |
| Configuration and setup | `Config.gs`, `Settings.gs`, `Setup.gs`, `SettingsDesign.html` |
| Security and users | `Security.gs`, `Users.html` |
| Audit core | `AuditEngine.gs`, `Drive.gs`, `Utilities.gs`, `Excusal.gs` |
| MoM module | `MoM*.gs`, `MoMDesign.html` |
| Subject Screening module | `SubjectScreening*.gs`, `SubjectScreeningDesign.html` |
| Teacher Observation module | `TeacherObservation*.gs`, `TeacherObservationDesign.html` |
| Emails | `Email.gs`, `MasterEmail.html`, `ThankYou.html`, `Amendment.html`, `Notice.html`, `MissingSubmission.html`, `AmendmentReason.html`, `Preview.html` |

## Tech stack

Google Apps Script (V8) · HtmlService (single-page web app) · SpreadsheetApp · DriveApp · GmailApp

## Setup

### Option A: copy and paste (no tools needed)

1. Create a new Google Sheet that will hold ADAM's data.
2. Open **Extensions → Apps Script**.
3. Recreate each file from `src/`. Use the same file names, and choose *Script* for `.gs` files and *HTML* for `.html` files.
4. Save, reload the spreadsheet, and run **ADAM 2.0 → Run Initial Setup** from the menu. This creates every required sheet.
5. Fill in the **Settings** sheet (academic year, system type, current trimester and week, archive folder) and the **Users** sheet (yourself first).
6. Fill in the three **Directory** sheets: one row per department with its Head of Department, email and Drive folder.
7. **Deploy → New deployment → Web app**. Choose who can access it, then open the web app URL.

### Option B: clasp

```bash
npm install -g @google/clasp
clasp login
cp .clasp.json.example .clasp.json   # then paste your script ID
clasp push
```

## Configuration

| Setting | Purpose |
|---|---|
| Academic Year | Shown in emails and reports |
| System Type | `American`, `British`, or `American & British` |
| Current Trimester / Current Week | Drives which folders are scanned |
| Number of Weeks / Merged Weeks | Calendar handling for short or combined weeks |
| Academic Dean / Associate Academic Dean / Principals / Directors | Email CC routing |
| Archive Root Folder | Drive folder ID for archives |

`appsscript.json` uses `Etc/UTC`. Set `timeZone` to your own zone.

## Privacy

The repository contains **no data**. All names, emails and folder IDs live only in your own spreadsheet. Access to the web app is restricted to the users listed in the **Users** sheet.

## License

[MIT](LICENSE) © Randa ELGawish

## Author

**Randa ELGawish**, Academic leader and EdTech developer
[LinkedIn](https://www.linkedin.com/in/randaelgawishegy) · [GitHub](https://github.com/RandaELGawish93)
