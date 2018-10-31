const sum = require("lodash.sum");
import {
    Timetable
} from "../timetable";
import {
    StateKind,
    STCBox
} from "./stcBox";

export function Defilter(residueTimetables: Timetable[], clickedTimeConstraint: number[]): [Timetable[], Timetable[]] {
    if (clickedTimeConstraint.length !== 7) {
        throw new Error("Length clickedTimeConstraint must be exactly 7.");
    }
    const rescuedTimetables: Timetable[] = [];
    const unrescuedTimetables: Timetable[] = [];
    for (let i = 0; i < residueTimetables.length; i++) {
        const t = residueTimetables[i];
        let canBeRescued = true;
        for (let day = 0; day < 7; day++) {
            if ((t.State[day] & clickedTimeConstraint[day]) > 0) {
                canBeRescued = false;
                break;
            }
        }
        if (canBeRescued) {
            rescuedTimetables.push(t);
        } else {
            unrescuedTimetables.push(t);
        }
    }
    return [rescuedTimetables, unrescuedTimetables];
}
