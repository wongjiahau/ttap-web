import {
    RawSlot
} from "./rawSlot";

export class Timetable {
    public readonly HashIds : number[];
    public readonly State : number[];
    public constructor(hashIds: number[], state : number[]) {
        this.HashIds = hashIds;
        this.State = state;
    }
}
