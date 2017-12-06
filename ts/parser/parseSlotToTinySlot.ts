import {
    last,
    sortBy
} from "lodash";
import {
    ISlot
} from "../model/slot";
import {
    TinySlot
} from "../permutator/tinySlot";

export function ParseSlotToTinySlot(slots: ISlot[]): TinySlot[] {
    const sorted = sortBy(slots, ["SlotNumber"]);
    const result = new Array < TinySlot > ();
    result.push(new TinySlot(sorted[0]));
    for (let i = 1; i < sorted.length; i++) {
        const s = sorted[i];
        if (s.SlotNumber === last(result).SlotNumber) {
            last(result).SlotIds.push(s.HashId);
            last(result).State[s.Day - 1] |= s.TimePeriod;
        } else {
            result.push(new TinySlot(s));
        }
    }
    return result;
}
