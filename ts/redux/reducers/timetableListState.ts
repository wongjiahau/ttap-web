import * as typeName from "type-name";
import { ObjectStore } from "../../dataStructure/objectStore";
import { RawSlot } from "../../model/rawSlot";
import { CreateSlotViewModels, ISlotViewModel } from "../../model/slotViewModel";
import {Action} from "../actions/action";
import {Timetable} from "./../../model/timetable";
import { IMasterState, NewMasterState } from "./masterState";

export interface ITimetableListState {
    CurrentIndex:           number;
    FiltrateTimetables:     Timetable[];
    IsSummaryOpen:          boolean;
    ResidueTimetables:      Timetable[];
    SlotViewModelStore:     ObjectStore<ISlotViewModel>;
    AlternateSlots:         ISlotViewModel[];
    ShowingAlternateSlotOf: ISlotViewModel | null;
}

export function NewTimetableListState(
    timetables: Timetable[],
    selectedSlots: RawSlot[]
) : ITimetableListState {
    const slotVMs = CreateSlotViewModels(selectedSlots);

    const slotStateStore = timetables.length > 0 ?
        new ObjectStore(slotVMs) :
        new ObjectStore([]);
    return {
        CurrentIndex: 0,
        FiltrateTimetables: timetables,
        IsSummaryOpen: false,
        ResidueTimetables: [],
        SlotViewModelStore: slotStateStore,
        AlternateSlots: [],
        ShowingAlternateSlotOf: null
    };
}

export abstract class TimetableListStateAction extends Action < ITimetableListState > {
    public StateName() {
        return typeName(NewTimetableListState([], []));
    }
}

export interface IGetAlternativeSlotsParams {
    timetableListState: ITimetableListState;
    slots: RawSlot[];
}
