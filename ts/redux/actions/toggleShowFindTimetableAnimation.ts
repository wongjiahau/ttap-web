import { MasterStateAction } from "../reducers/masterState";
import { IMasterState } from "./../reducers/masterState";

export class ToggleShowFindTimetableAnimation extends MasterStateAction {
    public constructor(private toggle ?: boolean) {
        super();
    }
    public TypeName(): string {
        return "toggle show find timetable animation";
    }

    protected GenerateNewState(state: IMasterState): IMasterState {
        return {
            ...state,
            SubjectListState: {
                ...state.SubjectListState,
                ShowAnimation: this.toggle || !state.SubjectListState.ShowAnimation
            }
        };
    }

}
