import { Identifiable } from "./../interfaces/identifiable";
export interface IRawSlot extends Identifiable {
    Uid: number; // Unique for every slot object
    SubjectCode: string;
    SubjectName: string;
    Number: string; // Slot number, which is not necessarily unique for every slot
    Type: string;
    Group: string;
    ClassSize ? : string;
    Day: string;
    TimePeriod: string;
    CreditHour ? : string;
    WeekNumber: string;
    Room: string;
    Remark ? : string;
}

export class RawSlot implements IRawSlot {
    public static hash = 0;
    public static allRawSlots: RawSlot[] = [];
    public static GetOne(Uid: number): RawSlot {
        const matched = RawSlot.allRawSlots[Uid];
        if (matched) {
            return matched;
        } else {
            return null;
        }
    }

    public static RegisterSlot(slot: IRawSlot): void {
        slot.Uid = RawSlot.hash;
        RawSlot.allRawSlots[RawSlot.hash] = slot;
        RawSlot.hash++;
    }

    public static RegisterBunchOfSlots(slots: IRawSlot[]): void {
        slots.forEach((x) => {
            RawSlot.RegisterSlot(x);
        });
    }

    public static GetBunch(Uids: number[]): RawSlot[] {
        const result = new Array < RawSlot > ();
        for (let i = 0; i < Uids.length; i++) {
            const matched = RawSlot.allRawSlots[Uids[i]];
            if (matched) {
                result.push(matched);
            } else {
                throw new Error(Uids[i] + "does not matches any Uid of any slot");
            }
        }
        return result;
    }

    public static GetBunchFromSlotNumbers(slotNumbers: string[]): RawSlot[] {
        let result: RawSlot[] = [];
        for (let i = 0; i < slotNumbers.length; i++) {
            const matchingSlots = RawSlot.allRawSlots.filter((x) => x.Number === slotNumbers[i]);
            if (matchingSlots.length === 0) {
                throw new Error(slotNumbers[i] + "does not matches any SlotNumber of any slot");
            }
            result = result.concat(matchingSlots);
        }
        return result;
    }

    public static GetRelated(Uid: number): number[] {
        const result = [];
        const matching = RawSlot.GetOne(Uid);
        for (let i = 0; i < RawSlot.allRawSlots.length; i++) {
            const slot = RawSlot.allRawSlots[i];
            if (slot.Number === matching.Number) {
                result.push(slot.Uid);
            }
        }
        return result;
    }

    public static Reset(): void {
        RawSlot.hash = 0;
        RawSlot.allRawSlots = [];
    }

    public Uid: number; // Unique for every slot object
    public SubjectCode: string;
    public SubjectName: string;
    public Number: string; // Slot number, which is not necessarily unique for every slot
    public Type: string;
    public Group: string;
    public ClassSize ? : string;
    public Day: string;
    public TimePeriod: string;
    public CreditHour ? : string;
    public WeekNumber: string;
    public Room: string;
    public Remark ? : string;
    constructor() {
        RawSlot.RegisterSlot(this);
    }
    public toString = (): string => {
        return `---
    SubjectCode : ${this.SubjectCode}
    SubjectName : ${this.SubjectName}
    Number      : ${this.Number}
    Type        : ${this.Type}
    Group       : ${this.Group}
    ClassSize   : ${this.ClassSize}
    Day         : ${this.Day}
    TimePeriod  : ${this.TimePeriod}
    CreditHour  : ${this.CreditHour}
    WeekNumber  : ${this.WeekNumber}
    Room        : ${this.Room}
    Remark      : ${this.Remark}
`;
    }

}
