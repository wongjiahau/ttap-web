import { FindTimetableWithoutConsideringWeekNumber } from "../../permutator/findTimetable";
import { IMasterState, MasterStateAction } from "./../reducers/masterState";
export class TurnOffSBCW extends MasterStateAction {
  public constructor() {
    super();
  }
  public TypeName(): string {
    return "turn off search by considering week number";
  }
  protected GenerateNewState(state: IMasterState): IMasterState {
    const newDataRouter = state.DataState.RawSlotDataRouter.Clone();
    newDataRouter.SetRouteTo("generalized");
    return {
      ...state,
      DataState: {
        RawSlotDataRouter: newDataRouter,
      },
      SettingsState: {
        ...state.SettingsState,
        SearchByConsideringWeekNumber: false,
        TimetableFinder: FindTimetableWithoutConsideringWeekNumber,
      },
    };
  }
}
