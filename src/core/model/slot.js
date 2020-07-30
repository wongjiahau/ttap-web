"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const day_1 = require("../att/day");
const timePeriod_1 = require("./../att/timePeriod");
const week_1 = require("./../att/week");
class Slot {
    constructor(Uid, slotNumber, subjectCode, subjectName, timePeriod, group, type, day, week) {
        this.Uid = Uid;
        this.SlotNumber = slotNumber;
        this.SubjectCode = subjectCode;
        this.SubjectName = subjectName;
        this.TimePeriod = timePeriod;
        this.Group = group;
        this.Type = type;
        this.Day = day;
        this.Week = week;
    }
}
exports.Slot = Slot;
function CreateSlotFromRaw(raw) {
    const stringHash = require("string-hash");
    const Uid = raw.Uid;
    const slotNumber = parseInt(raw.Number, 10);
    const subjectCode = stringHash(raw.SubjectCode);
    const timePeriod = timePeriod_1.TimePeriod.Parse(raw.TimePeriod).BinaryData;
    const week = week_1.Week.Parse(raw.WeekNumber).BinaryData;
    const day = day_1.ParseDay(raw.Day);
    const group = parseInt(raw.Group, 10);
    return new Slot(Uid, slotNumber, subjectCode, raw.SubjectName, timePeriod, group, raw.Type, day, week);
}
exports.CreateSlotFromRaw = CreateSlotFromRaw;
function CreateSlotFromInterface(s) {
    return new Slot(s.Uid, s.SlotNumber, s.SubjectCode, s.SubjectName, s.TimePeriod, s.Group, s.Type, s.Day, s.Week);
}
exports.CreateSlotFromInterface = CreateSlotFromInterface;
//# sourceMappingURL=slot.js.map