"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseFgoHtmlToRawSlot_1 = require("./parser/parseFgoHtmlToRawSlot");
/**
 * This file is suppose to be run as script
 * Type the following command in bash:
 *     node ./src/core/parseFile.js
 */
function log(message) {
    console.log(new Date() + " : " + message);
}
const fs = require("fs");
log("Loading file");
fs.readFile("./new2.html", (err, contents) => {
    if (err) {
        log("Load file error");
        log(err);
        return;
    }
    log("Parsing");
    const rawSlots2 = parseFgoHtmlToRawSlot_1.ParseFgoHtmlToRawSlot(contents.toString());
    log("Finish parsing");
    fs.writeFile("./output.json", JSON.stringify(rawSlots2), (err2) => {
        if (!err2) {
            log("The file was saved as output.json");
        }
    });
    log("File saved succesfully.");
});
//# sourceMappingURL=parseFile.js.map