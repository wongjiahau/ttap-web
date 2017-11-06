import {ParseDay} from "../att/day";
import {ParseType} from "../att/type";
import {TimePeriod} from "./../att/timePeriod";
import {Week} from "./../att/week";
import {RawSlot} from "./rawSlot";

export interface ISlot {
    HashId?:      number;
    SlotNumber?:  number;
    SubjectCode?: number;
    TimePeriod?:  number;
    Group?:       number;
    Type?:        number;
    Day?:         number;
    Week?:        number;
}
export class Slot implements ISlot {
    public readonly HashId: number;
    public readonly SlotNumber: number;
    public readonly SubjectCode:     number;
    public readonly TimePeriod:      number;
    public readonly Group:           number;
    public readonly Type:            number;
    public readonly Day:             number;
    public readonly Week:            number;
    public constructor(
        hashId:      number,
        slotNumber:  number,
        subjectCode: number,
        timePeriod:  number,
        group:       number,
        type:        number,
        day:         number,
        week:        number
    ) {
        this.HashId      = hashId;
        this.SlotNumber  = slotNumber;
        this.SubjectCode = subjectCode;
        this.TimePeriod  = timePeriod;
        this.Group       = group;
        this.Type        = type;
        this.Day         = day;
        this.Week        = week;
    }

}

export function IntersectWith(a: ISlot, b: ISlot): boolean {
    if (a.SubjectCode === b.SubjectCode && a.Type === b.Type && a.Group !== b.Group) {
        return true;
    }
    if ( a.Day !== b.Day) {
        return false;
    }
    if ((a.TimePeriod & b.TimePeriod) === 0 ) {
        return false;
    }
    return (a.Week & b.Week) > 0;
}
export function CreateSlotFromRaw(raw : RawSlot) : Slot {
    const stringHash  = require("string-hash");
    const hashId      = raw.HashId;
    const slotNumber = parseInt(raw.Number, 10);
    const subjectCode = stringHash(raw.SubjectCode);
    const timePeriod  = TimePeriod.Parse(raw.TimePeriod).BinaryData;
    const group       = parseInt(raw.Group, 10);
    const type        = ParseType(raw.Type);
    const day         = ParseDay(raw.Day);
    const week        = Week.Parse(raw.WeekNumber).BinaryData;
    return new Slot(hashId, slotNumber, subjectCode, timePeriod, group, type, day, week);
}

export function CreateSlotFromInterface(s: ISlot) : Slot {
    return new Slot (
         s.HashId,
         s.SlotNumber,
         s.SubjectCode,
         s.TimePeriod,
         s.Group,
         s.Type,
         s.Day,
         s.Week
        );
}
