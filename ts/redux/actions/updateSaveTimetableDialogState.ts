import {
    SaveTimetableDialogStateAction, SaveTimetableDialogStateReducer
} from "../reducers/saveTimetableDialogState";
import {
    ITimetableCreatorState,
    TimetableCreatorStateAction
} from "./../reducers/timetableCreatorState";

export class UpdateSaveTimetableDialogState extends TimetableCreatorStateAction {
    public constructor(private action: SaveTimetableDialogStateAction) {
        super();
    }
    public TypeName(): string {
        return "update save timetable dialog state : " + this.action.TypeName();
    }
    protected GenerateNewState(state: ITimetableCreatorState): ITimetableCreatorState {
        return {
            ...state,
            SaveTimetableDialogState: SaveTimetableDialogStateReducer(state.SaveTimetableDialogState, this.action.Action())
        };
    }
}
