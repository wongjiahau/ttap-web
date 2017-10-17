import Slot from "./rawSlot";
export default class Subject {
    public readonly Name: string;
    public readonly Code: string;
    public readonly Slots: Slot[];
    constructor(name: string, code: string, slots: Slot[]) {
        this.Name = name;
        this.Code = code;
        this.Slots = slots;
    }
}
