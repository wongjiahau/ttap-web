import { ParseLargeHtmlToRawSlot } from "./parser/parseLargeHtmlToRawSlot";

/**
 * This file is suppose to be run as script
 */

function log(message: string): void {
    console.log(new Date() + " : " + message);
}
const fs = require("fs");
log("Loading file");
fs.readFile("./new1.html", (err, contents) => {
    if (err) {
        log("Load file error");
        log(err);
        return;
    }
    log("Parsing");
    const rawSlots2 = ParseLargeHtmlToRawSlot(contents.toString());
    log("Finish parsing");
    fs.writeFile("./output.json", JSON.stringify(rawSlots2), (err2) => {
        if (!err2) {
            log("The file was saved as output.json");
        }
    });
    log("File saved succesfully.");
});
