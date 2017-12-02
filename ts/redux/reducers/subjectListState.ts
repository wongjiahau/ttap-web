import * as typeName from "type-name";
import {
    Subject
} from "../../model/subject";
import {
    Action
} from "../actions/action";
import {
    GetTestSubjects1
} from "./../../tests/testDataGenerator";
import {
    GenereteReducer
} from "./generateReducer";
import {
    ITimetableListState,
    TimetableListState
} from "./timetableListState";

export interface ISubjectListState {
    ClashingSubjectPairs:         Array < [Subject, Subject] > ;
    IsOpen:                       boolean;
    IsShowingLoadingBar:          boolean;
    IsShowingSelectedSubjectOnly: boolean;
    SearchedText:                 string;
    Subjects:                     Subject[];
}

export function NewSubjectListState(subjects: Subject[]) : ISubjectListState {
    return {
        ClashingSubjectPairs:         null,
        IsOpen:                       false,
        IsShowingLoadingBar:          false,
        IsShowingSelectedSubjectOnly: false,
        SearchedText:                 "",
        Subjects:                     subjects
    };
}

export abstract class SubjectListStateAction extends Action < ISubjectListState > {
    public StateName() {
        return typeName(NewSubjectListState(null));
    }
}

export const SubjectListStateReducer = GenereteReducer(NewSubjectListState(null));
