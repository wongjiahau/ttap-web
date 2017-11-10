import {ISubjectListState, SubjectListStateAction} from "./../reducers/subjectListState";
export class ToggleLoadingBar extends SubjectListStateAction {
    public constructor(private showLoadingBar: boolean) {
        super();
    }
    public TypeName() : string {return "toggle loading bar"; }
    protected GenerateNewState(state : ISubjectListState) : ISubjectListState {
        return {
            ...state,
            IsShowingLoadingBar : this.showLoadingBar
        };
    }
}
