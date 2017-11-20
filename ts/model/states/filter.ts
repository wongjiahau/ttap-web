import {
    Timetable
} from "../timetable";
import {
    StateKind,
    STCBox
} from "./stcBox";

export function Filter(timetables: Timetable[], state: STCBox): [Timetable[], Timetable[]] {
    if (state.Kind !== StateKind.MaybeOccupied) {
        throw new Error("Only state that is MaybeOccupied can call the Filter function");
    }
    const filtrate = [];
    const residue = [];
    for (let i = 0; i < timetables.length; i++) {
        const t = timetables[i];
        if ((t.State[state.Day] & state.TimePeriod) === 0) {
            filtrate.push(t);
        } else {
            residue.push(t);
        }
    }
    return [filtrate, residue];
}
