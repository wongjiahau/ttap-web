import { IRawSlot, RawSlot } from "./rawSlot";

export interface ISlotViewModel {
  Uid: number; // unique for every slots
  SlotNumber: number; // not unique for every slots
  CurrentChoice: number; // zero-based index
  SubjectCode: string;
  SubjectName: string;
  Type: string;
  Group: string[];
  ClassMode: string;
  Day: string;
  TimePeriod: string;
  CreditHour?: string;
  WeekNumber: string[];
  Room: string[];
  /** This property is to be populated by FindAlternativeSlotsOfCurrentSlots action */
  AlternativeSlots: AlternativeSlot[];

  /** If this is defined, that means that this slot is an alternative slot */
  SourceSlotUid: number | undefined;
  IsLocked: boolean;
}

export interface AlternativeSlot {
  slot: ISlotViewModel;
  destinationTimetableIndex: number;
  destinationTimetableSubIndex: number;
}

export function CreateSlotViewModel(rawSlot: RawSlot): ISlotViewModel {
  return {
    Uid: rawSlot.Uid,
    SlotNumber: parseInt(rawSlot.Number, 10),
    CurrentChoice: 0,
    SubjectCode: rawSlot.SubjectCode,
    SubjectName: rawSlot.SubjectName,
    Type: rawSlot.Type,
    Group: rawSlot.Group.split("/"),
    ClassMode: rawSlot.ClassMode || "",
    Day: rawSlot.Day,
    TimePeriod: rawSlot.TimePeriod,
    CreditHour: rawSlot.CreditHour,
    WeekNumber: rawSlot.WeekNumber.split("/"),
    Room: rawSlot.Room.split("/"),
    AlternativeSlots: [],
    SourceSlotUid: undefined,
    IsLocked: false,
  };
}

export function CreateSlotViewModels(rawSlots: RawSlot[]): ISlotViewModel[] {
  return rawSlots.map(CreateSlotViewModel);
}

export function FromSlotViewModelToRawSlot(s: ISlotViewModel): RawSlot {
  return {
    Uid: s.Uid,
    Number: s.SlotNumber.toString(),
    SubjectCode: s.SubjectCode,
    SubjectName: s.SubjectName,
    Type: s.Type,
    Group: s.Group.join("/"),
    Day: s.Day,
    TimePeriod: s.TimePeriod,
    WeekNumber: s.WeekNumber.join("/"),
    Room: s.Room.join("/"),
    CreditHour: s.CreditHour,
  };
}
