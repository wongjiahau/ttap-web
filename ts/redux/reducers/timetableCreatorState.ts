import * as typeName from "type-name";
import {
    Action
} from "../actions/action";
import {
    GenereteReducer
} from "./generateReducer";
export interface ITimetableCreatorState {
    IsSubjectListViewVisible: boolean;
    IsSnackbarVisible: boolean;
    SnackbarMessage: string;
}

export class TimetableCreatorState implements ITimetableCreatorState {
    public IsSnackbarVisible: boolean;
    public SnackbarMessage: string;
    public IsSubjectListViewVisible: boolean;
    public constructor(isSubjectListVisible = false, isSnackbarVisible = false, snackbarMessage = "") {
        this.IsSubjectListViewVisible = isSubjectListVisible;
        this.IsSnackbarVisible = isSnackbarVisible;
        this.SnackbarMessage = snackbarMessage;
    }
}

export const TimetableCreatorStateReducer = GenereteReducer(new TimetableCreatorState());

export abstract class TimetableCreatorStateAction extends Action < ITimetableCreatorState > {
    public StateName() {
        return typeName(new TimetableCreatorState());
    }
}
