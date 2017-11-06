export class RawSlot {
    private static hash   = 0;
    public readonly HashId: number; // Unique for every slot object
    public SubjectCode:     string;
    public SubjectName:     string;
    public Number:          string; // Slot number, which is not necessarily unique for every slot
    public Type:            string;
    public Group:           string;
    public ClassSize:       string;
    public Day:             string;
    public TimePeriod:      string;
    public CreditHour:      string;
    public WeekNumber:      string;
    public Remark:          string;
    public Room:            string;
    constructor() {
        this.HashId = RawSlot.hash;
        RawSlot.hash++;

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
    Remark      : ${this.Remark}
    Room        : ${this.Room}
`;

    }
}
