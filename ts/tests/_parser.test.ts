import {assert, expect} from "chai";
import * as S from "string";
import testManager from "./testManager";
import {FileName} from "./testManager";

describe("Parser which is used to parse html into slots", () => {
    it("GetFileNameOf should return string based on FileName enum", () => {
        const plainHtml = new testManager().GetDataFrom(FileName.jiahau_2017_sept);
        const htmlDoc = new DOMParser().parseFromString(plainHtml, "text/html");
        const tableRows = htmlDoc
            .getElementById("overviewSector")
            .getElementsByTagName("table")[0]
            .getElementsByTagName("tbody")[0]
            .getElementsByTagName("tr");
        // i = 1 because we need to skip the first <tr> which is the header of the table
        for (let i = 1; i < tableRows.length; i++) {
            const cells = tableRows[i].getElementsByTagName("td");
            for (let j = 0; j < cells.length; j++) {
                switch (j) {
                    case 0: console.log("number = " + cells[j].innerHTML); break;
                    case 1: console.log("type   = " + cells[j].innerHTML); break;
                    case 2: console.log("group  = " + cells[j].innerHTML); break;
                    case 3: console.log("Size   = " + cells[j].innerHTML); break;
                    case 4: console.log("day    = " + cells[j].innerHTML); break;
                    case 5: console.log("time   = " + cells[j].innerHTML); break;
                    case 6: console.log("hour   = " + cells[j].innerHTML); break;
                    case 7: console.log("week   = " + cells[j].innerHTML); break;
                    case 8: console.log("room   = " + cells[j].innerHTML); break;
                    case 9: console.log("remark = " + cells[j].innerHTML); break;
                }
            }
        }

    });
});
