import * as typeName from "type-name";
import {
    Subject
} from "../../model/subject";
import {
    Action
} from "../actions/action";

export interface ISubjectListState {
    ClashingSubjectPairs:         Array < [Subject, Subject] > ;
    IsOpen:                       boolean;
    IsShowingLoadingBar:          boolean;
    IsShowingSelectedSubjectOnly: boolean;
    SearchedText:                 string;
    Subjects:                     Subject[];
    ShowAnimation:                boolean;
}

export function NewSubjectListState(subjects: Subject[]) : ISubjectListState {
    return {
        ClashingSubjectPairs:         null,
        IsOpen:                       false,
        IsShowingLoadingBar:          false,
        IsShowingSelectedSubjectOnly: false,
        SearchedText:                 "",
        Subjects:                     subjects,
        ShowAnimation:                false,
    };
}

export abstract class SubjectListStateAction extends Action < ISubjectListState > {
    public StateName() {
        return typeName(NewSubjectListState(null));
    }
}
