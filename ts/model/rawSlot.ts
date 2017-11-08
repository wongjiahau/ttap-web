export class RawSlot {
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
                throw new Error(hashIds + "does not matches any HashId of any slot");
            }
            result.push(matched[0]);
        }
        return result;
    }

    private static hash = 0;
    private static allRawSlots: RawSlot[] = [];
    public readonly HashId: number; // Unique for every slot object
    public SubjectCode: string;
    public SubjectName: string;
    public Number: string; // Slot number, which is not necessarily unique for every slot
    public Type: string;
    public Group: string;
    public ClassSize: string;
    public Day: string;
    public TimePeriod: string;
    public CreditHour: string;
    public WeekNumber: string;
    public Room: string;
    public Remark: string;
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
