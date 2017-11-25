import {RawSlot} from "./rawSlot";
export class Subject {
    public readonly Name: string;
    public readonly Code: string;
    public readonly SlotIds: number[];
    public IsSelected: boolean;
    public IsVisible : boolean;
    public ClashingCounterparts: string[]; // subject codes of clashing counterparts
    public ClashReport: ClashReport;
    constructor(name: string, code: string, slotIds: number[]) {
        this.Name = name;
        this.Code = code;
        this.SlotIds = slotIds;
        this.IsSelected = false;
        this.IsVisible = true;
        this.ClashingCounterparts = [];
        this.ClashReport = null;
    }
}

export type ClashingType = "single" | "group";
export class ClashReport {
    public readonly TargetName: string;
    public readonly Type: ClashingType;
    public constructor(type: ClashingType, targetName: string = null) {
        this.Type = type;
        this.TargetName = targetName;
    }
}
