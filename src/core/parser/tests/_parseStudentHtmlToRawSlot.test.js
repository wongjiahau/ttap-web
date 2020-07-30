"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const isEqual = require("lodash.isequal");
const omit = require("lodash.omit");
const testManager_1 = require("../../tests/testManager");
const parseStudentHtmlToRawSlot_1 = require("../parseStudentHtmlToRawSlot");
describe("ParseHtmlToRawSlot", () => {
    it("case 1", () => {
        const input = new testManager_1.default().GetDataFrom(testManager_1.FileName.heng_2017_sept);
        const result = parseStudentHtmlToRawSlot_1.default(input);
        const expected = {
            Uid: 0,
            SubjectCode: "MPU3113",
            SubjectName: "HUBUNGAN ETNIK (FOR LOCAL STUDENTS)",
            Number: "1",
            Type: "L",
            Group: "1",
            ClassSize: "90",
            Day: "Mon",
            TimePeriod: "08:00 AM - 11:00 AM",
            CreditHour: "3.00",
            WeekNumber: "1-7",
            Room: "KB207",
            Remark: "",
        };
        chai_1.expect(isEqual(omit(result[0], ["Uid", "toString"]), omit(expected, ["Uid", "toString"]))).to.equal(true);
    });
});
//# sourceMappingURL=_parseStudentHtmlToRawSlot.test.js.map