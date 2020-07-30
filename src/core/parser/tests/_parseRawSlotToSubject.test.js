"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
//@ts-ignore
const uniq = require("lodash.uniq");
const heng_2017_sept_1 = require("../../tests/testData/heng_2017_sept");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const parseRawSlotToSubject_1 = require("../parseRawSlotToSubject");
describe("parseRawSlotToSubject", () => {
    it("should set the SlotNumber property of each subject without duplication", () => {
        const subjects = parseRawSlotToSubject_1.ParseRawSlotToSubject(testDataGenerator_1.GetTestRawSlot1());
        chai_1.expect(subjects[heng_2017_sept_1.IndexOf.ACP].SlotNumbers).to.not.deep.eq(["10", "10", "11", "11"]);
        chai_1.expect(subjects[heng_2017_sept_1.IndexOf.ACP].SlotNumbers).to.deep.eq(["10", "11"]);
    });
    it("should exclude slots that are not reasonable", () => {
        const rawSlots = testDataGenerator_1.GetTestRawSlot1();
        const namesOfAllSubjects = uniq(rawSlots.map((x) => x.SubjectName.toLowerCase()));
        chai_1.expect(namesOfAllSubjects).to.have.lengthOf(18);
        const NAME_OF_UNREASONABLE_SUBJECT = "industrial training";
        chai_1.expect(namesOfAllSubjects).to.contain(NAME_OF_UNREASONABLE_SUBJECT);
        const subjects = parseRawSlotToSubject_1.ParseRawSlotToSubject(testDataGenerator_1.GetTestRawSlot1());
        const nameOfFilteredSubjects = uniq(subjects.map((x) => x.Name.toLowerCase()));
        chai_1.expect(nameOfFilteredSubjects).to.not.contain(NAME_OF_UNREASONABLE_SUBJECT);
        chai_1.expect(nameOfFilteredSubjects).to.have.lengthOf(17);
    });
    it("should exclude slots that are not parsable", () => {
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
        const subjects = parseRawSlotToSubject_1.ParseRawSlotToSubject([rawSlot]);
        chai_1.expect(subjects).to.have.lengthOf(0);
    });
});
//# sourceMappingURL=_parseRawSlotToSubject.test.js.map