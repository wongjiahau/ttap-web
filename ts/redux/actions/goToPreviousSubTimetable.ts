import {MasterStateAction} from "../reducers/masterState";
import {IMasterState} from "./../reducers/masterState";

export class GoToPreviousSubTimetable extends MasterStateAction {
    public TypeName() : string {return "go to previous sub timetable"; }

    protected GenerateNewState(state : IMasterState) : IMasterState {
        const s = state.TimetableListState;
        let newIndex = s.CurrentSubIndex - 1;
        if (newIndex < 0) {
            newIndex = s.FiltrateTimetables[s.CurrentIndex].ListOfSlotUids.length - 1;
        }
        return {
            ...state,
            TimetableListState: {
                ...state.TimetableListState,
                CurrentSubIndex: newIndex,
                AlternativeSlots: []
            }
        };
    }
}
