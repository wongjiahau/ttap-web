"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const beautifySubjectName_1 = require("../util/beautifySubjectName");
class Subject {
    constructor(name, code, slotIds, slotNumbers) {
        this.Name = name;
        this.Code = code;
        this.SlotUids = slotIds;
        this.SlotNumbers = slotNumbers;
        this.IsSelected = false;
        this.IsVisible = true;
        this.ClashingCounterparts = [];
        this.ClashReport = null;
        Subject.subjectCodeAndName[code] = name;
    }
    static GetSubjectNameOf(subjectCode) {
        return beautifySubjectName_1.BeautifySubjectName(Subject.subjectCodeAndName[subjectCode]);
    }
}
Subject.subjectCodeAndName = {};
exports.Subject = Subject;
class ClashReport {
    constructor(type, targetName = null) {
        this.Type = type;
        this.TargetName = targetName;
    }
}
exports.ClashReport = ClashReport;
//# sourceMappingURL=subject.js.map