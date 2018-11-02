import { Timetable } from "../model/timetable";

export function GroupSimilarTimetables(timetables: Timetable[]): Timetable[][] {
    const result: {[matrix: string]: Timetable[]} = {};
    for (let i = 0; i < timetables.length; i++) {
        const t = timetables[i];
        const matrix = t.DayTimeMatrix.toString();
        if(result[matrix]) {
            result[matrix].push(t);
        } else {
            result[matrix] = [t];
        }
    }
    return Object.keys(result).map((x) => result[x]);
}