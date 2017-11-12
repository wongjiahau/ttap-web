import {
    Defilter
} from "../../model/states/defilter";
import {
    GenerateTotalState
} from "../../model/states/generateTotalState";
import {
    State
} from "../../model/states/state";
import {
    ITimetableListState,
    TimetableListStateAction
} from "./../reducers/timetableListState";

export class DefilterTimetable extends TimetableListStateAction {
    public constructor(private state: State) {
        super();
    }
    public TypeName(): string {
        return `defilter timetable at [${this.state.Uid}]`;
    }
    protected GenerateNewState(state: ITimetableListState): ITimetableListState {
        const newUidsOfClickedState = state.UidsOfClickedState.filter((x) => x !== this.state.Uid);
        const [rescued, unrescued] = Defilter(state.ResidueTimetables, this.state);
        const newFiltrateTimetables = state.FiltrateTimetables.concat(rescued);
        const newResidueTimetables = unrescued;
        return {
            ...state,
            UidsOfClickedState: newUidsOfClickedState,
            FiltrateTimetables: newFiltrateTimetables,
            ResidueTimetables: newResidueTimetables,
            TotalState: GenerateTotalState(newFiltrateTimetables, newUidsOfClickedState)
        };
    }
}
