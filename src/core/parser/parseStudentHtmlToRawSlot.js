"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const last = require("lodash.last");
const rawSlot_1 = require("../model/rawSlot");
const str_1 = require("../util/str");
function ParseStudentHtmlToRawSlot(html) {
    const result = new Array();
    const htmlDoc = new DOMParser().parseFromString(html, "text/html");
    // @ts-ignore
    const tableRows = htmlDoc
        .getElementById("overviewSector")
        .getElementsByTagName("table")[0]
        .getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr");
    // i = 1 because we need to skip the first <tr> which is the header of the table
    let currentSubjectName = "";
    let currentSubjectCode = "";
    let currentCreditHour = "";
    for (let i = 1; i < tableRows.length; i++) {
        const currentRow = tableRows[i];
        const cells = currentRow.getElementsByTagName("td");
        if (cells.length === 1) {
            try {
                currentSubjectCode = cells[0]
                    .innerHTML
                    .split(" - ")[0];
                currentSubjectName = cells[0]
                    .innerHTML
                    .split(" - ")[1]
                    .split("[")[0]
                    .replace("&amp;", "&")
                    .trim();
                currentCreditHour = cells[0]
                    .innerHTML
                    .split(" - ")[1]
                    .split("[")[1]
                    .split("]")[0];
                continue;
            }
            catch (error) {
                console.log("Error: " + error);
                console.log("Cannot parse " + cells[0].innerHTML + " as subject name/code");
            }
        }
        const newSlot = new rawSlot_1.RawSlot();
        newSlot.SubjectCode = currentSubjectCode;
        newSlot.SubjectName = currentSubjectName;
        newSlot.CreditHour = currentCreditHour;
        let offset = 0;
        if (new str_1.Str(currentRow.id).Contains("subRow")) {
            offset = 4;
            newSlot.Number = last(result).Number;
            newSlot.Type = last(result).Type;
            newSlot.Group = last(result).Group;
        }
        for (let j = 0; j < cells.length; j++) {
            const cellValue = cells[j].innerHTML;
            switch (j + offset) {
                case 0:
                    newSlot.Number = cellValue;
                    break;
                case 1:
                    newSlot.Type = cellValue;
                    break;
                case 2:
                    newSlot.Group = cellValue;
                    break;
                case 3:
                    newSlot.ClassSize = cellValue;
                    break;
                case 4:
                    newSlot.Day = cellValue;
                    break;
                case 5:
                    newSlot.TimePeriod = cellValue;
                    break;
                case 6:
                    // NOTE: Credit Hour is not the same as Hour
                    break;
                case 7:
                    newSlot.WeekNumber = cellValue;
                    break;
                case 8:
                    newSlot.Room = cellValue;
                    break;
                case 9:
                    newSlot.Remark = cellValue;
                    break;
            }
        }
        result.push(newSlot);
    }
    return result;
}
exports.default = ParseStudentHtmlToRawSlot;
//# sourceMappingURL=parseStudentHtmlToRawSlot.js.map