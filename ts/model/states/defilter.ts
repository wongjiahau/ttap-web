import { Timetable } from "../timetable";
import { State, StateKind } from "./state";

export function Defilter(timetables: Timetable[], state: State): Timetable[] {
    if (state.Kind !== StateKind.Clicked) {
        throw new Error("Only state that is Clicked can call the Defilter function");
    }
    const result = [];
    for (let i = 0; i < timetables.length; i++) {
        const t = timetables[i];
        if ((t.State[state.Day] & state.TimePeriod) === 0) {
            result.push(t);
        }
    }
    return result;
}
