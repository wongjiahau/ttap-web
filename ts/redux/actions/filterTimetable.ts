import {
    Filter
} from "../../model/matrix/filter";
import {
    GenerateTotalMatrix
} from "../../model/matrix/generateTotalMatrix";
import {
    STCBox
} from "../../model/matrix/stcBox";
import {
    IMasterState,
    MasterStateAction
} from "./../reducers/masterState";

export class FilterTimetable extends MasterStateAction {
    public constructor(private clickedState: STCBox) {
        super();
    }
    public TypeName(): string {
        return `filter timetable at [${this.clickedState.Uid}]`;
    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        const [filtrate, residue] =
            Filter(state.TimetableListState.FiltrateTimetables, this.clickedState);
        const newUidsOfClickedState = state.SetTimeConstraintState.UidsOfClickedBoxes.concat(this.clickedState.Uid);
        const newClickedTimeConstraint = state.SetTimeConstraintState.ClickedTimeConstraint.slice();
        newClickedTimeConstraint[this.clickedState.Day] |= this.clickedState.TimePeriod;
        return {
            ...state,
            TimetableListState: {
                ...state.TimetableListState,
                CurrentIndex: 0,
                FiltrateTimetables: filtrate,
                ResidueTimetables: state.TimetableListState.ResidueTimetables.concat(residue),
            },
            SetTimeConstraintState: {
                ...state.SetTimeConstraintState,
                TotalMatrix: GenerateTotalMatrix(filtrate, newUidsOfClickedState),
                UidsOfClickedBoxes: newUidsOfClickedState,
                ClickedTimeConstraint: newClickedTimeConstraint
            }
        };
    }
}
