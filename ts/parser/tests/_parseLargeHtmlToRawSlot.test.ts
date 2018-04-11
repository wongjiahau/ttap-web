import { expect } from "chai";
const isEqual = require("lodash.isequal");
const omit = require("lodash.omit");
import { RawSlot } from "../../model/rawSlot";
import TestManager, { FileName } from "../../tests/testManager";
import { ParseLargeHtmlToRawSlot } from "../parseLargeHtmlToRawSlot";
import { IRawSlot } from "./../../model/rawSlot";

import ParseHtmlToRawSlot from "../parseHtmlToRawSlot";
const fs = require("fs");
const path = require("path");

const tabletojson = require("tabletojson");

function tableToJson(table: HTMLTableElement, headers: string[]): object[] {
    const data = [];
    for (let i = 1; i < table.rows.length; i++) {
        const tableRow = table.rows[i];
        const rowData = {};
        for (let j = 0; j < tableRow.cells.length; j++) {
            rowData[headers[j]] = tableRow.cells[j].innerHTML;
        }
        data.push(rowData);
    }
    return data;
}

describe("ParseHtmlToRawSlot", () => {
    it("case 1", (done) => {
        const html = new TestManager().GetDataFrom(FileName.all_fes_slots);
        const rawSlots = ParseLargeHtmlToRawSlot(html);
        expect(rawSlots[0]).to.deep.eq({
            Uid:         0,
            SubjectCode: "MPU32033",
            SubjectName: "ENGLISH FOR PROFESSIONALS",
            Number:      "1",
            Type:        "L",
            Group:       "1",
            ClassSize:   "40",
            Day:         "Mon",
            TimePeriod:  "01:00 PM - 02:00 PM",
            CreditHour:  "1.0",
            WeekNumber:  "1-14",
            Room:        "KB316",
            Remark:      ""
        });
        done();
        // fs.readFile("../ttap-sample-data/Archive/fes-2018-05-slots.html", (err, data) => {
            // const htmlDoc = new DOMParser().parseFromString(data, "text/html");
            // const table = htmlDoc.getElementsByTagName("table")[10];
            // const headers = "Number,Type,Group,ClassSize,Day,Time,CreditHour,WeekNumber,Room,LECTURER,REG.,AVAIL,RESERVE,Remark".split(",");
            // const rawSlots = ParseHtmlToRawSlot(table.innerHTML);
            // const json = tableToJson(table, headers);
            // for (let i = 0; i < 10; i++) {
            //     console.log(json[i]["Number"]);
            //     console.log(Object.keys(json[i]).length);
            // }
            // const result : IRawSlot[] = json.map((x, index) => ({
            //     Uid: index,
            //     SubjectCode: string;
            //     SubjectName: string;
            //     Number: string; // Slot number, which is not necessarily unique for every slot
            //     Type: string;
            //     Group: string;
            //     ClassSize ? : string;
            //     Day: string;
            //     TimePeriod: string;
            //     CreditHour ? : string;
            //     WeekNumber: string;
            //     Room: string;
            //     Remark ? : string;
            // }));
            // const tablesAsJson = tabletojson.convert(`<html><body>${tableHTML}</body></html>`);
            // console.log(tablesAsJson);
        //     done();
        // });
        // console.log(tablesAsJson[2].slice(10));
        // const result = ParseLargeHtmlToRawSlot(input);
        // expect(result).to.have.lengthOf(1499);
    });

});
