import { ParseType } from "../att/type";
import { Identifiable } from "../interfaces/identifiable";
import { ISlot } from "../model/slot";
import { GetInitial } from "../util/getInitial";
import { IPartitionable } from "./partitionize";

export interface IOptimizedSlot extends IPartitionable, Identifiable {
    State: number[];
    SlotNumber: number;
    SlotIds: number[];
    PartitionGroup: string; // This is required by findTimetableVisualizer
}
export class TinySlot implements IOptimizedSlot {
    public readonly PartitionKey: number;
    public readonly State: number[ /*7*/ ];
    public readonly SlotNumber: number;
    public readonly Uid: number;
    public readonly PartitionGroup: string;
    public SlotIds: number[];

    public constructor(s: ISlot) {
        this.PartitionKey = s.SubjectCode * 10 + ParseType(s.Type);
        this.SlotNumber = s.SlotNumber;
        this.Uid = s.SlotNumber;
        this.SlotIds = [];
        this.SlotIds.push(s.Uid);
        this.State = this.GetState(s);
        this.PartitionGroup = `${GetInitial(s.SubjectName)}(${s.Type})`;
    }

    private GetState(s: ISlot): number[] {
        const result = [0, 0, 0, 0, 0, 0, 0];
        result[s.Day - 1] = s.TimePeriod;
        return result;
    }

}
