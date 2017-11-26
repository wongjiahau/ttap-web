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
    ClashingSubjectPairs: Array < [Subject, Subject] > ;
    SearchedText: string;
    Subjects: Subject[];
    IsShowingSelectedSubjectOnly: boolean;
    IsShowingLoadingBar: boolean;
    TimetableListState: ITimetableListState;
}

export class SubjectListState implements ISubjectListState {
    public ClashingSubjectPairs: Array < [Subject, Subject] > ;
    public SearchedText: string;
    public Subjects: Subject[];
    public IsShowingLoadingBar: boolean;
    public IsShowingSelectedSubjectOnly: boolean;
    public TimetableListState: ITimetableListState;
    public constructor(subjects: Subject[]) {
        this.SearchedText = "";
        this.IsShowingSelectedSubjectOnly = false;
        this.IsShowingLoadingBar = false;
        this.TimetableListState = new TimetableListState();
        this.ClashingSubjectPairs = null;
        this.Subjects = subjects;
    }
}

export abstract class SubjectListStateAction extends Action < ISubjectListState > {
    public StateName() {
        return typeName(new SubjectListState(null));
    }
}

export const SubjectListStateReducer = GenereteReducer(new SubjectListState(null));
