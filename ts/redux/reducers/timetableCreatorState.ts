import * as typeName from "type-name";
import {
    Action
} from "../actions/action";
import {
    GenereteReducer
} from "./generateReducer";
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
}

export class TimetableCreatorState implements ITimetableCreatorState {
    public IsSlotLoaded: boolean;
    public IsSnackbarVisible: boolean;
    public IsSubjectListViewVisible: boolean;
    public SnackbarMessage: string;
    public SubjectListState: ISubjectListState;
    public constructor(isSubjectListVisible = true, isSnackbarVisible = false, snackbarMessage = "") {
        this.IsSlotLoaded = false;
        this.IsSnackbarVisible = isSnackbarVisible;
        this.IsSubjectListViewVisible = isSubjectListVisible;
        this.SnackbarMessage = snackbarMessage;
        this.SubjectListState = new SubjectListState(null);
    }
}

export const TimetableCreatorStateReducer = GenereteReducer(new TimetableCreatorState());

export abstract class TimetableCreatorStateAction extends Action < ITimetableCreatorState > {
    public StateName() {
        return typeName(new TimetableCreatorState());
    }
}
