import {
    expect
} from "chai";
import { ParseRawSlotToSubject } from "../../parser/parseRawSlotToSubject";
import { HENG_2017_APR } from "../../tests/testData/heng_2017_apr";
import { CodeOf, IndexOf } from "../../tests/testData/heng_2017_sept";
import {
    GetTestSubjects1, MockRawSlotStore,
} from "../../tests/testDataGenerator";
import {
    RawSlot
} from "../rawSlot";
import {
    DiffReport,
    GenerateSubjectSchema,
    GetDiff,
    SubjectSchema
} from "../subjectSchema";

describe("SubjectSchema", () => {

    describe("constructor", () => {
        it("should set every bool property to false", () => {
            const x = new SubjectSchema();
            expect(x.GotLecture).to.eq(false);
            expect(x.GotTutorial).to.eq(false);
            expect(x.GotLecture).to.eq(false);
        });

        it("should set SubjectCode property based on the last parameter", () => {
            const x = new SubjectSchema(true, true, true, "MPU3113");
            expect(x.SubjectCode).to.eq("MPU3113");
        });
    });

    describe("IsEqual", () => {
        it("should return true if all properties are equal (1)", () => {
            const x = new SubjectSchema(true, true, true);
            const y = new SubjectSchema(true, true, true);
            expect(x.IsEqual(y)).to.eq(true);
        });

        it("should return true if all properties are equal (2)", () => {
            const x = new SubjectSchema(false, false, false);
            const y = new SubjectSchema(false, false, false);
            expect(x.IsEqual(y)).to.eq(true);
        });

        it("should return false if SubjectCode is not equal", () => {
            const x = new SubjectSchema(true, true, true, "hello");
            const y = new SubjectSchema(true, true, true, "bye");
            expect(x.IsEqual(y)).to.eq(false);
        });

        it("should return false if GotLecture is not equal", () => {
            const x = new SubjectSchema(true, true, true);
            const y = new SubjectSchema(false, true, true);
            expect(x.IsEqual(y)).to.eq(false);
        });

        it("should return false if GotTutorial is not equal", () => {
            const x = new SubjectSchema(true, true, true);
            const y = new SubjectSchema(true, false, true);
            expect(x.IsEqual(y)).to.eq(false);
        });

        it("should return false if GotPractical is not equal", () => {
            const x = new SubjectSchema(true, true, true);
            const y = new SubjectSchema(true, true, false);
            expect(x.IsEqual(y)).to.eq(false);
        });

    });

});

describe("GenerateSubjectSchema", () => {
    it("should throw error if some slots are from different subjects", () => {
        const subjects = GetTestSubjects1();
        const acp = subjects[IndexOf.ACP];
        const he = subjects[IndexOf.HE];
        expect(() => {
            GenerateSubjectSchema(MockRawSlotStore.GetBunch(acp.SlotUids.concat(he.SlotUids)));
        }).to.throw();
    });

    it("case 1", () => {
        const subjects = GetTestSubjects1();
        const acp = subjects[IndexOf.ACP];
        const result = GenerateSubjectSchema(MockRawSlotStore.GetBunch(acp.SlotUids));
        expect(result.GotLecture).to.eq(true);
        expect(result.GotTutorial).to.eq(false);
        expect(result.GotPractical).to.eq(false);
        expect(result.SubjectCode).to.eq(CodeOf.ACP);
    });

    it("case 2", () => {
        const subjects = GetTestSubjects1();
        const beam = subjects[IndexOf.BEAM];
        const result = GenerateSubjectSchema(MockRawSlotStore.GetBunch(beam.SlotUids));
        expect(result.GotLecture).to.eq(true);
        expect(result.GotTutorial).to.eq(true);
        expect(result.GotPractical).to.eq(false);
        expect(result.SubjectCode).to.eq(CodeOf.BEAM);
    });

    it("case 3", () => {
        const rawSlots = HENG_2017_APR();
        const subjects = ParseRawSlotToSubject(rawSlots);
        const concreteTechnology = subjects[7]; // 7 is Index of Concrete Technology
        const result = GenerateSubjectSchema((concreteTechnology.SlotUids.map((uid) => rawSlots.filter((s) => s.Uid === uid)[0])));
        expect(result.GotLecture).to.eq(true);
        expect(result.GotTutorial).to.eq(true);
        expect(result.GotPractical).to.eq(true);
        expect(result.SubjectCode).to.eq("UEMX4393");
    });
});

describe("GetDiff", () => {
    it("should return empty array if schema X and schema Y are equal", () => {
        const x = new SubjectSchema(true, true, true);
        const y = new SubjectSchema(true, true, true);
        expect(x.IsEqual(y)).to.eq(true);
        expect(GetDiff(x, y)).to.deep.eq([]);
    });

    it("should return error messages if schema X and schema Y are not equal (1)", () => {
        const x = new SubjectSchema(true, true, true, "MPU3113");
        const y = new SubjectSchema(false, true, true);
        expect(x.IsEqual(y)).to.eq(false);
        expect(GetDiff(x, y)).to.deep.eq([new DiffReport("MPU3113", "L")]);
    });

    it("should return error messages if schema X and schema Y are not equal (2)", () => {
        const x = new SubjectSchema(true, true, true, "MPU3113");
        const y = new SubjectSchema(false, false, true);
        expect(x.IsEqual(y)).to.eq(false);
        expect(GetDiff(x, y)).to.deep.eq([
            new DiffReport("MPU3113", "L"),
            new DiffReport("MPU3113", "T"),
        ]);
    });
});
