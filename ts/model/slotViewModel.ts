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
    CreditHour?: string;
    WeekNumber: string[];
    Room: string[];
    AlternativeSlots: ISlotViewModel[]; // This property is to be populated by FindAlternativeSlotsOfCurrentSlots action
    IsAlternativeSlot: boolean;
    IsLocked: boolean;
}

export function CreateSlotViewModel(rawSlot: RawSlot): ISlotViewModel {
    return {
        Uid:               rawSlot.Uid,
        SlotNumber:        parseInt(rawSlot.Number, 10),
        CurrentChoice:     0,
        SubjectCode:       rawSlot.SubjectCode,
        SubjectName:       rawSlot.SubjectName,
        Type:              rawSlot.Type,
        Group:             rawSlot.Group.split("/"),
        Day:               rawSlot.Day,
        TimePeriod:        rawSlot.TimePeriod,
        CreditHour:        rawSlot.CreditHour,
        WeekNumber:        rawSlot.WeekNumber.split("/"),
        Room:              rawSlot.Room.split("/"),
        AlternativeSlots:  [],
        IsAlternativeSlot: false,
        IsLocked:          false
    };
}

export function CreateSlotViewModels(rawSlots: RawSlot[]): ISlotViewModel[] {
    return rawSlots.map(CreateSlotViewModel);
}

export function FromSlotViewModelToRawSlot(s: ISlotViewModel): RawSlot {
    return {
        Uid:              s.Uid,
        Number:           s.SlotNumber.toString(),
        SubjectCode:      s.SubjectCode,
        SubjectName:      s.SubjectName,
        Type:             s.Type,
        Group:            s.Group.join("/"),
        Day:              s.Day,
        TimePeriod:       s.TimePeriod,
        WeekNumber:       s.WeekNumber.join("/"),
        Room:             s.Room.join("/"),
        CreditHour:       s.CreditHour
    };
}
