import { IRawSlot, RawSlot } from "./rawSlot";

export interface IGeneralizedSlot {
    Uid: number; //
    CurrentChoice: number; // zero-based index
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
    const group = rawSlot.Group.split("/");
    return {
        Uid:            rawSlot.HashId,
        CurrentChoice: 0,
        SubjectCode:   rawSlot.SubjectCode,
        SubjectName:   rawSlot.SubjectName,
        Type:          rawSlot.Type,
        Group:         group,
        Day:           rawSlot.Day,
        TimePeriod:    rawSlot.TimePeriod,
        WeekNumber:    rawSlot.WeekNumber.split("/"),
        Room:          rawSlot.Room.split("/")
    };
}

export function CreateGeneralizedSlots(rawSlots: RawSlot[]): IGeneralizedSlot[] {
    return rawSlots.map(CreateGeneralizedSlot);
}
