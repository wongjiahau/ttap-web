import * as typeName from "type-name";
import {
    Action
} from "../actions/action";
import {
    GenereteReducer
} from "./generateReducer";

export interface ISaveTimetableDialogState {
    IsMainDialogOpen: boolean;
    IsGetDateDialogOpen: boolean;
}

export class SaveTimetableDialogState implements ISaveTimetableDialogState {
    public IsMainDialogOpen: boolean;
    public IsGetDateDialogOpen: boolean;
    public constructor(isMainDialogOpen = false, isGetDateDialogOpen = false) {
        this.IsMainDialogOpen = isMainDialogOpen;
        this.IsGetDateDialogOpen = isGetDateDialogOpen;
    }
}

export abstract class SaveTimetableDialogStateAction extends Action < ISaveTimetableDialogState > {
    public StateName() {
        return typeName(new SaveTimetableDialogState());
    }
}

export const SaveTimetableDialogStateReducer = GenereteReducer(new SaveTimetableDialogState());
