"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sum = require("lodash.sum");
function Defilter(residueTimetables, clickedTimeConstraint) {
    if (clickedTimeConstraint.length !== 7) {
        throw new Error("Length clickedTimeConstraint must be exactly 7.");
    }
    const rescuedTimetables = [];
    const unrescuedTimetables = [];
    for (let i = 0; i < residueTimetables.length; i++) {
        const t = residueTimetables[i];
        let canBeRescued = true;
        for (let day = 0; day < 7; day++) {
            if ((t.DayTimeMatrix[day] & clickedTimeConstraint[day]) > 0) {
                canBeRescued = false;
                break;
            }
        }
        if (canBeRescued) {
            rescuedTimetables.push(t);
        }
        else {
            unrescuedTimetables.push(t);
        }
    }
    return [rescuedTimetables, unrescuedTimetables];
}
exports.Defilter = Defilter;
//# sourceMappingURL=defilter.js.map