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
    IsShowingLoadingBar: boolean;
    IsShowingSelectedSubjectOnly: boolean;
    SearchedText: string;
    SlotStates: boolean[];
    Subjects: Subject[];
    TimetableListState: ITimetableListState;
}

export class SubjectListState implements ISubjectListState {
    public ClashingSubjectPairs: Array < [Subject, Subject] > ;
    public IsShowingLoadingBar: boolean;
    public IsShowingSelectedSubjectOnly: boolean;
    public SearchedText: string;
    public SlotStates: boolean[];
    public Subjects: Subject[];
    public TimetableListState: ITimetableListState;
    public constructor(subjects: Subject[]) {
        this.ClashingSubjectPairs = null;
        this.IsShowingLoadingBar = false;
        this.IsShowingSelectedSubjectOnly = false;
        this.SlotStates = [];
        this.SearchedText = "";
        this.Subjects = subjects;
        this.TimetableListState = new TimetableListState();
    }
}

export abstract class SubjectListStateAction extends Action < ISubjectListState > {
    public StateName() {
        return typeName(new SubjectListState(null));
    }
}

export const SubjectListStateReducer = GenereteReducer(new SubjectListState(null));
