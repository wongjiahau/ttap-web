import { expect } from "chai";
const isEqual = require("lodash.isequal");
const omit = require("lodash.omit");
import { RawSlot } from "../../model/rawSlot";
import { IRawSlot } from "../../model/rawSlot";
import TestManager, { FileName } from "../../tests/testManager";
import ParseStudentHtmlToRawSlot from "../parseStudentHtmlToRawSlot";

describe("ParseHtmlToRawSlot", () => {
  it("case 1", () => {
    const input = new TestManager().GetDataFrom(FileName.heng_2017_sept);
    const result = ParseStudentHtmlToRawSlot(input);
    const expected: IRawSlot = {
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
    expect(
      isEqual(
        omit(result[0], ["Uid", "toString"]),
        omit(expected, ["Uid", "toString"])
      )
    ).to.equal(true);
  });
});
