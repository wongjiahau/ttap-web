"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const heng_2017_sept_1 = require("../../tests/testData/heng_2017_sept");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const subject_1 = require("../subject");
describe("Subject", () => {
    describe("constructor", () => {
        it("should set static property subjectCodeAndName", () => {
            const aSubject = new subject_1.Subject("Spongebob", "MPU3113", [], []);
            chai_1.expect(subject_1.Subject.GetSubjectNameOf("MPU3113")).to.eq("Spongebob");
        });
    });
    describe("GetSubjectNameOf", () => {
        it("should return the subject name of the related subject code", () => {
            const subjects = testDataGenerator_1.GetTestSubjects1();
            const result = subject_1.Subject.GetSubjectNameOf(heng_2017_sept_1.CodeOf.BKA);
            chai_1.expect(result).to.eq("Bahasa Kebangsaan A");
        });
        it("should return Beautified subject name", () => {
            const aSubject = new subject_1.Subject("lowercase subject name", "123", [], []);
            const result = subject_1.Subject.GetSubjectNameOf("123");
            chai_1.expect(result).to.eq("Lowercase Subject Name");
        });
    });
});
//# sourceMappingURL=_subject.test.js.map