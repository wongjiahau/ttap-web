"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RawSlot {
    constructor() {
        this.Uid = RawSlot.nextUid++;
        this.SubjectCode = "";
        this.SubjectName = "";
        this.Number = "";
        this.Type = "";
        this.Group = "";
        this.TimePeriod = "";
        this.Day = "";
        this.WeekNumber = "";
        this.Room = "";
    }
    static ResetUid(s) {
        s.Uid = RawSlot.nextUid++;
        return s;
    }
}
RawSlot.nextUid = 0;
exports.RawSlot = RawSlot;
//# sourceMappingURL=rawSlot.js.map