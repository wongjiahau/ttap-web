const last = require("lodash.last");
const sortBy = require("lodash.sortby");
import {
    ISlot
} from "../model/slot";
import { BigSlot, GetStateOfBigSlot } from "../permutator/bigSlot";
import { Append } from "../permutator/state";

export function ParseSlotToBigSlot(slots: ISlot[]): BigSlot[] {
    const sorted = sortBy(slots, ["SlotNumber"]);
    const result = new Array < BigSlot > ();
    result.push(new BigSlot(sorted[0]));
    for (let i = 1; i < sorted.length; i++) {
        const s = sorted[i];
        const prevSlot = last(result);
        if (s.SlotNumber === prevSlot.SlotNumber) {
            prevSlot.SlotIds.push(s.HashId);
            prevSlot.State = Append(prevSlot.State, GetStateOfBigSlot(s));
        } else {
            result.push(new BigSlot(s));
        }
    }
    return result;
}
