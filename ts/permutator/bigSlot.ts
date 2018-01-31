import {
    ISlot
} from "../model/slot";
import {
    IPartitionable
} from "./partitionize";
import {
    IOptimizedSlot
} from "./tinySlot";

/**
 * BigSlot's difference with TinySlot is that BigSlot will include week number,
 * Thus, if user want to search timetables by considering week number, BigSlot should be used instead of TinySlot
 * @export
 * @class BigSlot
 * @implements {IOptimizedSlot}
 */
export class BigSlot implements IOptimizedSlot {
    public readonly PartitionKey: number;
    public State: number[ /*7 multiply numberOfWeeks*/ ];
    public readonly SlotNumber: number;
    public SlotIds: number[];

    public constructor(s: ISlot) {
        this.PartitionKey = s.SubjectCode * 10 + s.Type;
        this.SlotNumber = s.SlotNumber;
        this.SlotIds = [];
        this.SlotIds.push(s.Uid);
        this.State = GetStateOfBigSlot(s);
    }

}
export function GetStateOfBigSlot(s: ISlot): number[] {
    let result = [];
    const weekBinary = s.Week.toString(2);
    const state = [0, 0, 0, 0, 0, 0, 0];
    state[s.Day - 1] = s.TimePeriod;
    const maxNumberOfWeek = 14;
    for (let i = weekBinary.length - 1; i >= 0; i--) {
        if (weekBinary[i] === "1") {
            result = result.concat(state.slice());
        } else {
            result = result.concat([0, 0, 0, 0, 0, 0, 0]);
        }
    }
    for (let i = result.length / 7; i < maxNumberOfWeek; i++) {
        result = result.concat([0, 0, 0, 0, 0, 0, 0]);
    }
    return result;
}
