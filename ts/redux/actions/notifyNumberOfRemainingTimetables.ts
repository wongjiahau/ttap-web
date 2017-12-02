import {
    IMasterState,
    MasterStateAction
} from "./../reducers/masterState";
export class NotifyNumberOfRemainingTimetables extends MasterStateAction {
    public constructor() {
        super();
    }
    public TypeName(): string {
        return "notify number of remaining timetables";
    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        return {
            ...state,
            SnackbarState: {
                ...state.SnackbarState,
                IsOpen: true,
                Message: state.TimetableListState.FiltrateTimetables.length +
                " timetables remaining."
            }
        };
    }
}
