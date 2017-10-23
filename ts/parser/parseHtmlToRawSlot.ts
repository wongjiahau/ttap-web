import {last} from "lodash";
import * as S from "string";
import RawSlot from "../model/rawSlot";
export default function parser(html: string): RawSlot[] {
    const result = new Array < RawSlot > ();
    const htmlDoc = new DOMParser().parseFromString(html, "text/html");
    const tableRows = htmlDoc
        .getElementById("overviewSector")
        .getElementsByTagName("table")[0]
        .getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr");
    // i = 1 because we need to skip the first <tr> which is the header of the table
    let currentSubjectName: string;
    let currentSubjectCode: string;
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
                continue;
            } catch (error) {
                console.log("Error: " + error);
                console.log("Cannot parse " + cells[0].innerHTML + " as subject name/code");
            }
        }
        const newSlot = new RawSlot();
        newSlot.SubjectCode = currentSubjectCode;
        newSlot.SubjectName = currentSubjectName;
        let offset = 0;
        if (S(currentRow.id).contains("subRow")) {
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
                    newSlot.CreditHour = cellValue;
                    break;
                case 7:
                    newSlot.WeekNumber = cellValue;
                    break;
                case 8:
                    newSlot.Remark = cellValue;
                    break;
                case 9:
                    newSlot.Room = cellValue;
                    break;
            }
        }
        result.push(newSlot);
    }
    return result;
}
