import { MasterStateAction } from "../reducers/masterState";
import { IMasterState } from "./../reducers/masterState";

export class GoToPrevTimetable extends MasterStateAction {
  public TypeName(): string {
    return "go to previous timetable";
  }

  protected GenerateNewState(state: IMasterState): IMasterState {
    let newIndex = state.TimetableListState.CurrentIndex - 1;
    if (newIndex < 0) {
      newIndex = state.TimetableListState.FiltrateTimetables.length - 1;
    }
    return {
      ...state,
      TimetableListState: {
        ...state.TimetableListState,
        ShowingAlternateSlotOf: null,
        CurrentIndex: newIndex,
        CurrentSubIndex: 0,
      },
    };
  }
}
