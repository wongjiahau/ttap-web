import {TimetableListStateAction} from "../reducers/timetableListState";
import {ITimetableListState} from "./../reducers/timetableListState";

export class GoToNextTimetable extends TimetableListStateAction {
    public TypeName() : string {return "go to next timetable"; }

    protected GenerateNewState(state : ITimetableListState) : ITimetableListState {
        let newIndex = state.CurrentIndex + 1;
        if (newIndex > state.FiltrateTimetables.length - 1) {
            newIndex = 0;
        }
        return {
            ...state,
            CurrentIndex: newIndex,
        };
    }
}
