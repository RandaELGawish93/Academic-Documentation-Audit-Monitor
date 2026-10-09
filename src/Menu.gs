/*******************************************************
 * ADAM 2.0
 * Menu.gs
 * Version 1.0
 *******************************************************/

/**
 * Runs automatically when the spreadsheet opens.
 */
function onOpen() {

  SpreadsheetApp.getUi()
    .createMenu("ADAM 2.0")
    .addItem("Open Dashboard", "openApplication")
    .addSeparator()
    .addItem("Run Initial Setup", "setupSystem")
    .addSeparator()
    .addItem("Validate Settings", "validateSettings")
    .addItem("System Information", "systemInformation")
    .addSeparator()
    .addItem("Reload Menu", "onOpen")
    .addToUi();

}

/*******************************************************
 * Opens Web App
 *******************************************************/

function openApplication() {

  const url = ScriptApp.getService().getUrl();

  if (!url) {

    SpreadsheetApp.getUi().error(
      "Deploy the project as a Web App first."
    );

    return;

  }

  const html = HtmlService.createHtmlOutput(
    '<script>window.open("' +
      url +
      '","_blank");google.script.host.close();</script>'
  )
  .setWidth(100)
  .setHeight(50);

  SpreadsheetApp.getUi().showModalDialog(html, "Opening ADAM...");

}

/*******************************************************
 * Validate Required Settings
 *******************************************************/

function validateSettings() {

  const required = [

    "Academic Year",
    "Archive Root Folder"

  ];

  const settings = getSettings();

  const missing = [];

  required.forEach(function(item){

    if(
      settings[item] === "" ||
      settings[item] === null ||
      settings[item] === undefined
    ){

      missing.push(item);

    }

  });

  if(missing.length===0){

    SpreadsheetApp.getUi().success(
      "Settings validation successful."
    );

    return;

  }

  SpreadsheetApp.getUi().error(

    "Missing Settings:\n\n" +

    missing.join("\n")

  );

}

/*******************************************************
 * System Information
 *******************************************************/

function systemInformation(){

  const settings = getSettings();

  const message =

      "Application : " + CONFIG.APP_NAME + "\n\n" +

      "Version : " + CONFIG.VERSION + "\n\n" +

      "Academic Year : " +

      (settings["Academic Year"] || "-") +

      "\n\nCurrent Trimester : " +

      (settings["Current Trimester"] || "-") +

      "\n\nCurrent Week : " +

      (settings["Current Week"] || "-");

  SpreadsheetApp.getUi().success(message);

}