import {
    expect
} from "chai";
import {
    CodeOf,
    GetTestSubjects1,
    IndexOf
} from "../../tests/testDataGenerator";
import {
    GenerateSubjectSchema,
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

        it("shold not set SubjectCode property", () => {
            const x = new SubjectSchema();
            expect(x.SubjectCode).to.eq(undefined);
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
            const x = new SubjectSchema(true, true, true);
            const y = new SubjectSchema(true, true, true);
            x.SubjectCode = "hello";
            y.SubjectCode = "bye";
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
            GenerateSubjectSchema(acp.SlotIds.concat(he.SlotIds));
        }).to.throw();
    });

    it("case 1", () => {
        const subjects = GetTestSubjects1();
        const acp = subjects[IndexOf.ACP];
        const result = GenerateSubjectSchema(acp.SlotIds);
        expect(result.GotLecture).to.eq(true);
        expect(result.GotTutorial).to.eq(false);
        expect(result.GotPractical).to.eq(false);
        expect(result.SubjectCode).to.eq(CodeOf.ACP);
    });

    it("case 2", () => {
        const subjects = GetTestSubjects1();
        const beam = subjects[IndexOf.BEAM];
        const result = GenerateSubjectSchema(beam.SlotIds);
        expect(result.GotLecture).to.eq(true);
        expect(result.GotTutorial).to.eq(true);
        expect(result.GotPractical).to.eq(false);
        expect(result.SubjectCode).to.eq(CodeOf.BEAM);
    });

    it("case 3", () => {
        const subjects = GetTestSubjects1();
        const industrialTraning = subjects[IndexOf.IT];
        const result = GenerateSubjectSchema(industrialTraning.SlotIds);
        expect(result.GotLecture).to.eq(false);
        expect(result.GotTutorial).to.eq(false);
        expect(result.GotPractical).to.eq(true);
        expect(result.SubjectCode).to.eq(CodeOf.IT);
    });
});
