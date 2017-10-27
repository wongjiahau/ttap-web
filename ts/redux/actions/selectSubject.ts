import * as S from "string";
import {Beautify} from "../../helper";
import {ISubjectListState, SubjectListStateActionGenerator} from "./../reducers/subjectListState";
export class SelectSubject extends SubjectListStateActionGenerator {
    public constructor(private subjectCode: string) {
        super();
    }
    public TypeName() : string {return "select subject"; }
    protected GenerateNewState(state : ISubjectListState) : ISubjectListState {
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
        return result;
    }
}
