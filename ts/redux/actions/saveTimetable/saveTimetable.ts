import {
    saveAs
} from "file-saver";
import { ObjectStore } from "../../../dataStructure/objectStore";
import { IRawSlot } from "../../../model/rawSlot";
import { Timetable } from "../../../model/timetable";
import { ISaveTimetableDialogState, NewSaveTimetableDialogState } from "../../reducers/saveTimetableDialogState";
import {
    TimetableSummary
} from "./../../../model/timetableSummary";
import {
    IMasterState,
    MasterStateAction
} from "./../../reducers/masterState";

export abstract class SaveTimetable extends MasterStateAction {
    public constructor() {
        super();
    }
    public TypeName(): string {
        return "save timetable as - " + this.SaveType();
    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        const x = state.TimetableListState;
        const currentTimetable = new Timetable(
            x.FiltrateTimetables[x.CurrentIndex].ListOfSlotUids[x.CurrentSubIndex],
            x.FiltrateTimetables[x.CurrentIndex].DayTimeMatrix
        );
        if (currentTimetable) {
            this.Save(currentTimetable, state.DataState.RawSlotDataRouter.GetCurrentData());
        }
        return {
            ...state,
            SaveTimetableDialogState: NewSaveTimetableDialogState()
        };
    }

    protected abstract Save(timetable: Timetable, rawSlotStore: ObjectStore<IRawSlot>): void;
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
