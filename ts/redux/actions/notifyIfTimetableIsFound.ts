import {
    ITimetableCreatorState,
    TimetableCreatorStateAction
} from "./../reducers/timetableCreatorState";

export class NotifyIfTimetableIsFound extends TimetableCreatorStateAction {
    public constructor() {
        super();
    }
    public TypeName(): string {
        return "notify if timetable is found";
    }
    protected GenerateNewState(state: ITimetableCreatorState): ITimetableCreatorState {
        const converter = require("number-to-words");
        const numberOfTimetablesFound = state.SubjectListState.TimetableListState.FiltrateTimetables.length;
        const shouldShowSnackbar = state.SubjectListState.Subjects.some((s) => s.IsSelected);
        const message = `${numberOfTimetablesFound} possible timetables found.`;
        return {
            ...state,
            SnackbarMessage: message,
            IsSnackbarVisible: shouldShowSnackbar
        };
    }
}
