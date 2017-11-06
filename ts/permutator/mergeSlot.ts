import {
    last,
    sortBy
} from "lodash";
import {
    Slot
} from "../model/slot";
import {
    TinySlot
} from "./tinySlot";

export function MergeSlot(slots: Slot[]): TinySlot[] {
    const sorted = sortBy(slots, ["SlotNumber"]);
    const result = new Array < TinySlot > ();
    result.push(new TinySlot(sorted[0]));
    for (let i = 0; i < sorted.length; i++) {
        if (sorted[i].SlotNumber === last(result).SlotNumber) {
            last(result).HashIds.push(sorted[i].HashId);
        } else {
            result.push(new TinySlot(sorted[i]));
        }
    }
    return result;
}
