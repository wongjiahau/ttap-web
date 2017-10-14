export default class Slot {
    public readonly HashId: number; // Unique for every slot object
    public readonly Uid: number; // A unique identifer for each group of slot
    public readonly SubjectCode: string;
    public readonly SubjectName: string;
    public readonly Number: string;
    public readonly Type: string;
    public readonly TimePeriod: string;
    public readonly Day: string;
    public readonly WeekNumber: string;
}
