import {
    CreateSlotFromRaw, Slot
} from "../model/slot";
import {
    RawSlot
} from "./../model/rawSlot";
export function ParseRawSlotToSlot(rawSlots: RawSlot[]) {
    return rawSlots.map((x) => CreateSlotFromRaw(x));
}
