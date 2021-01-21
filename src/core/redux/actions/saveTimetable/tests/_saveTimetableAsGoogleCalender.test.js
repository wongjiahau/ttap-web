"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const saveTimetableAsGoogleCalendar_1 = require("../saveTimetableAsGoogleCalendar");
const rawSlot_1 = require("./../../../../model/rawSlot");
const testDataGenerator_1 = require("./../../../../tests/testDataGenerator");
const parse = require("date-fns/parse");
describe("SaveTimetableAsGoogleCalendar", () => {
    describe("AddByWeek", () => {
        it("case 1", () => {
            const input = new Date(2017, 10, 15);
            const numberOfWeekToBeAdded = 2;
            const result = saveTimetableAsGoogleCalendar_1.AddByWeek(input, numberOfWeekToBeAdded);
            chai_1.expect(result.getTime()).to.eq(new Date(2017, 10, 29).getTime());
        });
        it("case 2", () => {
            const input = new Date(2017, 10, 15);
            const numberOfWeekToBeAdded = 0;
            const result = saveTimetableAsGoogleCalendar_1.AddByWeek(input, numberOfWeekToBeAdded);
            chai_1.expect(result.getTime()).to.eq(new Date(2017, 10, 15).getTime());
        });
    });
    describe("ToPureIsoString", () => {
        it("case 1", () => {
            const input = new Date(2017, 10, 15, 3, 30);
            const result = saveTimetableAsGoogleCalendar_1.ToPureIsoString(input);
            chai_1.expect(result).to.eq("20171115T033000");
        });
        it("case 2", () => {
            const input = new Date(2017, 11, 31, 13, 30);
            const result = saveTimetableAsGoogleCalendar_1.ToPureIsoString(input);
            chai_1.expect(result).to.eq("20171231T133000");
        });
    });
    describe("GetListOfDate", () => {
        it("case 1", () => {
            const startDate = new Date(2017, 10, 15, 3, 30);
            const week = [1, 2, 3];
            const expected = [
                new Date(2017, 10, 15, 3, 30),
                new Date(2017, 10, 22, 3, 30),
                new Date(2017, 10, 29, 3, 30),
            ];
            const actual = saveTimetableAsGoogleCalendar_1.GetListOfDates(startDate, week);
            for (let i = 0; i < week.length; i++) {
                chai_1.expect(actual[i].getTime()).to.eq(expected[i].getTime());
            }
        });
        it("case 2", () => {
            const startDate = new Date(2017, 10, 15, 3, 30);
            const week = [3, 8];
            const expected = [
                new Date(2017, 10, 29, 3, 30),
                new Date(2018, 0, 3, 3, 30),
            ];
            const actual = saveTimetableAsGoogleCalendar_1.GetListOfDates(startDate, week);
            for (let i = 0; i < week.length; i++) {
                chai_1.expect(actual[i].getTime()).to.eq(expected[i].getTime());
            }
        });
    });
    describe("GetRecurrence", () => {
        it("case 1", () => {
            const input = [
                new Date(2017, 10, 15, 3, 30),
            ];
            const result = saveTimetableAsGoogleCalendar_1.GetRecurrence(input);
            chai_1.expect(result).to.eq("RDATE;TZID=Asia/Kuala_Lumpur:20171115T033000");
        });
        it("case 2", () => {
            const input = [
                new Date(2017, 10, 15, 3, 30),
                new Date(2017, 10, 22, 3, 30)
            ];
            const result = saveTimetableAsGoogleCalendar_1.GetRecurrence(input);
            chai_1.expect(result).to.eq("RDATE;TZID=Asia/Kuala_Lumpur:20171115T033000,20171122T033000");
        });
    });
    describe("CreateEvent", () => {
        it("should not mutate semStartDate", () => {
            const testSlot = testDataGenerator_1.GetTestRawSlot1()[1];
            const semesterStartDate = new Date(2017, 10, 13);
            const result = saveTimetableAsGoogleCalendar_1.CreateEvent(testSlot, semesterStartDate);
            chai_1.expect(semesterStartDate.getTime()).to.eq(new Date(2017, 10, 13).getTime());
        });
        it("case 1", () => {
            const testSlot = testDataGenerator_1.GetTestRawSlot1()[0];
            const semesterStartDate = new Date(2017, 10, 13);
            const result = saveTimetableAsGoogleCalendar_1.CreateEvent(testSlot, semesterStartDate);
            const expected = {
                summary: "Hubungan Etnik (for Local Students) (L-1)",
                location: "KB207",
                description: "Subject code : MPU3113, Week : 1-7",
                start: {
                    dateTime: "2017-11-13T08:00:00+08:00",
                    timeZone: "UTC+08:00"
                },
                end: {
                    dateTime: "2017-11-13T11:00:00+08:00",
                    timeZone: "UTC+08:00"
                },
                recurrence: ["RDATE;TZID=Asia/Kuala_Lumpur:20171120T080000,20171127T080000,20171204T080000,20171211T080000,20171218T080000,20171225T080000"]
            };
            chai_1.expect(result).to.deep.equal(expected);
        });
        it("case 2", () => {
            const testSlot = testDataGenerator_1.GetTestRawSlot1()[1];
            const semesterStartDate = new Date(2017, 10, 13);
            const result = saveTimetableAsGoogleCalendar_1.CreateEvent(testSlot, semesterStartDate);
            const expected = {
                summary: "Hubungan Etnik (for Local Students) (L-1)",
                location: "KB207",
                description: "Subject code : MPU3113, Week : 1-7",
                start: {
                    dateTime: "2017-11-16T14:00:00+08:00",
                    timeZone: "UTC+08:00"
                },
                end: {
                    dateTime: "2017-11-16T17:00:00+08:00",
                    timeZone: "UTC+08:00"
                },
                recurrence: ["RDATE;TZID=Asia/Kuala_Lumpur:20171123T140000,20171130T140000,20171207T140000,20171214T140000,20171221T140000,20171228T140000"]
            };
            chai_1.expect(result).to.deep.equal(expected);
        });
    });
    describe("GetMaxWeek", () => {
        it("case 1", () => {
            const input = [0, 0, 0].map((x) => new rawSlot_1.RawSlot());
            input[0].WeekNumber = "1-3";
            input[1].WeekNumber = "2,4";
            input[2].WeekNumber = "3-5";
            chai_1.expect(saveTimetableAsGoogleCalendar_1.GetMaxWeek(input)).to.eq(5);
        });
        it("case 2", () => {
            const input = [0, 0, 0].map((x) => new rawSlot_1.RawSlot());
            input[0].WeekNumber = "3-5";
            input[1].WeekNumber = "2,14";
            input[2].WeekNumber = "1-3";
            chai_1.expect(saveTimetableAsGoogleCalendar_1.GetMaxWeek(input)).to.eq(14);
        });
    });
    describe("GetWeekNumberHeaders", () => {
        it("should throw error if the passed in date is not a Monday", () => {
            const semStartDate = parse("2017-11-14");
            chai_1.expect(() => {
                saveTimetableAsGoogleCalendar_1.GetWeekNumberHeaders(semStartDate, 0);
            }).to.throw();
        });
        it("case 1", () => {
            const semStartDate = parse("2017-11-13");
            const maxWeek = 2;
            const weekNumberHeaders = saveTimetableAsGoogleCalendar_1.GetWeekNumberHeaders(semStartDate, maxWeek);
            chai_1.expect(weekNumberHeaders).to.deep.eq([{
                    summary: "Week 1",
                    start: {
                        date: "2017-11-13",
                        timeZone: "UTC+08:00"
                    },
                    end: {
                        date: "2017-11-18",
                        timeZone: "UTC+08:00"
                    }
                }, {
                    summary: "Week 2",
                    start: {
                        date: "2017-11-20",
                        timeZone: "UTC+08:00"
                    },
                    end: {
                        date: "2017-11-25",
                        timeZone: "UTC+08:00"
                    }
                }]);
        });
    });
});
//# sourceMappingURL=_saveTimetableAsGoogleCalender.test.js.map