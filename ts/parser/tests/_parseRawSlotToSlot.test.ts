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
    IsParsable, ParseRawSlotToSlot
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
