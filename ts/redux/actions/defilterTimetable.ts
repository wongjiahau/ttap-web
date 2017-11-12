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
    public constructor(private clickedState: State) {
        super();
    }
    public TypeName(): string {
        return `defilter timetable at [${this.clickedState.Uid}]`;
    }
    protected GenerateNewState(state: ITimetableListState): ITimetableListState {
        const newClickedTimeConstraint = state.ClickedTimeConstraint.slice();
        newClickedTimeConstraint[this.clickedState.Day] ^= this.clickedState.TimePeriod;
        const newUidsOfClickedState = state.UidsOfClickedState.filter((x) => x !== this.clickedState.Uid);
        const [rescued, unrescued] = Defilter(state.ResidueTimetables, newClickedTimeConstraint);
        const newFiltrateTimetables = state.FiltrateTimetables.concat(rescued);
        const newResidueTimetables = unrescued;
        return {
            ...state,
            CurrentIndex: 0,
            UidsOfClickedState: newUidsOfClickedState,
            FiltrateTimetables: newFiltrateTimetables,
            ResidueTimetables: newResidueTimetables,
            TotalState: GenerateTotalState(newFiltrateTimetables, newUidsOfClickedState),
            ClickedTimeConstraint: newClickedTimeConstraint
        };
    }
}
