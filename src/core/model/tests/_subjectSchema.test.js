"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const parseRawSlotToSubject_1 = require("../../parser/parseRawSlotToSubject");
const heng_2017_apr_1 = require("../../tests/testData/heng_2017_apr");
const heng_2017_sept_1 = require("../../tests/testData/heng_2017_sept");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const subjectSchema_1 = require("../subjectSchema");
describe("SubjectSchema", () => {
    describe("constructor", () => {
        it("should set every bool property to false", () => {
            const x = new subjectSchema_1.SubjectSchema();
            chai_1.expect(x.GotLecture).to.eq(false);
            chai_1.expect(x.GotTutorial).to.eq(false);
            chai_1.expect(x.GotLecture).to.eq(false);
        });
        it("should set SubjectCode property based on the last parameter", () => {
            const x = new subjectSchema_1.SubjectSchema(true, true, true, "MPU3113");
            chai_1.expect(x.SubjectCode).to.eq("MPU3113");
        });
    });
    describe("IsEqual", () => {
        it("should return true if all properties are equal (1)", () => {
            const x = new subjectSchema_1.SubjectSchema(true, true, true);
            const y = new subjectSchema_1.SubjectSchema(true, true, true);
            chai_1.expect(x.IsEqual(y)).to.eq(true);
        });
        it("should return true if all properties are equal (2)", () => {
            const x = new subjectSchema_1.SubjectSchema(false, false, false);
            const y = new subjectSchema_1.SubjectSchema(false, false, false);
            chai_1.expect(x.IsEqual(y)).to.eq(true);
        });
        it("should return false if SubjectCode is not equal", () => {
            const x = new subjectSchema_1.SubjectSchema(true, true, true, "hello");
            const y = new subjectSchema_1.SubjectSchema(true, true, true, "bye");
            chai_1.expect(x.IsEqual(y)).to.eq(false);
        });
        it("should return false if GotLecture is not equal", () => {
            const x = new subjectSchema_1.SubjectSchema(true, true, true);
            const y = new subjectSchema_1.SubjectSchema(false, true, true);
            chai_1.expect(x.IsEqual(y)).to.eq(false);
        });
        it("should return false if GotTutorial is not equal", () => {
            const x = new subjectSchema_1.SubjectSchema(true, true, true);
            const y = new subjectSchema_1.SubjectSchema(true, false, true);
            chai_1.expect(x.IsEqual(y)).to.eq(false);
        });
        it("should return false if GotPractical is not equal", () => {
            const x = new subjectSchema_1.SubjectSchema(true, true, true);
            const y = new subjectSchema_1.SubjectSchema(true, true, false);
            chai_1.expect(x.IsEqual(y)).to.eq(false);
        });
    });
});
describe("GenerateSubjectSchema", () => {
    it("should throw error if some slots are from different subjects", () => {
        const subjects = testDataGenerator_1.GetTestSubjects1();
        const acp = subjects[heng_2017_sept_1.IndexOf.ACP];
        const he = subjects[heng_2017_sept_1.IndexOf.HE];
        chai_1.expect(() => {
            subjectSchema_1.GenerateSubjectSchema(testDataGenerator_1.MockRawSlotStore.GetBunch(acp.SlotUids.concat(he.SlotUids)));
        }).to.throw();
    });
    it("case 1", () => {
        const subjects = testDataGenerator_1.GetTestSubjects1();
        const acp = subjects[heng_2017_sept_1.IndexOf.ACP];
        const result = subjectSchema_1.GenerateSubjectSchema(testDataGenerator_1.MockRawSlotStore.GetBunch(acp.SlotUids));
        chai_1.expect(result.GotLecture).to.eq(true);
        chai_1.expect(result.GotTutorial).to.eq(false);
        chai_1.expect(result.GotPractical).to.eq(false);
        chai_1.expect(result.SubjectCode).to.eq(heng_2017_sept_1.CodeOf.ACP);
    });
    it("case 2", () => {
        const subjects = testDataGenerator_1.GetTestSubjects1();
        const beam = subjects[heng_2017_sept_1.IndexOf.BEAM];
        const result = subjectSchema_1.GenerateSubjectSchema(testDataGenerator_1.MockRawSlotStore.GetBunch(beam.SlotUids));
        chai_1.expect(result.GotLecture).to.eq(true);
        chai_1.expect(result.GotTutorial).to.eq(true);
        chai_1.expect(result.GotPractical).to.eq(false);
        chai_1.expect(result.SubjectCode).to.eq(heng_2017_sept_1.CodeOf.BEAM);
    });
    it("case 3", () => {
        const rawSlots = heng_2017_apr_1.HENG_2017_APR();
        const subjects = parseRawSlotToSubject_1.ParseRawSlotToSubject(rawSlots);
        const concreteTechnology = subjects[7]; // 7 is Index of Concrete Technology
        const result = subjectSchema_1.GenerateSubjectSchema((concreteTechnology.SlotUids.map((uid) => rawSlots.filter((s) => s.Uid === uid)[0])));
        chai_1.expect(result.GotLecture).to.eq(true);
        chai_1.expect(result.GotTutorial).to.eq(true);
        chai_1.expect(result.GotPractical).to.eq(true);
        chai_1.expect(result.SubjectCode).to.eq("UEMX4393");
    });
});
describe("GetDiff", () => {
    it("should return empty array if schema X and schema Y are equal", () => {
        const x = new subjectSchema_1.SubjectSchema(true, true, true);
        const y = new subjectSchema_1.SubjectSchema(true, true, true);
        chai_1.expect(x.IsEqual(y)).to.eq(true);
        chai_1.expect(subjectSchema_1.GetDiff(x, y)).to.deep.eq([]);
    });
    it("should return error messages if schema X and schema Y are not equal (1)", () => {
        const x = new subjectSchema_1.SubjectSchema(true, true, true, "MPU3113");
        const y = new subjectSchema_1.SubjectSchema(false, true, true);
        chai_1.expect(x.IsEqual(y)).to.eq(false);
        chai_1.expect(subjectSchema_1.GetDiff(x, y)).to.deep.eq([new subjectSchema_1.DiffReport("MPU3113", "L")]);
    });
    it("should return error messages if schema X and schema Y are not equal (2)", () => {
        const x = new subjectSchema_1.SubjectSchema(true, true, true, "MPU3113");
        const y = new subjectSchema_1.SubjectSchema(false, false, true);
        chai_1.expect(x.IsEqual(y)).to.eq(false);
        chai_1.expect(subjectSchema_1.GetDiff(x, y)).to.deep.eq([
            new subjectSchema_1.DiffReport("MPU3113", "L"),
            new subjectSchema_1.DiffReport("MPU3113", "T"),
        ]);
    });
});
//# sourceMappingURL=_subjectSchema.test.js.map