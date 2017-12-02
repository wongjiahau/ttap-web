import {
    Defilter
} from "../../model/states/defilter";
import {
    GenerateTotalState
} from "../../model/states/generateTotalState";
import {
    STCBox
} from "../../model/states/stcBox";
import {
    IMasterState,
    MasterStateAction
} from "../reducers/masterState";

export class DefilterTimetable extends MasterStateAction {
    public constructor(private clickedState: STCBox) {
        super();
    }
    public TypeName(): string {
        return `defilter timetable at [${this.clickedState.Uid}]`;
    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        const newClickedTimeConstraint = state.SetTimeConstraintState.ClickedTimeConstraint.slice();
        newClickedTimeConstraint[this.clickedState.Day] ^= this.clickedState.TimePeriod;
        const newUidsOfClickedState = state.SetTimeConstraintState.UidsOfClickedState
            .filter((x) => x !== this.clickedState.Uid);
        const [rescued, unrescued] = Defilter(state.TimetableListState.ResidueTimetables, newClickedTimeConstraint);
        const newFiltrateTimetables = state.TimetableListState.FiltrateTimetables.concat(rescued);
        const newResidueTimetables = unrescued;
        return {
            ...state,
            TimetableListState: {
                ...state.TimetableListState,
                CurrentIndex: 0,
                FiltrateTimetables: newFiltrateTimetables,
                ResidueTimetables: newResidueTimetables,
            },
            SetTimeConstraintState: {
                ...state.SetTimeConstraintState,
                UidsOfClickedState: newUidsOfClickedState,
                TotalState: GenerateTotalState(newFiltrateTimetables, newUidsOfClickedState),
                ClickedTimeConstraint: newClickedTimeConstraint
            }
        };
    }
}
