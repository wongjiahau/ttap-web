import {
    ITimetableCreatorState,
    TimetableCreatorStateAction
} from "./../reducers/timetableCreatorState";
export class NotifyNumberOfRemainingTimetables extends TimetableCreatorStateAction {
    public constructor() {
        super();
    }
    public TypeName(): string {
        return "notify number of remaining timetables";
    }
    protected GenerateNewState(state: ITimetableCreatorState): ITimetableCreatorState {
        return {
            ...state,
            IsSnackbarVisible: true,
            SnackbarMessage: state.SubjectListState.TimetableListState.FiltrateTimetables.length +
                " timetables remaining."
            // your code here
        };
    }
}
