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
            const week = [0, 1, 2];
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
            const week = [2, 7];
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
            const rawSlots = GetTestRawSlot1()[0];
            const semesterStartDate = new Date(2017, 10, 15);
            const result = CreateEvent(rawSlots, semesterStartDate);
            const expected = {
                summary: "Hubungan Etnik (for Local Students) (L-1)",
                location: "KB207",
                description: "Subject code : MPU3113, Week : 1-7",
                start: {
                    dateTime: "2017-11-22T08:00:00+08:00",
                    timeZone: "UTC+08:00"
                },
                end: {
                    dateTime: "2017-11-22T11:00:00+08:00",
                    timeZone: "UTC+08:00"
                },
                recurrence: ["RDATE;TZID=Asia/Kuala_Lumpur:20171129T080000,20171206T080000,20171213T080000,20171220T080000,20171227T080000,20180103T080000"]
            };
            expect(result).to.deep.equal(expected);
        });
    });
});
