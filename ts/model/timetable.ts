import {
    RawSlot
} from "./rawSlot";

export class Timetable {
    public readonly Uids : number[];
    public readonly DayTimeMatrix : number[];
    public constructor(Uids: number[], dayTimeMatrix : number[]) {
        this.Uids = Uids;
        this.DayTimeMatrix = CompressDayTimeMatrix(dayTimeMatrix);
    }
}

export function CompressDayTimeMatrix(dayTimeMatrix: number[]) : number[] {
    const result = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < dayTimeMatrix.length; i++) {
        result[i % 7] |= dayTimeMatrix[i]; // 7 means the numberOfDayPerWeek
    }
    return result;
}
