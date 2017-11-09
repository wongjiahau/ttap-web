import {
    SubjectListStateAction,
    SubjectListStateReducer
} from "./../reducers/subjectListState";
import {
    ITimetableCreatorState,
    TimetableCreatorStateAction
} from "./../reducers/timetableCreatorState";

export class UpdateSubjectListState extends TimetableCreatorStateAction {
    public constructor(private action: SubjectListStateAction) {
        super();
    }
    public TypeName(): string {
        if (this.action) {
            return "update subject list state : " + this.action.TypeName();
        }
        return "update subject list state";
    }
    protected GenerateNewState(state: ITimetableCreatorState): ITimetableCreatorState {
        return {
            ...state,
            SubjectListState: SubjectListStateReducer(state.SubjectListState, this.action.Action())
        };
    }
}
