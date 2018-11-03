import { IGroupedTimetable } from "../model/groupedTimetable";
import { Timetable } from "../model/timetable";

export function GroupSimilarTimetables(timetables: Timetable[]): IGroupedTimetable[] {
    const partition: {[matrix: string]: IGroupedTimetable} = {};
    for (let i = 0; i < timetables.length; i++) {
        const t = timetables[i];
        const matrix = t.DayTimeMatrix.toString();
        if (partition[matrix] !== undefined) {
            partition[matrix].ListOfSlotUids.push(t.SlotUids);
        } else {
            partition[matrix] = {
                DayTimeMatrix: t.DayTimeMatrix,
                ListOfSlotUids: [t.SlotUids]
            };
        }
    }
    return Object.keys(partition).map((key) => partition[key]);
}
