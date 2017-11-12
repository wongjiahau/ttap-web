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
        let x = "";
        if (numberOfTimetablesFound === 0) {
            x = "No";
        } else if (numberOfTimetablesFound > 100) {
            x = numberOfTimetablesFound.toString();
        } else {
            x = converter.toWords(numberOfTimetablesFound);
            x = x.charAt(0).toUpperCase() + x.slice(1);
        }
        const message = `${x} possible timetables found.`;
        return {
            ...state,
            SnackbarMessage: message,
            IsSnackbarVisible: shouldShowSnackbar
        };
    }
}
