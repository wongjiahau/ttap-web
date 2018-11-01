import { DataRouter } from "./../../dataStructure/dataRouter";
import { ObjectStore } from "./../../dataStructure/objectStore";
import { RawSlot } from "./../../model/rawSlot";
import { ISlotViewModel } from "./../../model/slotViewModel";

export interface IDataState {
    RawSlotDataRouter: DataRouter<ObjectStore<RawSlot>>;
}

export function NewDataState() : IDataState {
    return {
        RawSlotDataRouter: new DataRouter<ObjectStore<RawSlot>>()
    };
}
