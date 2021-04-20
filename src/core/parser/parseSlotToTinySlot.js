"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sortBy = require("lodash.sortby");
const last = require("lodash.last");
const tinySlot_1 = require("../permutator/tinySlot");
function ParseSlotToTinySlot(slots) {
    const sorted = sortBy(slots, ["SlotNumber"]);
    const result = new Array();
    result.push(new tinySlot_1.TinySlot(sorted[0]));
    for (let i = 1; i < sorted.length; i++) {
        const s = sorted[i];
        const prevSlot = last(result);
        if (s.SlotNumber === prevSlot.SlotNumber) {
            prevSlot.SlotIds.push(s.Uid);
            prevSlot.DayTimeMatrix[s.Day - 1] |= s.TimePeriod;
        }
        else {
            result.push(new tinySlot_1.TinySlot(s));
        }
    }
    return result;
}
exports.ParseSlotToTinySlot = ParseSlotToTinySlot;
//# sourceMappingURL=parseSlotToTinySlot.js.map