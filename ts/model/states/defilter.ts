import { Timetable } from "../timetable";
import { State, StateKind } from "./state";

export function Defilter(residueTimetables: Timetable[], state: State): [Timetable[], Timetable[]] {
    if (state.Kind !== StateKind.Clicked) {
        throw new Error("Only state that is Clicked can call the Defilter function");
    }
    const rescuedTimetables = [];
    const unrescudeTimetables = [];
    for (let i = 0; i < residueTimetables.length; i++) {
        const t = residueTimetables[i];
        if ((t.State[state.Day] & state.TimePeriod) > 0) {
            rescuedTimetables.push(t);
        } else {
            unrescudeTimetables.push(t);
        }
    }
    return [rescuedTimetables, unrescudeTimetables];
}
