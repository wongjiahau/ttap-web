import {
    expect
} from "chai";
import {
    CodeOf,
    GetTestSubjects1,
    IndexOf
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
            GenerateSubjectSchema(RawSlot.GetBunch(acp.SlotIds.concat(he.SlotIds)));
        }).to.throw();
    });

    it("case 1", () => {
        const subjects = GetTestSubjects1();
        const acp = subjects[IndexOf.ACP];
        const result = GenerateSubjectSchema(RawSlot.GetBunch(acp.SlotIds));
        expect(result.GotLecture).to.eq(true);
        expect(result.GotTutorial).to.eq(false);
        expect(result.GotPractical).to.eq(false);
        expect(result.SubjectCode).to.eq(CodeOf.ACP);
    });

    it("case 2", () => {
        const subjects = GetTestSubjects1();
        const beam = subjects[IndexOf.BEAM];
        const result = GenerateSubjectSchema(RawSlot.GetBunch(beam.SlotIds));
        expect(result.GotLecture).to.eq(true);
        expect(result.GotTutorial).to.eq(true);
        expect(result.GotPractical).to.eq(false);
        expect(result.SubjectCode).to.eq(CodeOf.BEAM);
    });

    it("case 3", () => {
        const subjects = GetTestSubjects1();
        const industrialTraning = subjects[IndexOf.IT];
        const result = GenerateSubjectSchema(RawSlot.GetBunch(industrialTraning.SlotIds));
        expect(result.GotLecture).to.eq(false);
        expect(result.GotTutorial).to.eq(false);
        expect(result.GotPractical).to.eq(true);
        expect(result.SubjectCode).to.eq(CodeOf.IT);
    });
});

describe("GetDiff", () => {
    it("should return null if schema X and schema Y are equal", () => {
        const x = new SubjectSchema(true, true, true);
        const y = new SubjectSchema(true, true, true);
        expect(x.IsEqual(y)).to.eq(true);
        expect(GetDiff(x, y)).to.eq(null);
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
