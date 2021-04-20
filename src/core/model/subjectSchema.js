"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SubjectSchema {
    constructor(gotLecture = false, gotTutorial = false, gotPractical = false, subjectCode = "") {
        this.GotLecture = gotLecture;
        this.GotTutorial = gotTutorial;
        this.GotPractical = gotPractical;
        this.SubjectCode = subjectCode;
    }
    IsEqual(other) {
        return this.SubjectCode === other.SubjectCode &&
            this.GotLecture === other.GotLecture &&
            this.GotTutorial === other.GotTutorial &&
            this.GotPractical === other.GotPractical;
    }
}
exports.SubjectSchema = SubjectSchema;
function GenerateSubjectSchema(slots) {
    const subjectCode = slots[0].SubjectCode;
    for (let i = 0; i < slots.length; i++) {
        if (slots[i].SubjectCode !== subjectCode) {
            throw new Error("Not all of the slots passed in are from the same subject.");
        }
    }
    const result = new SubjectSchema();
    result.SubjectCode = subjectCode;
    slots.forEach((s) => {
        switch (s.Type) {
            case "L":
                result.GotLecture = true;
                break;
            case "T":
                result.GotTutorial = true;
                break;
            case "P":
                result.GotPractical = true;
                break;
        }
    });
    return result;
}
exports.GenerateSubjectSchema = GenerateSubjectSchema;
class DiffReport {
    constructor(subjectCode, missingSlotType) {
        this.SubjectCode = subjectCode;
        this.MissingSlotType = missingSlotType;
    }
}
exports.DiffReport = DiffReport;
function GetDiff(x, y) {
    const result = [];
    if (x.IsEqual(y)) {
        return [];
    }
    if (x.GotLecture !== y.GotLecture) {
        result.push(new DiffReport(x.SubjectCode, "L"));
    }
    if (x.GotTutorial !== y.GotTutorial) {
        result.push(new DiffReport(x.SubjectCode, "T"));
    }
    if (x.GotPractical !== y.GotPractical) {
        result.push(new DiffReport(x.SubjectCode, "P"));
    }
    return result;
}
exports.GetDiff = GetDiff;
//# sourceMappingURL=subjectSchema.js.map