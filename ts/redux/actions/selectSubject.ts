import * as S from "string";
import {Beautify} from "../../helper";
import {ISubjectListViewState} from "./../reducers/subjectListViewState";
import {ActionGenerator} from "./actionGenerator";
export class SelectSubject extends ActionGenerator < ISubjectListViewState > {
    public constructor(private subjectCode: string) {
        super();
    }
    public TypeName() : string {return "select subject"; }
    protected GenerateNewState(state : ISubjectListViewState) : ISubjectListViewState {
        const newSubjects = state
            .Subjects
            .map((s) => {
                return {
                    ...s,
                    IsSelected: (this.subjectCode === s.Code ? !s.IsSelected : s.IsSelected)
                };
            });
        const result: ISubjectListViewState = {
            ...state,
            Subjects: newSubjects
        };
        return result;
    }
}
