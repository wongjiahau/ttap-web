export interface IRawSlot {
    readonly HashId: number; // Unique for every slot object
    SubjectCode: string;
    SubjectName: string;
    Number: string; // Slot number, which is not necessarily unique for every slot
    Type: string;
    Group: string;
    ClassSize?: string;
    Day: string;
    TimePeriod: string;
    CreditHour?: string;
    WeekNumber: string;
    Room: string;
    Remark?: string;
}
export class RawSlot implements IRawSlot {
    public static hash = 0;
    public static allRawSlots: RawSlot[] = [];
    public static GetOne(hashId: number): RawSlot {
        const result = RawSlot.allRawSlots.filter((x) => x.HashId === hashId);
        if (result.length > 1) {
            throw new Error("Something's wrong, each hashId should belong to one and only one slot");
        }
        if (result.length === 0) {
            return null;
        }
        return result[0];
    }

    public static GetBunch(hashIds: number[]): RawSlot[] {
        const result = new Array < RawSlot > ();
        for (let i = 0; i < hashIds.length; i++) {
            const matched = RawSlot.allRawSlots.filter((x) => x.HashId === hashIds[i]);
            if (matched.length === 0) {
                throw new Error(hashIds[i] + "does not matches any HashId of any slot");
            }
            result.push(matched[0]);
        }
        return result;
    }

    public static GetBunchFromSlotNumbers(slotNumbers: string[]): RawSlot[] {
        let result : RawSlot[] = [];
        for (let i = 0; i < slotNumbers.length; i++) {
            const matchingSlots = RawSlot.allRawSlots.filter((x) => x.Number === slotNumbers[i]);
            if (matchingSlots.length === 0) {
                throw new Error(slotNumbers[i] + "does not matches any SlotNumber of any slot");
            }
            result = result.concat(matchingSlots);
        }
        return result;
    }

    public static GetRelated(hashId: number): number[] {
        const result = [];
        const matching = RawSlot.GetOne(hashId);
        for (let i = 0; i < RawSlot.allRawSlots.length; i++) {
            const slot = RawSlot.allRawSlots[i];
            if (slot.Number === matching.Number) {
                result.push(slot.HashId);
            }
        }
        return result;
    }

    public static Reset() : void {
        RawSlot.hash = 0;
        RawSlot.allRawSlots = [];
    }

    public readonly HashId: number; // Unique for every slot object
    public SubjectCode: string;
    public SubjectName: string;
    public Number: string; // Slot number, which is not necessarily unique for every slot
    public Type: string;
    public Group: string;
    public ClassSize?: string;
    public Day: string;
    public TimePeriod: string;
    public CreditHour?: string;
    public WeekNumber: string;
    public Room: string;
    public Remark?: string;
    constructor() {
        this.HashId = RawSlot.hash;
        RawSlot.hash++;
        RawSlot.allRawSlots.push(this);
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
