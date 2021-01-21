"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const time_1 = require("../../att/time");
const timePeriod_1 = require("../../att/timePeriod");
const testManager_1 = require("../../tests/testManager");
const parseStudentHtmlToRawSlot_1 = require("../parseStudentHtmlToRawSlot");
const testDataGenerator_1 = require("./../../tests/testDataGenerator");
const parseRawSlotToSlot_1 = require("./../parseRawSlotToSlot");
describe("parseRawSlotToSlot", () => {
    it("will manipulate TimePeriod.Min and TimePeriod.Max", () => {
        chai_1.expect(timePeriod_1.TimePeriod.Min.Equal(time_1.Time.CreateTime12Hour(11, 0, true))).to.eq(true);
        chai_1.expect(timePeriod_1.TimePeriod.Max.Equal(time_1.Time.CreateTime12Hour(1, 0, true))).to.eq(true);
        parseRawSlotToSlot_1.ParseRawSlotToSlot(testDataGenerator_1.GetTestRawSlot1());
        chai_1.expect(timePeriod_1.TimePeriod.Min.Equal(time_1.Time.CreateTime12Hour(8, 0, false))).to.eq(true);
        chai_1.expect(timePeriod_1.TimePeriod.Max.Equal(time_1.Time.CreateTime12Hour(6, 0, true))).to.eq(true);
    });
    it("case 1", () => {
        chai_1.expect(() => {
            parseRawSlotToSlot_1.ParseRawSlotToSlot(testDataGenerator_1.GetTestRawSlot1());
        }).to.not.throw();
    });
    it("case 2", () => {
        const input = new testManager_1.default().GetDataFrom(testManager_1.FileName.heng_2017_nov);
        chai_1.expect(() => {
            const result = parseRawSlotToSlot_1.ParseRawSlotToSlot(parseStudentHtmlToRawSlot_1.default(input));
        }).to.not.throw();
    });
    it("case 3", () => {
        const input = new testManager_1.default().GetDataFrom(testManager_1.FileName.keli_2017_sept);
        chai_1.expect(() => {
            const result = parseRawSlotToSlot_1.ParseRawSlotToSlot(parseStudentHtmlToRawSlot_1.default(input));
        }).to.not.throw();
    });
});
describe("IsParsable", () => {
    it("case 1", () => {
        const rawSlot = {
            Uid: 43,
            SubjectCode: "No record found!!!",
            SubjectName: "ENGINEER IN SOCIETY",
            Number: "No record found!!!",
            Type: "",
            Group: "",
            Day: "",
            TimePeriod: "",
            WeekNumber: "",
            Room: ""
        };
        chai_1.expect(parseRawSlotToSlot_1.IsParsable(rawSlot)).to.eq(false);
    });
});
describe("IsReasonable", () => {
    it("should think that Industrial Training(IT) is not reasonable", () => {
        /** This is because those who are taking IT will not need to use this app
         * Why we need to filter out IT slot?
         * This is because it will make the Min time to be at 7 a.m.
         * We want the Min time to be as large as possible, so that
         * the find timetable algorithm can work faster
         */
        const rawSlot = {
            Uid: 43,
            SubjectCode: "No record found!!!",
            SubjectName: "Industrial Training",
            Number: "No record found!!!",
            Type: "",
            Group: "",
            Day: "",
            TimePeriod: "",
            WeekNumber: "",
            Room: ""
        };
        chai_1.expect(parseRawSlotToSlot_1.IsReasonable(rawSlot)).to.eq(false);
    });
});
//# sourceMappingURL=_parseRawSlotToSlot.test.js.map