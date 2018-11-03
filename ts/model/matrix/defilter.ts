import { IGroupedTimetable } from "../groupedTimetable";

const sum = require("lodash.sum");

export function Defilter(residueTimetables: IGroupedTimetable[], clickedTimeConstraint: number[]): [IGroupedTimetable[], IGroupedTimetable[]] {
    if (clickedTimeConstraint.length !== 7) {
        throw new Error("Length clickedTimeConstraint must be exactly 7.");
    }
    const rescuedTimetables: IGroupedTimetable[] = [];
    const unrescuedTimetables: IGroupedTimetable[] = [];
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
        } else {
            unrescuedTimetables.push(t);
        }
    }
    return [rescuedTimetables, unrescuedTimetables];
}
