import {
    RawSlot
} from "./rawSlot";

// tslint:disable-next-line:interface-name
export interface Timetable {
    SlotUids : number[];
    DayTimeMatrix : number[/* 7 */];
}

// The dimension of uncompressedDayTimeMatrix is 7 multiple the number of study week 
export function newTimetable(Uids: number[], uncompressedDayTimeMatrix : number[]): Timetable {
    return {
        SlotUids : Uids,
        DayTimeMatrix: CompressDayTimeMatrix(uncompressedDayTimeMatrix),
    };
}

export function CompressDayTimeMatrix(dayTimeMatrix: number[]) : number[] {
    const result = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < dayTimeMatrix.length; i++) {
        result[i % 7] |= dayTimeMatrix[i]; // 7 means the numberOfDayPerWeek
    }
    return result;
}
