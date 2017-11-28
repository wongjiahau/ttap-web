import * as typeName from "type-name";
import {
    Subject
} from "../../model/subject";
import {
    Action
} from "../actions/action";
import {
    GenereteReducer
} from "./generateReducer";
import {
    ISaveTimetableDialogState, SaveTimetableDialogState
} from "./saveTimetableDialogState";
import {
    ISubjectListState,
    SubjectListState
} from "./subjectListState";

export interface ITimetableCreatorState {
    IsSlotLoaded: boolean;
    IsSnackbarVisible: boolean;
    IsSubjectListViewVisible: boolean;
    SnackbarMessage: string;
    SubjectListState: ISubjectListState;
    SaveTimetableDialogState: ISaveTimetableDialogState;
}

export class TimetableCreatorState implements ITimetableCreatorState {
    public IsSlotLoaded: boolean;
    public IsSnackbarVisible: boolean;
    public IsSubjectListViewVisible: boolean;
    public SnackbarMessage: string;
    public SubjectListState: ISubjectListState;
    public SaveTimetableDialogState: ISaveTimetableDialogState;
    public constructor(subjects: Subject[]) {
        this.IsSlotLoaded = false;
        this.IsSnackbarVisible = false;
        this.IsSubjectListViewVisible = true;
        this.SnackbarMessage = "";
        this.SubjectListState = new SubjectListState(subjects);
        this.SaveTimetableDialogState = new SaveTimetableDialogState();
    }
}

export const TimetableCreatorStateReducer = GenereteReducer(new TimetableCreatorState(null));

export abstract class TimetableCreatorStateAction extends Action < ITimetableCreatorState > {
    public StateName() {
        return typeName(new TimetableCreatorState(null));
    }
}
