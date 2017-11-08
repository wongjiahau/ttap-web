import {
    TimetableListStateAction
} from "../reducers/timetableListState";
import {
    ISubjectListState,
    SubjectListStateAction
} from "./../reducers/subjectListState";
import {
    TimetableListStateReducer
} from "./../reducers/timetableListState";

export class UpdateTimetableListState extends SubjectListStateAction {
    public constructor(private action: TimetableListStateAction) {
        super();
    }
    public TypeName(): string {
        const name = "Update TimetableList State";
        if (this.action !== null) {
            return name + ":" + this.action.TypeName();
        } else {
            return name;
        }
    }
    protected GenerateNewState(state: ISubjectListState): ISubjectListState {
        return {
            ...state,
            TimetableListState: TimetableListStateReducer(state.TimetableListState, this.action.Action())
        };
    }
}
