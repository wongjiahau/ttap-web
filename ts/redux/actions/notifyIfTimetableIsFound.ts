import {
    ITimetableCreatorState,
    TimetableCreatorStateAction
} from "./../reducers/timetableCreatorState";

let previousSelectedSubjectCount = 0;
export class NotifyIfTimetableIsFound extends TimetableCreatorStateAction {
    public constructor() {
        super();
    }
    public TypeName(): string {
        return "notify if timetable is found";
    }
    protected GenerateNewState(state: ITimetableCreatorState): ITimetableCreatorState {
        const currentSelectedSubjectCount = state.SubjectListState.Subjects.filter((x) => x.IsSelected).length;
        const numberOfTimetablesFound = state.SubjectListState.TimetableListState.FiltrateTimetables.length;
        const shouldShowSnackbar = state.SubjectListState.Subjects.some((s) => s.IsSelected) && previousSelectedSubjectCount !== currentSelectedSubjectCount;
        previousSelectedSubjectCount = currentSelectedSubjectCount;
        const message = `${numberOfTimetablesFound} possible timetables found.`;
        return {
            ...state,
            SnackbarMessage: message,
            IsSnackbarVisible: shouldShowSnackbar
        };
    }
}
