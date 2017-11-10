import {
    saveAs
} from "file-saver";
import {
    Timetable
} from "./../../../model/timetable";
import {
    TimetableSummary
} from "./../../../model/timetableSummary";
import {
    ITimetableListState,
    TimetableListStateAction
} from "./../../reducers/timetableListState";

export abstract class SaveTimetable extends TimetableListStateAction {
    public constructor() {
        super();
    }
    public TypeName(): string {
        return "save timetable as - " + this.SaveType();
    }
    protected GenerateNewState(state: ITimetableListState): ITimetableListState {
        if (state.CurrentTimetable) {
            this.Save(state.CurrentTimetable);
        }
        return {
            ...state,
            IsSaveDialogOpen: false
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
