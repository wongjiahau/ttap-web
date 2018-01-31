import { ObjectStore } from "./../../dataStructure/objectStore";
import { RawSlot } from "./../../model/rawSlot";
import { ISlotState } from "./../../model/slotState";

export interface IDataState {
    UngeneralizedRawSlotStore: ObjectStore<RawSlot>;
    GeneralizedRawSlotStore:   ObjectStore<RawSlot>;
    CurrentRawSlotStore:       ObjectStore<RawSlot>;
}

export function NewDataState() : IDataState {
    return {
        UngeneralizedRawSlotStore: null,
        GeneralizedRawSlotStore: null,
        CurrentRawSlotStore: null
    };
}
