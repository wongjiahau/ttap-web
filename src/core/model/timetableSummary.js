"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const partitionize_1 = require("../permutator/partitionize");
const beautifySubjectName_1 = require("../util/beautifySubjectName");
class SubjectSummary {
    constructor(slots) {
        this.SubjectCode = slots[0].SubjectCode;
        this.SubjectName = beautifySubjectName_1.BeautifySubjectName(slots[0].SubjectName);
        const extract = (type) => {
            const slot = this.GetSlotOf(slots, type);
            if (!slot) {
                return "-"; // dash means none
            }
            const group = slot.Group[slot.CurrentChoice];
            const room = slot.Room[slot.CurrentChoice];
            const mode = slot.ClassMode;
            return `${type}(${group}) - ${room}${mode ? ` [${mode}]` : ''}`;
        };
        this.Lecture = extract("L");
        this.Tutorial = extract("T");
        this.Practical = extract("P");
        // According to Dr. Madhavan,
        // the credit hour can be obtained from the last digit of the subject code
        const creditHour = this.SubjectCode.slice(-1)[0];
        this.CreditHour = parseFloat(creditHour ? creditHour : "0.0");
    }
    ToString() {
        return this.SubjectCode + "\r\n"
            + this.SubjectName + "\r\n"
            + "    " + this.Lecture + "\r\n"
            + "    " + this.Tutorial + "\r\n"
            + "    " + this.Practical + "\r\n";
    }
    GetSlotOf(slots, slotType) {
        return slots.find((s) => s.Type === slotType);
    }
}
exports.SubjectSummary = SubjectSummary;
class TimetableSummary {
    constructor(chosenSlots) {
        this.SubjectSummaries =
            partitionize_1.PartitionizeByKey(chosenSlots, "SubjectCode")
                .map((partition) => new SubjectSummary(partition));
    }
    ToString() {
        let result = "";
        this
            .SubjectSummaries
            .forEach((s) => {
            result += s.ToString();
            result += "\r\n";
        });
        return result;
    }
    SortByScarcity(allSlots) {
        this.SubjectSummaries = (this.SubjectSummaries.sort((x, y) => {
            const relatedSlots = (subject) => allSlots.filter((s) => s.SubjectCode === subject.SubjectCode);
            return relatedSlots(x).length - relatedSlots(y).length;
        }));
        return this;
    }
}
exports.TimetableSummary = TimetableSummary;
//# sourceMappingURL=timetableSummary.js.map