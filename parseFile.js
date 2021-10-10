"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parseLargeHtmlToRawSlot_1 = require("./src/core/parser/parseLargeHtmlToRawSlot");
/**
 * This file is suppose to be run as script
 * Type the following command in bash:
 *     node parseFile.js
 *
 * Remember to change the INPUT_FILENAME
 */

const INPUT_FILENAME = "./new.html";
function log(message) {
  console.log(new Date() + " : " + message);
}
var fs = require("fs");
log("Loading file");
fs.readFile(INPUT_FILENAME, function (err, contents) {
  if (err) {
    log("Load file error");
    log(err);
    return;
  }
  log("Parsing");
  var rawSlots2 = parseLargeHtmlToRawSlot_1.ParseLargeHtmlToRawSlot(
    contents.toString()
  );
  log("Finish parsing");
  fs.writeFile("./output.json", JSON.stringify(rawSlots2), function (err2) {
    if (!err2) {
      log("The file was saved as output.json");
    }
  });
  log("File saved succesfully.");
});
//# sourceMappingURL=parseFile.js.map
