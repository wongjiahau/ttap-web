import { ParseFgoHtmlToRawSlot_v1 } from "./parser/parseFgoHtmlToRawSlot";

/**
 * This file is suppose to be run as script
 * Type the following command in bash:
 *     node ./src/core/parseFile.js
 */

function log(message: string): void {
  console.log(new Date() + " : " + message);
}
const fs = require("fs");
log("Loading file");
fs.readFile("./new2.html", (err: any, contents: any) => {
  if (err) {
    log("Load file error");
    log(err);
    return;
  }
  log("Parsing");
  const rawSlots2 = ParseFgoHtmlToRawSlot_v1(contents.toString());
  log("Finish parsing");
  fs.writeFile("./output.json", JSON.stringify(rawSlots2), (err2: any) => {
    if (!err2) {
      log("The file was saved as output.json");
    }
  });
  log("File saved succesfully.");
});
