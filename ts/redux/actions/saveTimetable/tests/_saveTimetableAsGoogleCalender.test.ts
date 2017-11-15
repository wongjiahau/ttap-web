import {
    expect
} from "chai";
import {
    AddByWeek,
    CreateEvent,
    GetListOfDates,
    GetRecurrence,
    ToPureIsoString
} from "../saveTimetableAsGoogleCalendar";
import {
    GetTestRawSlot1
} from "./../../../../tests/testDataGenerator";

describe("SaveTimetableAsGoogleCalendar", () => {
    describe("AddByWeek", () => {
        it("case 1", () => {
            const input = new Date(2017, 10, 15);
            const numberOfWeekToBeAdded = 2;
            const result = AddByWeek(input, numberOfWeekToBeAdded);
            expect(result.getTime()).to.eq(new Date(2017, 10, 29).getTime());
        });

        it("case 2", () => {
            const input = new Date(2017, 10, 15);
            const numberOfWeekToBeAdded = 0;
            const result = AddByWeek(input, numberOfWeekToBeAdded);
            expect(result.getTime()).to.eq(new Date(2017, 10, 15).getTime());
        });

    });

    describe("ToPureIsoString", () => {
        it("case 1", () => {
            const input = new Date(2017, 10, 15, 3, 30);
            const result = ToPureIsoString(input);
            expect(result).to.eq("20171115T033000");
        });

        it("case 2", () => {
            const input = new Date(2017, 11, 31, 13, 30);
            const result = ToPureIsoString(input);
            expect(result).to.eq("20171231T133000");
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
            const actual = GetListOfDates(startDate, week);
            for (let i = 0; i < week.length; i++) {
                expect(actual[i].getTime()).to.eq(expected[i].getTime());
            }
        });

        it("case 2", () => {
            const startDate = new Date(2017, 10, 15, 3, 30);
            const week = [3, 8];
            const expected = [
                new Date(2017, 10, 29, 3, 30),
                new Date(2018, 0, 3, 3, 30),
            ];
            const actual = GetListOfDates(startDate, week);
            for (let i = 0; i < week.length; i++) {
                expect(actual[i].getTime()).to.eq(expected[i].getTime());
            }
        });
    });

    describe("GetRecurrence", () => {
        it("case 1", () => {
            const input = [
                new Date(2017, 10, 15, 3, 30),
            ];
            const result = GetRecurrence(input);
            expect(result).to.eq("RDATE;TZID=Asia/Kuala_Lumpur:20171115T033000");
        });

        it("case 2", () => {
            const input = [
                new Date(2017, 10, 15, 3, 30),
                new Date(2017, 10, 22, 3, 30)
            ];
            const result = GetRecurrence(input);
            expect(result).to.eq("RDATE;TZID=Asia/Kuala_Lumpur:20171115T033000,20171122T033000");
        });

    });

    describe("CreateEvent", () => {
        it("case 1", () => {
            const testSlot = GetTestRawSlot1()[0];
            const semesterStartDate = new Date(2017, 10, 13);
            const result = CreateEvent(testSlot, semesterStartDate);
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
            expect(result).to.deep.equal(expected);
        });

        it("case 2", () => {
            const testSlot = GetTestRawSlot1()[1];
            const semesterStartDate = new Date(2017, 10, 13);
            const result = CreateEvent(testSlot, semesterStartDate);
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
            expect(result).to.deep.equal(expected);
        });
    });
});
