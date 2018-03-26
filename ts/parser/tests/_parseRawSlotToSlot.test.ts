import {
    expect
} from "chai";
import { IRawSlot } from "../../model/rawSlot";
import TestManager, { FileName } from "../../tests/testManager";
import ParseHtmlToRawSlot from "../parseHtmlToRawSlot";
import {
    GetTestRawSlot1
} from "./../../tests/testDataGenerator";
import {
    IsParsable, IsReasonable, ParseRawSlotToSlot
} from "./../parseRawSlotToSlot";

describe("parseRawSlotToSlot", () => {
    it("case 1", () => {
        expect(() => {
            ParseRawSlotToSlot(GetTestRawSlot1());
        }).to.not.throw();
    });

    it("case 2", () => {
        const input = new TestManager().GetDataFrom(FileName.heng_2017_nov);
        expect(() => {
            const result = ParseRawSlotToSlot(ParseHtmlToRawSlot(input));
        }).to.not.throw();
    });

    it("case 3", () => {
        const input = new TestManager().GetDataFrom(FileName.keli_2017_sept);
        expect(() => {
            const result = ParseRawSlotToSlot(ParseHtmlToRawSlot(input));
        }).to.not.throw();
    });

});

describe("IsParsable", () => {
    it("case 1", () => {
        const rawSlot : IRawSlot =  {
            Uid: 43,
            SubjectCode: "No record found!!!",
            SubjectName: "ENGINEER IN SOCIETY",
            Number: "No record found!!!",
            Type: undefined,
            Group: undefined,
            Day: undefined,
            TimePeriod: undefined,
            WeekNumber: undefined,
            Room: undefined
        };
        expect(IsParsable(rawSlot)).to.eq(false);
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
        const rawSlot : IRawSlot =  {
            Uid: 43,
            SubjectCode: "No record found!!!",
            SubjectName: "Industrial Training",
            Number: "No record found!!!",
            Type: undefined,
            Group: undefined,
            Day: undefined,
            TimePeriod: undefined,
            WeekNumber: undefined,
            Room: undefined
        };
        expect(IsReasonable(rawSlot)).to.eq(false);
    });

});
