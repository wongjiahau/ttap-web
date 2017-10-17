import Slot from "./rawSlot";
export default class Subject {
    public readonly Name: string;
    public readonly Code: string;
    public readonly SlotIds: number[];
    constructor(name: string, code: string, slotIds: number[]) {
        this.Name = name;
        this.Code = code;
        this.SlotIds = slotIds;
    }
}
