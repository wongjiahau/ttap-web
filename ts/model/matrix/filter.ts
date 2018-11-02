import {
    Timetable
} from "../timetable";
import {
    MatrixKind,
    STCBox
} from "./stcBox";

export function Filter(timetables: Timetable[], box: STCBox): [Timetable[], Timetable[]] {
    if (box.Kind !== MatrixKind.MaybeOccupied) {
        throw new Error("Only box that is MaybeOccupied can call the Filter function");
    }
    const filtrate: Timetable[] = [];
    const residue: Timetable[] = [];
    for (let i = 0; i < timetables.length; i++) {
        const t = timetables[i];
        if ((t.DayTimeMatrix[box.Day] & box.TimePeriod) === 0) {
            filtrate.push(t);
        } else {
            residue.push(t);
        }
    }
    return [filtrate, residue];
}
