
import {ISaveTimetableDialogState, SaveTimetableDialogStateAction} from "./../reducers/saveTimetableDialogState";
export class ToggleIsOpenOfGetDateDialog extends SaveTimetableDialogStateAction {
    public constructor(private isOpen: boolean) {
        super();
    }

    public TypeName() : string {
        return this.isOpen ?
            "open get date dialog" :
            "close get date dialog";
    }

    protected GenerateNewState(state : ISaveTimetableDialogState) : ISaveTimetableDialogState {
        return {
            ...state,
            IsGetDateDialogOpen: this.isOpen
        };
    }
}
