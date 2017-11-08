import * as S from "string";
import {
    Beautify
} from "../../helper";
import {
    ISubjectListState,
    SubjectListStateAction,
    SubjectListStateReducer
} from "./../reducers/subjectListState";
import {
    ToggleSubjectListViewingOptions
} from "./toggleSubjectListViewingOption";

export class SelectSubject extends SubjectListStateAction {
    public constructor(private subjectCode: string) {
        super();
    }
    public TypeName(): string {
        return "select subject";
    }
    protected GenerateNewState(state: ISubjectListState): ISubjectListState {
        const newSubjects = state
            .Subjects
            .map((s) => {
                return {
                    ...s,
                    IsSelected: (this.subjectCode === s.Code ? !s.IsSelected : s.IsSelected)
                };
            });
        const result: ISubjectListState = {
            ...state,
            Subjects: newSubjects
        };
        const allSubjectIsDeselected = newSubjects.every((x) => !x.IsSelected);
        const newIsShowSelectedSubjectOnly = state.IsShowingSelectedSubjectOnly && !allSubjectIsDeselected;
        const shouldToggleToShowAllSubject =
            state.IsShowingSelectedSubjectOnly && newIsShowSelectedSubjectOnly === false;
        if (shouldToggleToShowAllSubject) {
            return SubjectListStateReducer(result, new ToggleSubjectListViewingOptions().Action());

        } else {
            return result;
        }
    }
}
