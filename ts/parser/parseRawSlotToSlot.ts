import {
    CreateSlotFromRaw, Slot
} from "../model/slot";
import {
    RawSlot
} from "./../model/rawSlot";
export function ParseRawSlotToSlot(rawSlots: RawSlot[]): Slot[] {
    const parsableRawSlots = rawSlots.filter((x) => IsParsable(x));
    return parsableRawSlots.map((x) => CreateSlotFromRaw(x));
}

export function IsParsable(rawSlot: RawSlot): boolean {
    if (rawSlot.TimePeriod === undefined) {
        return false;
    }
    return true;
}
