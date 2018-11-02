const last = require("lodash.last");
const sortBy = require("lodash.sortby");
import {
    ISlot
} from "../model/slot";
import { BigSlot, GetDayTimeMatrixOfBigSlot } from "../permutator/bigSlot";
import { AppendMatrix } from "../permutator/matrix";

export function ParseSlotToBigSlot(slots: ISlot[]): BigSlot[] {
    const sorted: ISlot[] = sortBy(slots, ["SlotNumber"]);
    const result = new Array < BigSlot > ();
    result.push(new BigSlot(sorted[0]));
    for (let i = 1; i < sorted.length; i++) {
        const s = sorted[i];
        const prevSlot: BigSlot = last(result);
        if (s.SlotNumber === prevSlot.SlotNumber) {
            prevSlot.SlotIds.push(s.Uid);
            prevSlot.DayTimeMatrix = AppendMatrix(prevSlot.DayTimeMatrix, GetDayTimeMatrixOfBigSlot(s.Day, s.Week, s.TimePeriod));
        } else {
            result.push(new BigSlot(s));
        }
    }
    return result;
}
