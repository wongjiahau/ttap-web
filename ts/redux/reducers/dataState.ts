import { ObjectStore } from "./../../dataStructure/objectStore";
import { RawSlot } from "./../../model/rawSlot";
import { ISlotState } from "./../../model/slotState";

export interface IDataState {
    UngeneralizedRawSlotStore: ObjectStore<RawSlot>;
    GeneralizedRawSlotStore:   ObjectStore<RawSlot>;
    SlotStateStore:            ObjectStore<ISlotState>;
}

export function NewDataState() : IDataState {
    return {
        UngeneralizedRawSlotStore: null,
        GeneralizedRawSlotStore: null,
        SlotStateStore: null
    };
}
