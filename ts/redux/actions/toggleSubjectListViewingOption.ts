import {ISubjectListState, SubjectListStateAction} from "./../reducers/subjectListState";
export class ToggleSubjectListViewingOptions extends SubjectListStateAction {
    public TypeName() : string {return "toggle subject list viewing option"; }
    protected GenerateNewState(state : ISubjectListState) : ISubjectListState {
        const newIsShowingSelectedSubjectOnly = !state.IsShowingSelectedSubjectOnly;
        const newSubjects = state
            .Subjects
            .map((s) => {
                if (newIsShowingSelectedSubjectOnly) {
                    return {
                        ...s,
                        IsVisible: s.IsSelected
                    };
                } else {
                    return {
                        ...s,
                        IsVisible: true
                    };
                }
            });
        const result: ISubjectListState = {
            ...state,
            IsShowingSelectedSubjectOnly: newIsShowingSelectedSubjectOnly,
            Subjects: newSubjects
        };
        return result;
    }

}
