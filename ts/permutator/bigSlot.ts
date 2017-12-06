import {
    ISlot
} from "../model/slot";
import {
    IPartitionable
} from "./partitionize";

/**
 * BigSlot's difference with TinySlot is that BigSlot will include week number,
 * Thus, if user want to search timetables by considering week number, BigSlot should be used instead of TinySlot
 * @export
 * @class BigSlot
 * @implements {IPartitionable}
 */
export class BigSlot implements IPartitionable {
    public readonly PartitionKey: number;
    public readonly State: number[ /*7 multiply numberOfWeeks*/ ];
    public readonly SlotNumber: number;
    public HashIds: number[];

    public constructor(s: ISlot) {
        this.PartitionKey = s.SubjectCode * 10 + s.Type;
        this.SlotNumber = s.SlotNumber;
        this.HashIds = [];
        this.HashIds.push(s.HashId);
        this.State = this.GetState(s);
    }
    private GetState(s: ISlot): number[] {
        let result = [];
        const weekBinary = s.Week.toString(2);
        const state = [0, 0, 0, 0, 0, 0, 0];
        state[s.Day - 1] = s.TimePeriod;
        for (let i = weekBinary.length - 1; i >= 0; i--) {
            if (weekBinary[i] === "1") {
                result = result.concat(state.slice());
            } else {
                result = result.concat([0, 0, 0, 0, 0, 0, 0]);
            }
        }
        return result;
    }

}
