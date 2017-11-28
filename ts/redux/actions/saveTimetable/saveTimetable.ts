import {
    saveAs
} from "file-saver";
import { SaveTimetableDialogState } from "../../reducers/saveTimetableDialogState";
import {
    Timetable
} from "./../../../model/timetable";
import {
    TimetableSummary
} from "./../../../model/timetableSummary";
import {
    ITimetableCreatorState,
    TimetableCreatorStateAction
} from "./../../reducers/timetableCreatorState";

export abstract class SaveTimetable extends TimetableCreatorStateAction {
    public constructor() {
        super();
    }
    public TypeName(): string {
        return "save timetable as - " + this.SaveType();
    }
    protected GenerateNewState(state: ITimetableCreatorState): ITimetableCreatorState {
        const x = state.SubjectListState.TimetableListState;
        const currentTimetable = x.FiltrateTimetables[x.CurrentIndex];
        if (currentTimetable) {
            this.Save(currentTimetable);
        }
        return {
            ...state,
            SaveTimetableDialogState: new SaveTimetableDialogState(false, false)
        };
    }

    protected abstract Save(timetable: Timetable);
    protected abstract SaveType() : string;
}

export class MockSaveTimetable extends SaveTimetable {
    protected Save(timetable: Timetable) {
        // do nothing, as the purpose of this class is for testing only
    }
    protected SaveType(): string {
        return "mock";
    }

}
