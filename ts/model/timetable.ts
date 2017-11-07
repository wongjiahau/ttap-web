import {
    RawSlot
} from "./rawSlot";

export class Timetable {
    public readonly RawSlots: RawSlot[];
    public constructor(rawSlots: RawSlot[]) {
        this.RawSlots = rawSlots;
    }
}
