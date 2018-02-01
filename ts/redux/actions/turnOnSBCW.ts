import {
    FindTimetableByConsideringWeekNumber
} from "../../permutator/findTimetable";
import {
    NewTimetableListState
} from "../reducers/timetableListState";
import {
    IMasterState,
    MasterStateAction
} from "./../reducers/masterState";
export class TurnOnSBCW extends MasterStateAction {
    public constructor() {
        super();
    }
    public TypeName(): string {
        return "turn on search by considering week number";
    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        const newDataRouter = state.DataState.RawSlotDataRouter.Clone();
        newDataRouter.SetRouteTo("ungeneralized");
        return {
            ...state,
            DataState: {
                RawSlotDataRouter: newDataRouter
            },
            SettingsState: {
                ...state.SettingsState,
                SearchByConsideringWeekNumber: true,
                TimetableFinder: FindTimetableByConsideringWeekNumber
            },
            SbcwDialogState: {
                ...state.SbcwDialogState,
                IsOpen: false
            }
        };
    }
}
