import {
    Slot
} from "../model/slot";
import {
    TinySlot
} from "../permutator/tinySlot";

export function ParseSlotToTinySlot(slots: Slot[]): TinySlot[] {
    const result = [];
    for (let i = 0; i < slots.length; i++) {
        result.push(new TinySlot(slots[i]));
    }
    return result;
}
