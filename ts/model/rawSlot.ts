import { Identifiable } from "./../interfaces/identifiable";
export interface IRawSlot extends Identifiable {
    Uid: number; // Unique for every slot object
    SubjectCode: string;
    SubjectName: string;
    Number: string; // Slot number, which is not necessarily unique for every slot
    Type: string;
    Group: string;
    ClassSize ? : string;
    ClassMode ? : string;
    Day: string;
    TimePeriod: string;
    CreditHour ? : string;
    WeekNumber: string;
    Room: string;
    Remark ? : string;
}

export class RawSlot implements IRawSlot {
    public static ResetUid(s: RawSlot): IRawSlot {
        s.Uid = RawSlot.nextUid++;
        return s;
    }
    private static nextUid = 0;
    public Uid: number; // Unique for every slot object
    public SubjectCode: string;
    public SubjectName: string;
    public Number: string; // Slot number, which is not necessarily unique for every slot

    /**
     * Type of this slot, whether it's lecture, tutorial, practical or etc.
     * Example values: `"L"`, `"T"`, `"P"`
     */
    public Type: string;
    public Group: string;
    public ClassSize ? : string;
    public ClassMode ? : string;
    public Day: string;
    public TimePeriod: string;
    public CreditHour ? : string;
    public WeekNumber: string;
    public Room: string;
    public Remark ? : string;
    constructor() {
        this.Uid = RawSlot.nextUid++;
        this.SubjectCode = "";
        this.SubjectName = "";
        this.Number = "";
        this.Type = "";
        this.Group = "";
        this.TimePeriod = "";
        this.Day = "";
        this.WeekNumber = "";
        this.Room = "";
    }
}
