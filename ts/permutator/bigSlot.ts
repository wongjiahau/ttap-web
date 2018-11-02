import { ParseType } from "../att/type";
import { ISlot } from "../model/slot";
import { GetInitial } from "../util/getInitial";
import { IOptimizedSlot } from "./tinySlot";

/**
 * BigSlot's difference with TinySlot is that BigSlot will include week number,
 * Thus, if user want to search timetables by considering week number, BigSlot should be used instead of TinySlot
 * @export
 * @class BigSlot
 * @implements {IOptimizedSlot}
 */
export class BigSlot implements IOptimizedSlot {
    public readonly PartitionKey: number;
    public DayTimeMatrix: number[ /*7 multiply numberOfWeeks*/ ];
    public readonly SlotNumber: number;
    public readonly PartitionGroup: string;
    public SlotIds: number[];
    public Uid: number;

    public constructor(s: ISlot) {
        this.PartitionKey = s.SubjectCode * 10 + ParseType(s.Type);
        this.SlotNumber = s.SlotNumber;
        this.Uid = s.SlotNumber;
        this.SlotIds = [];
        this.SlotIds.push(s.Uid);
        this.DayTimeMatrix = GetDayTimeMatrixOfBigSlot(s.Day, s.Week, s.TimePeriod);
        this.PartitionGroup = `${GetInitial(s.SubjectName)}(${s.Type})`;
    }

}
export function GetDayTimeMatrixOfBigSlot(Day:number, Week:number, TimePeriod:number): number[] {
    let result: number[] = [];
    const weekBinary = Week.toString(2);
    const matrix = [0, 0, 0, 0, 0, 0, 0];
    matrix[Day - 1] = TimePeriod;
    const maxNumberOfWeek = 14;
    for (let i = weekBinary.length - 1; i >= 0; i--) {
        if (weekBinary[i] === "1") {
            result = result.concat(matrix.slice());
        } else {
            result = result.concat([0, 0, 0, 0, 0, 0, 0]);
        }
    }
    for (let i = result.length / 7; i < maxNumberOfWeek; i++) {
        result = result.concat([0, 0, 0, 0, 0, 0, 0]);
    }
    return result;
}
