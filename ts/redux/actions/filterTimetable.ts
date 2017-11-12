import {
    Filter
} from "../../model/states/filter";
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
        const [filtrate, residue] = Filter(state.FiltrateTimetables, this.state);
        const newUidsOfClickedState = state.UidsOfClickedState.concat(this.state.Uid);
        return {
            ...state,
            FiltrateTimetables: filtrate,
            ResidueTimetables: residue,
            TotalState: GenerateTotalState(filtrate, newUidsOfClickedState),
            UidsOfClickedState: newUidsOfClickedState
        };
    }
}
