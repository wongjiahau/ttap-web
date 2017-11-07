import * as S from "string";
import {GetInitial} from "../../helper";
import {ISubjectListState, SubjectListStateAction} from "./../reducers/subjectListState";
export class SearchSubjectList extends SubjectListStateAction {
    public constructor(private searchedText : string) {
        super();
    }
    public TypeName() : string {return "search subject list"; }
    protected GenerateNewState(state : ISubjectListState) : ISubjectListState {
        const newSubjects = state
            .Subjects
            .map((s) => {
                const stringToBeMatched = S((s.Code + s.Name + GetInitial(s.Name)).toLowerCase());
                return {
                    ...s,
                    IsVisible: (stringToBeMatched.contains(this.searchedText)
                        ? true
                        : false)
                };
            });
        const result: ISubjectListState = {
            ...state,
            IsShowingSelectedSubjectOnly: false,
            SearchedText: this.searchedText,
            Subjects: newSubjects,
        };
        return result;
    }
}
