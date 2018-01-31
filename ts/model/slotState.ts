import { IRawSlot, RawSlot } from "./rawSlot";

export interface ISlotState {
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

export function CreateSlotState(rawSlot: RawSlot): ISlotState {
    const group = rawSlot.Group.split("/");
    return {
        Uid:            rawSlot.Uid,
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

export function CreateSlotStates(rawSlots: RawSlot[]): ISlotState[] {
    return rawSlots.map(CreateSlotState);
}
