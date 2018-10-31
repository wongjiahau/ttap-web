import { IRawSlot, RawSlot } from "./rawSlot";

export interface ISlotViewModel {
    Uid: number; // unique for every slots
    SlotNumber: number; // not unique for every slots
    CurrentChoice: number; // zero-based index
    SubjectCode: string;
    SubjectName: string;
    Type: string;
    Group: string[];
    Day: string;
    TimePeriod: string;
    WeekNumber: string[];
    Room: string[];
    AlternativeSlots: ISlotViewModel[]; // This property is to be populated by FindAlternativeSlotsOfCurrentSlots action
    IsAlternativeSlot: boolean;
}

export function CreateSlotViewModel(rawSlot: RawSlot): ISlotViewModel {
    const group = rawSlot.Group.split("/");
    return {
        Uid:              rawSlot.Uid,
        SlotNumber:       parseInt(rawSlot.Number, 10),
        CurrentChoice:    0,
        SubjectCode:      rawSlot.SubjectCode,
        SubjectName:      rawSlot.SubjectName,
        Type:             rawSlot.Type,
        Group:            group,
        Day:              rawSlot.Day,
        TimePeriod:       rawSlot.TimePeriod,
        WeekNumber:       rawSlot.WeekNumber.split("/"),
        Room:             rawSlot.Room.split("/"),
        AlternativeSlots: [],
        IsAlternativeSlot: false
    };
}

export function CreateSlotViewModels(rawSlots: RawSlot[]): ISlotViewModel[] {
    return rawSlots.map(CreateSlotViewModel);
}
