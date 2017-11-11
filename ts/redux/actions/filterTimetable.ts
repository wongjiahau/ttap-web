import {
    GenerateTotalState
} from "../../model/states/generateTotalState";
import {
    State
} from "../../model/states/state";
import {
    Timetable
} from "../../model/timetable";
import {
    StateKind
} from "./../../model/states/state";
import {
    ITimetableListState,
    TimetableListStateAction
} from "./../reducers/timetableListState";

export class FilterTimetable extends TimetableListStateAction {
    public constructor(private state: State) {
        super();
    }
    public TypeName(): string {
        return "filter timetable";
    }
    protected GenerateNewState(state: ITimetableListState): ITimetableListState {
        const filtered = Filter(state.FilteredTimetables, this.state);
        return {
            ...state,
            FilteredTimetables: filtered,
            TotalState: GenerateTotalState(filtered)
        };
    }
}

export function Filter(timetables: Timetable[], state: State): Timetable[] {
    if (state.Kind !== StateKind.MaybeOccupied) {
        throw new Error("Only state that is MaybeOccupied can call the Filter function");
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
