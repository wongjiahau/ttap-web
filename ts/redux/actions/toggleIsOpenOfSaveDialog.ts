import {
    ISaveTimetableDialogState,
    SaveTimetableDialogStateAction
} from "./../reducers/saveTimetableDialogState";
export class ToggleIsOpenOfSaveDialog extends SaveTimetableDialogStateAction {
    public constructor(private isOpen: boolean) {
        super();
    }
    public TypeName(): string {
        if (this.isOpen) {
            return "open save dialog";
        } else {
            return "close save dialog";
        }
    }
    protected GenerateNewState(state: ISaveTimetableDialogState): ISaveTimetableDialogState {
        return {
            ...state,
            IsMainDialogOpen: this.isOpen
        };
    }
}
