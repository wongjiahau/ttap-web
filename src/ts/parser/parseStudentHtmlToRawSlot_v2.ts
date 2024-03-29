const last = require("lodash.last");

import { RawSlot } from "../model/rawSlot";
import { Str } from "../util/str";
export default function ParseStudentHtmlToRawSlot_v2(html: string): RawSlot[] {
  const result = new Array<RawSlot>();
  const htmlDoc = new DOMParser().parseFromString(html, "text/html");
  // @ts-ignore
  const tableRows = Array.from(
    htmlDoc
      .getElementById("overviewSector")
      ?.getElementsByTagName("table")[0]
      .getElementsByTagName("tbody")[0].childNodes ?? []
  ).filter((x) => x.nodeName === "TR");
  // i = 1 because we need to skip the first <tr> which is the header of the table
  let currentSubjectName: string = "";
  let currentSubjectCode: string = "";
  let currentCreditHour: string = "";
  for (let i = 1; i < tableRows.length; i++) {
    const currentRow = tableRows[i] as HTMLTableRowElement;
    const cells = currentRow.getElementsByTagName("td");
    if (cells.length === 1 || cells.length === 4) {
      try {
        currentSubjectCode = cells[0].innerHTML.split(" - ")[0];
        currentSubjectName = cells[0].innerHTML
          .split(" - ")[1]
          .split("[")[0]
          .replace("&amp;", "&")
          .trim();
        currentCreditHour = cells[0].innerHTML
          .split(" - ")[1]
          .split("[")[1]
          .split("]")[0];

        continue;
      } catch (error) {
        console.log("Error: " + error);
        console.log(
          "Cannot parse " + cells[0].innerHTML + " as subject name/code"
        );
      }
    }
    const newSlot = new RawSlot();
    newSlot.SubjectCode = currentSubjectCode;
    newSlot.SubjectName = currentSubjectName;
    newSlot.CreditHour = currentCreditHour;
    let offset = 0;
    if (new Str(currentRow.id).Contains("subRow")) {
      offset = 5;
      newSlot.Number = last(result).Number;
      newSlot.Type = last(result).Type;
      newSlot.Group = last(result).Group;
      newSlot.ClassMode = last(result).ClassMode;
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
          newSlot.ClassMode = cellValue;
        case 4:
          newSlot.ClassSize = cellValue;
          break;
        case 5:
          newSlot.Day = cellValue;
          break;
        case 6:
          newSlot.TimePeriod = cellValue;
          break;
        case 7:
          // NOTE: Credit Hour is not the same as Hour
          break;
        case 8:
          newSlot.WeekNumber = cellValue;
          break;
        case 9:
          newSlot.Room = cellValue;
          break;
        case 10:
          newSlot.Remark = cellValue;
          break;
      }
    }
    result.push(newSlot);
  }
  return result;
}
