
import {ITimetableListState, TimetableListStateAction} from "./../reducers/timetableListState";
export class OpenSaveDialog extends TimetableListStateAction {
    public constructor() {
        super();
    }
    public TypeName() : string {return "open save dialog"; }
    protected GenerateNewState(state : ITimetableListState) : ITimetableListState {
        return {
            ...state,
            IsSaveDialogOpen: true
        };
    }
}
