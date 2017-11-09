
import {ITimetableCreatorState, TimetableCreatorStateAction} from "./../reducers/timetableCreatorState";
export class NotifyIfTimetableIsFound extends TimetableCreatorStateAction {
    public constructor() {
        super();
    }
    public TypeName() : string {return "notify if timetable is found"; }
    protected GenerateNewState(state : ITimetableCreatorState) : ITimetableCreatorState {
        const numberOfTimetablesFound = state.SubjectListState.TimetableListState.Timetables.length;
        const message = `${numberOfTimetablesFound} possible timetables found.`;
        return {
            ...state,
            SnackbarMessage: message,
            IsSnackbarVisible: true
        };
    }
}
