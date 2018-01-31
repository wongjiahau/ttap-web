import {
    RawSlot
} from "./rawSlot";

export class Timetable {
    public readonly Uids : number[];
    public readonly State : number[];
    public constructor(Uids: number[], state : number[]) {
        this.Uids = Uids;
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
