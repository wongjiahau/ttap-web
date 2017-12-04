import {
    expect
} from "chai";
import {
    CodeOf,
    GetTestSubjects1
} from "../../tests/testDataGenerator";
import {
    Subject
} from "../subject";

describe("Subject", () => {
    describe("constructor", () => {
        it("should set static property subjectCodeAndName", () => {
            const aSubject = new Subject("Spongebob", "MPU3113", []);
            expect(Subject.GetSubjectNameOf("MPU3113")).to.eq("Spongebob");
        });
    });

    describe("GetSubjectNameOf", () => {
        it("should return the subject name of the related subject code", () => {
            const subjects = GetTestSubjects1();
            const result = Subject.GetSubjectNameOf(CodeOf.BKA);
            expect(result).to.eq("Bahasa Kebangsaan A");
        });

        it("should return Beautified subject name", () => {
            const aSubject = new Subject("lowercase subject name", "123", []);
            const result = Subject.GetSubjectNameOf("123");
            expect(result).to.eq("Lowercase Subject Name");
        });
    });
});
