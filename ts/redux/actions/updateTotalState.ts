import {
    GenerateTotalState
} from "../../model/states/generateTotalState";
import {
    ITimetableListState,
    TimetableListStateAction
} from "./../reducers/timetableListState";

export class UpdateTotalState extends TimetableListStateAction {
    public constructor() {
        super();
    }
    public TypeName(): string {
        return "update total state";
    }
    protected GenerateNewState(state: ITimetableListState): ITimetableListState {
        return {
            ...state,
            TotalState: GenerateTotalState(state.FilteredTimetables)
        };
    }
}
