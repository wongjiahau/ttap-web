import {
    GenerateTotalMatrix
} from "../../model/matrix/generateTotalMatrix";
import {
    IMasterState,
    MasterStateAction
} from "../reducers/masterState";

export class UpdateTotalMatrix extends MasterStateAction {
    public constructor() {
        super();
    }
    public TypeName(): string {
        return "update total state";
    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        return {
            ...state,
            SetTimeConstraintState: {
                ...state.SetTimeConstraintState,
                ClickedTimeConstraint: [0, 0, 0, 0, 0, 0, 0],
                UidsOfClickedBoxes: [],
                TotalMatrix: GenerateTotalMatrix(state.TimetableListState.FiltrateTimetables, [])
            }
        };
    }
}
