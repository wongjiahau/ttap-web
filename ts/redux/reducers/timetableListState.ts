import * as typeName from "type-name";
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
    SlotStates: ISlotState[];
}

export function NewTimetableListState(timetables: Timetable[], selectedSlots?: RawSlot[]) : ITimetableListState {
    const slotStates = timetables.length > 0 ?
        CreateSlotStates(selectedSlots) :
        null;
    return {
        CurrentIndex: 0,
        FiltrateTimetables: timetables,
        IsSummaryOpen: false,
        ResidueTimetables: [],
        SlotStates: slotStates
    };
}

export abstract class TimetableListStateAction extends Action < ITimetableListState > {
    public StateName() {
        return typeName(NewTimetableListState(null, null));
    }
}
