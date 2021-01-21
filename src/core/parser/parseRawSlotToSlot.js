"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slot_1 = require("../model/slot");
function ParseRawSlotToSlot(rawSlots) {
    const parsableRawSlots = rawSlots.filter((x) => IsParsable(x) && IsReasonable(x));
    return parsableRawSlots.map((x) => slot_1.CreateSlotFromRaw(x));
}
exports.ParseRawSlotToSlot = ParseRawSlotToSlot;
function IsParsable(rawSlot) {
    return rawSlot.TimePeriod !== "";
}
exports.IsParsable = IsParsable;
function IsReasonable(rawSlot) {
    if (rawSlot.SubjectName.toLowerCase() === "industrial training") {
        return false;
    }
    return true;
}
exports.IsReasonable = IsReasonable;
//# sourceMappingURL=parseRawSlotToSlot.js.map