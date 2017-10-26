import {ISubjectListState} from "./../reducers/subjectListState";
import {ActionGenerator} from "./actionGenerator";
export class ToggleSubjectListViewingOptions extends ActionGenerator < ISubjectListState > {
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
