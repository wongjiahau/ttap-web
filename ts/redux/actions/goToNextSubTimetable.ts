import { MasterStateAction } from "../reducers/masterState";
import { IMasterState } from "./../reducers/masterState";

export class GoToNextSubTimetable extends MasterStateAction {
  public TypeName(): string {
    return "go to next sub timetable";
  }

  protected GenerateNewState(state: IMasterState): IMasterState {
    const s = state.TimetableListState;
    let newIndex = s.CurrentSubIndex + 1;
    if (
      newIndex >
      s.FiltrateTimetables[s.CurrentIndex].ListOfSlotUids.length - 1
    ) {
      newIndex = 0;
    }
    return {
      ...state,
      TimetableListState: {
        ...state.TimetableListState,
        ShowingAlternateSlotOf: null,
        CurrentSubIndex: newIndex,
      },
    };
  }
}
