import * as S from "string";
import {Beautify} from "../../helper";
import {ISubjectListState} from "./../reducers/subjectListState";
import {ActionGenerator} from "./actionGenerator";
export class SearchSubjectList extends ActionGenerator < ISubjectListState > {
    public constructor(private searchedText : string) {
        super();
    }
    public TypeName() : string {return "search subject list"; }
    protected GenerateNewState(state : ISubjectListState) : ISubjectListState {
        const newSubjects = state
            .Subjects
            .map((s) => {
                const stringToBeMatched = S((s.Code + s.Name + Beautify(s.Name)).toLowerCase());
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
            Subjects: newSubjects
        };
        return result;
    }
}
