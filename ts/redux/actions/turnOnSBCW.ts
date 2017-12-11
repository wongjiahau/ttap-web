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
import {
    FindTimetableBasedOn
} from "./toggleSubjectSelection";
export class TurnOnSBCW extends MasterStateAction {
    public constructor() {
        super();
    }
    public TypeName(): string {
        return "turn on search by considering week number";
    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        let newTimetables = null;
        if (state.SubjectListState.Subjects !== null) {
            newTimetables = FindTimetableBasedOn(
                state.SubjectListState.Subjects.filter((s) => s.IsSelected),
                FindTimetableByConsideringWeekNumber
            );
        } else {
            newTimetables = state.TimetableListState.FiltrateTimetables;
        }
        return {
            ...state,
            SettingsState: {
                ...state.SettingsState,
                SearchByConsideringWeekNumber: true,
                TimetableFinder: FindTimetableByConsideringWeekNumber
            },
            SbcwDialogState: {
                ...state.SbcwDialogState,
                IsOpen: false
            },
            TimetableListState: NewTimetableListState(newTimetables)
        };
    }
}
