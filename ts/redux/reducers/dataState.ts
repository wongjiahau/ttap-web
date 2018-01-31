import { DataRouter } from "./../../dataStructure/dataRouter";
import { ObjectStore } from "./../../dataStructure/objectStore";
import { RawSlot } from "./../../model/rawSlot";
import { ISlotState } from "./../../model/slotState";

export interface IDataState {
    RawSlotDataRouter: DataRouter<ObjectStore<RawSlot>>;
}

export function NewDataState() : IDataState {
    return {
        RawSlotDataRouter: null
    };
}
