import {MasterStateAction} from "../reducers/masterState";
import {IMasterState} from "./../reducers/masterState";

export class GoToNextTimetable extends MasterStateAction {
    public TypeName() : string {return "go to next timetable"; }

    protected GenerateNewState(state : IMasterState) : IMasterState {
        let newIndex = state.TimetableListState.CurrentIndex + 1;
        if (newIndex > state.TimetableListState.FiltrateTimetables.length - 1) {
            newIndex = 0;
        }
        return {
            ...state,
            TimetableListState: {
                ...state.TimetableListState,
                ShowingAlternateSlotOf: null,
                CurrentIndex: newIndex,
                CurrentSubIndex: 0,
            }
        };
    }
}
