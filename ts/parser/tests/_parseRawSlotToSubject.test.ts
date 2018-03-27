import { expect } from "chai";
import { IRawSlot } from "../../model/rawSlot";
import { IndexOf } from "../../tests/testData/heng_2017_sept";
import { GetTestRawSlot1, } from "../../tests/testDataGenerator";
import { ParseRawSlotToSubject } from "../parseRawSlotToSubject";

describe("parseRawSlotToSubject", () => {
    it("should set the SlotNumber property of each subject without duplication", () => {
        const subjects = ParseRawSlotToSubject(GetTestRawSlot1());
        expect(subjects[IndexOf.ACP].SlotNumbers).to.not.deep.eq(["10", "10", "11", "11"]);
        expect(subjects[IndexOf.ACP].SlotNumbers).to.deep.eq(["10", "11"]);
    });

    it("should exclude slots that are not reasonable", () => {
        const rawSlots = GetTestRawSlot1();
        const NAME_OF_UNREASONABLE_SUBJECT = "industrial training";
        const subjects = ParseRawSlotToSubject(GetTestRawSlot1());
        expect(subjects.map((x) => x.Name.toLowerCase())).to.not.contain(NAME_OF_UNREASONABLE_SUBJECT);
    });

    it("should exclude slots that are not parsable", () => {
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
        const subjects = ParseRawSlotToSubject([rawSlot]);
        expect(subjects).to.have.lengthOf(0);
    });
});
