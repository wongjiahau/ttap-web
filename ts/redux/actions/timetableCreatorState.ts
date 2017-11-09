
import {ITimetableCreatorState, TimetableCreatorStateAction} from "./../reducers/timetableCreatorState";
export class HideSnackbar extends TimetableCreatorStateAction {
    public constructor() {
        super();
    }
    public TypeName() : string {return "hide snackbar"; }
    protected GenerateNewState(state : ITimetableCreatorState) : ITimetableCreatorState {
        return {
            ...state,
            // your code here
        };
    }
}
