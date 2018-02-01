import * as typeName from "type-name";
import { ObjectStore } from "../../dataStructure/objectStore";
import { RawSlot } from "../../model/rawSlot";
import { CreateSlotStates, ISlotState } from "../../model/slotState";
import { STCBox } from "../../model/states/stcBox";
import { GeneralizeSlot } from "../../permutator/generalizeSlot";
import {Action} from "../actions/action";
import {Timetable} from "./../../model/timetable";

export interface ITimetableListState {
    CurrentIndex:       number;
    FiltrateTimetables: Timetable[];
    IsSummaryOpen:      boolean;
    ResidueTimetables:  Timetable[];
    SlotStateStore:     ObjectStore<ISlotState>;
}

export function NewTimetableListState(timetables: Timetable[], selectedSlots?: RawSlot[]) : ITimetableListState {
    const slotStateStore = timetables.length > 0 ?
        new ObjectStore(CreateSlotStates(selectedSlots)) :
        null;
    return {
        CurrentIndex: 0,
        FiltrateTimetables: timetables,
        IsSummaryOpen: false,
        ResidueTimetables: [],
        SlotStateStore: slotStateStore
    };
}

export abstract class TimetableListStateAction extends Action < ITimetableListState > {
    public StateName() {
        return typeName(NewTimetableListState(null, null));
    }
}
