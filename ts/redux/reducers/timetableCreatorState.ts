import * as typeName from "type-name";
import {
    Action
} from "../actions/action";
import {
    GenereteReducer
} from "./generateReducer";
import {
    ISetTimeConstraintState,
    SetTimeConstraintState
} from "./setTimeConstraintState";
import {
    ISubjectListState,
    SubjectListState
} from "./subjectListState";

export interface ITimetableCreatorState {
    IsSubjectListViewVisible: boolean;
    IsSnackbarVisible: boolean;
    SnackbarMessage: string;
    SubjectListState: ISubjectListState;
    SetTimeConstraintState: ISetTimeConstraintState;
}

export class TimetableCreatorState implements ITimetableCreatorState {
    public IsSnackbarVisible: boolean;
    public SnackbarMessage: string;
    public IsSubjectListViewVisible: boolean;
    public SubjectListState: ISubjectListState;
    public SetTimeConstraintState: ISetTimeConstraintState;
    public constructor(isSubjectListVisible = true, isSnackbarVisible = false, snackbarMessage = "") {
        this.IsSubjectListViewVisible = isSubjectListVisible;
        this.IsSnackbarVisible = isSnackbarVisible;
        this.SnackbarMessage = snackbarMessage;
        this.SubjectListState = new SubjectListState();
        this.SetTimeConstraintState = new SetTimeConstraintState();
    }
}

export const TimetableCreatorStateReducer = GenereteReducer(new TimetableCreatorState());

export abstract class TimetableCreatorStateAction extends Action < ITimetableCreatorState > {
    public StateName() {
        return typeName(new TimetableCreatorState());
    }
}
