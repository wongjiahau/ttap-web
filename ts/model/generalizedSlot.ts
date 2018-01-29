import { IRawSlot, RawSlot } from "./rawSlot";

export interface IGeneralizedSlot {
    SubjectCode: string;
    SubjectName: string;
    Type: string;
    Group: string[];
    Day: string;
    TimePeriod: string;
    WeekNumber: string[];
    Room: string[];
}

export function CreateGeneralizedSlot(rawSlot: RawSlot): IGeneralizedSlot {
    return {
        SubjectCode: rawSlot.SubjectCode,
        SubjectName: rawSlot.SubjectName,
        Type: rawSlot.Type,
        Group: rawSlot.Group.split("/"),
        Day: rawSlot.Day,
        TimePeriod: rawSlot.TimePeriod,
        WeekNumber: rawSlot.WeekNumber.split("/"),
        Room: rawSlot.Room.split("/")
    };
}

export function CreateGeneralizedSlots(rawSlots: RawSlot[]): IGeneralizedSlot[] {
    return rawSlots.map(CreateGeneralizedSlot);
}
