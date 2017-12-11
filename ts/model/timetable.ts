import {
    RawSlot
} from "./rawSlot";

export class Timetable {
    public readonly HashIds : number[];
    public readonly State : number[];
    public constructor(hashIds: number[], state : number[]) {
        this.HashIds = hashIds;
        this.State = CompressState(state);
    }
}

export function CompressState(state: number[]) : number[] {
    const result = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < state.length; i++) {
        result[i % 7] |= state[i]; // 7 means the numberOfDayPerWeek
    }
    return result;
}
