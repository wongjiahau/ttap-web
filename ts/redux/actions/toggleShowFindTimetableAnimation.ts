import { MasterStateAction } from "../reducers/masterState";
import { IMasterState } from "./../reducers/masterState";

export class ToggleShowFindTimetableAnimation extends MasterStateAction {
    public TypeName(): string {
        return "toggle show find timetable animation";
    }

    protected GenerateNewState(state: IMasterState): IMasterState {
        return {
            ...state,
            SubjectListState: {
                ...state.SubjectListState,
                ShowAnimation: !state.SubjectListState.ShowAnimation
            }
        };
    }

}
