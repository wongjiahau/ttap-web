import {ISubjectListViewState} from "./../reducers/subjectListViewState";
import {ActionGenerator} from "./actionGenerator";
export class ToggleSubjectListViewingOptions extends ActionGenerator < ISubjectListViewState > {
    public TypeName() : string {return "toggle subject list viewing option"; }
    protected GenerateNewState(state : ISubjectListViewState) : ISubjectListViewState {
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
        const result: ISubjectListViewState = {
            ...state,
            IsShowingSelectedSubjectOnly: newIsShowingSelectedSubjectOnly,
            Subjects: newSubjects
        };
        return result;
    }

}
