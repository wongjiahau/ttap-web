import {
    Defilter
} from "../../model/matrix/defilter";
import {
    GenerateTotalMatrix
} from "../../model/matrix/generateTotalMatrix";
import {
    STCBox
} from "../../model/matrix/stcBox";
import {
    IMasterState,
    MasterStateAction
} from "../reducers/masterState";

export class DefilterTimetable extends MasterStateAction {
    public constructor(private clickedBox: STCBox) {
        super();
    }
    public TypeName(): string {
        return `defilter timetable at [${this.clickedBox.Uid}]`;
    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        const newClickedTimeConstraint = state.SetTimeConstraintState.ClickedTimeConstraint.slice();
        newClickedTimeConstraint[this.clickedBox.Day] ^= this.clickedBox.TimePeriod;
        const newUidsOfClickedBox = state.SetTimeConstraintState.UidsOfClickedBoxes
            .filter((x) => x !== this.clickedBox.Uid);
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
                UidsOfClickedBoxes: newUidsOfClickedBox,
                TotalMatrix: GenerateTotalMatrix(newFiltrateTimetables, newUidsOfClickedBox),
                ClickedTimeConstraint: newClickedTimeConstraint
            }
        };
    }
}
