import Slot from "./rawSlot";
export class Subject {
    public readonly Name: string;
    public readonly Code: string;
    public readonly SlotIds: number[];
    public IsSelected: boolean;
    public IsVisible : boolean;
    constructor(name: string, code: string, slotIds: number[]) {
        this.Name = name;
        this.Code = code;
        this.SlotIds = slotIds;
        this.IsSelected = false;
        this.IsVisible = true;
    }
}
