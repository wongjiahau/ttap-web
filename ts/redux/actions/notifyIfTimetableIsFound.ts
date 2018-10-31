import {
    IMasterState,
    MasterStateAction
} from "./../reducers/masterState";

export class NotifyIfTimetableIsFound extends MasterStateAction {
    public constructor() {
        super();
    }
    public TypeName(): string {
        return "notify if timetable is found";
    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        const currentSelectedSubjectCount = state.SubjectListState.Subjects.filter((x) => x.IsSelected).length;
        const numberOfTimetablesFound = state.TimetableListState.FiltrateTimetables.length;
        const shouldShowSnackbar = state.SubjectListState.Subjects.some((s) => s.IsSelected);
        const message = `${numberOfTimetablesFound} possible timetables found.`;
        return {
            ...state,
            SnackbarState: {
                ...state.SnackbarState,
                Message: message,
                IsOpen: shouldShowSnackbar
            }
        };
    }
}
