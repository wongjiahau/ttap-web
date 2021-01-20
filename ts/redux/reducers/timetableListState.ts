import * as typeName from "type-name";
import { ObjectStore } from "../../dataStructure/objectStore";
import { IGroupedTimetable } from "../../model/groupedTimetable";
import { RawSlot } from "../../model/rawSlot";
import { AlternativeSlot, CreateSlotViewModels, ISlotViewModel } from "../../model/slotViewModel";
import {Action} from "../actions/action";

export interface ITimetableListState {
    CurrentIndex:           number; // Means the index for the current timetable variation
    CurrentSubIndex:        number; // Means the index for identical timetables from the same timetable variants
    FiltrateTimetables:     IGroupedTimetable[]; // Timetables that pass through the filtration process
    IsSummaryOpen:          boolean;
    ResidueTimetables:      IGroupedTimetable[]; // Timetables that failed to pass through the filtration process
    SlotViewModelStore:     ObjectStore<ISlotViewModel>;
    ShowingAlternateSlotOf: ISlotViewModel | null;
    UidsOfLockedSlot:       number[];
}

export function NewTimetableListState(
    groupedTimetables: IGroupedTimetable[],
    selectedSlots: RawSlot[],
    isSummaryOpen = true
) : ITimetableListState {
    const slotVMs = CreateSlotViewModels(selectedSlots);

    const slotStateStore = groupedTimetables.length > 0 ?
        new ObjectStore(slotVMs) :
        new ObjectStore([]);
    return {
        CurrentIndex: 0,
        CurrentSubIndex: 0,
        FiltrateTimetables: groupedTimetables,
        IsSummaryOpen: isSummaryOpen,
        ResidueTimetables: [],
        SlotViewModelStore: slotStateStore,
        ShowingAlternateSlotOf: null,
        UidsOfLockedSlot: []
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
