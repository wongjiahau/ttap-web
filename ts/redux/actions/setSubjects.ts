import {Subject} from "../../model/subject";
import {SubjectListStateActionGenerator} from "../reducers/subjectListState";
import {ISubjectListState} from "./../reducers/subjectListState";

export class SetSubjects extends SubjectListStateActionGenerator {
    public constructor(private subjects: Subject[]) {
        super();
    }
    public TypeName(): string {
        return "set subjects";
    }
    protected GenerateNewState(state: ISubjectListState): ISubjectListState {
        return {
            ...state,
            Subjects: this.subjects
        };
    }
}
