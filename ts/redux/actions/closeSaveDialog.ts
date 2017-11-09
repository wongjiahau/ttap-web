
import {ITimetableListState, TimetableListStateAction} from "./../reducers/timetableListState";
export class CloseSaveDialog extends TimetableListStateAction {
    public constructor() {
        super();
    }
    public TypeName() : string {return "close save dialog"; }
    protected GenerateNewState(state : ITimetableListState) : ITimetableListState {
        return {
            ...state,
            IsSaveDialogOpen: false
        };
    }
}
