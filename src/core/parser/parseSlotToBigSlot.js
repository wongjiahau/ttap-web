"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const last = require("lodash.last");
const sortBy = require("lodash.sortby");
const bigSlot_1 = require("../permutator/bigSlot");
const matrix_1 = require("../permutator/matrix");
function ParseSlotToBigSlot(slots) {
    const sorted = sortBy(slots, ["SlotNumber"]);
    const result = new Array();
    result.push(bigSlot_1.newBigSlot(sorted[0]));
    for (let i = 1; i < sorted.length; i++) {
        const s = sorted[i];
        const prevSlot = last(result);
        if (s.SlotNumber === prevSlot.SlotNumber) {
            prevSlot.SlotIds.push(s.Uid);
            prevSlot.DayTimeMatrix = matrix_1.AppendMatrix(prevSlot.DayTimeMatrix, bigSlot_1.GetDayTimeMatrixOfBigSlot(s.Day, s.Week, s.TimePeriod));
        }
        else {
            result.push(bigSlot_1.newBigSlot(s));
        }
    }
    return result;
}
exports.ParseSlotToBigSlot = ParseSlotToBigSlot;
//# sourceMappingURL=parseSlotToBigSlot.js.map