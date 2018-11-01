import { expect } from "chai";
//@ts-ignore
import uniq = require("lodash.uniq");
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
        const namesOfAllSubjects = uniq(rawSlots.map((x) => x.SubjectName.toLowerCase()));
        expect(namesOfAllSubjects).to.have.lengthOf(18);
        const NAME_OF_UNREASONABLE_SUBJECT = "industrial training";
        expect(namesOfAllSubjects).to.contain(NAME_OF_UNREASONABLE_SUBJECT);
        const subjects = ParseRawSlotToSubject(GetTestRawSlot1());
        const nameOfFilteredSubjects = uniq(subjects.map((x) => x.Name.toLowerCase()));
        expect(nameOfFilteredSubjects).to.not.contain(NAME_OF_UNREASONABLE_SUBJECT);
        expect(nameOfFilteredSubjects).to.have.lengthOf(17);
    });

    it("should exclude slots that are not parsable", () => {
        const rawSlot : IRawSlot =  {
            Uid: 43,
            SubjectCode: "No record found!!!",
            SubjectName: "ENGINEER IN SOCIETY",
            Number: "No record found!!!",
            Type:       "",
            Group:      "",
            Day:        "",
            TimePeriod: "",
            WeekNumber: "",
            Room:       ""
        };
        const subjects = ParseRawSlotToSubject([rawSlot]);
        expect(subjects).to.have.lengthOf(0);
    });
});
