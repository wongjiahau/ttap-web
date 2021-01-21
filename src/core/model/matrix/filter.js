"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stcBox_1 = require("./stcBox");
function Filter(timetables, box) {
    if (box.Kind !== stcBox_1.BoxKind.MaybeOccupied) {
        throw new Error("Only box that is MaybeOccupied can call the Filter function");
    }
    const filtrate = [];
    const residue = [];
    for (let i = 0; i < timetables.length; i++) {
        const t = timetables[i];
        if ((t.DayTimeMatrix[box.Day] & box.TimePeriod) === 0) {
            filtrate.push(t);
        }
        else {
            residue.push(t);
        }
    }
    return [filtrate, residue];
}
exports.Filter = Filter;
//# sourceMappingURL=filter.js.map