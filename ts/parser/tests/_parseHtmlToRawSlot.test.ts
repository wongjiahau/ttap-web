import {
    expect
} from "chai";
const isEqual = require("lodash.isequal");
const omit = require("lodash.omit");
import {
    RawSlot
} from "../../model/rawSlot";
import {
    heng_2017_sept
} from "../../tests/testData/heng_2017_sept";
import ParseHtmlToRawSlot from "../parseHtmlToRawSlot";
import {
    IRawSlot
} from "./../../model/rawSlot";

describe("ParseHtmlToRawSlot", () => {
    it("case 1", () => {
        const input = heng_2017_sept();
        const result = ParseHtmlToRawSlot(input);
        const expected: IRawSlot = {
            HashId: 0,
            SubjectCode: "MPU3113",
            SubjectName: "HUBUNGAN ETNIK (FOR LOCAL STUDENTS)",
            Number: "1",
            Type: "L",
            Group: "1",
            ClassSize: "90",
            Day: "Mon",
            TimePeriod: "08:00 AM - 11:00 AM",
            CreditHour: "3.0",
            WeekNumber: "1-7",
            Room: "KB207",
            Remark: "",
        };
        expect(
            isEqual(
                omit(result[0], ["HashId", "toString"]),
                omit(expected, ["HashId", "toString"])
            )).to.equal(true);
    });

});
