import { ParseDay } from "../att/day";
import { ParseType } from "../att/type";
import { TimePeriod } from "./../att/timePeriod";
import { Week } from "./../att/week";
import { RawSlot } from "./rawSlot";

export interface ISlot {
  Uid: number;
  SlotNumber: number;
  SubjectCode: number;
  SubjectName: string;
  TimePeriod: number;
  Group: number;
  Type: string;
  Day: number;
  Week: number;
}
export class Slot implements ISlot {
  public readonly Uid: number; // Auto-Generated
  public readonly SlotNumber: number;
  public readonly SubjectCode: number;
  public readonly SubjectName: string;
  public readonly TimePeriod: number;
  public readonly Group: number;
  public readonly Type: string;
  public readonly Day: number;
  public readonly Week: number;
  public constructor(
    Uid: number,
    slotNumber: number,
    subjectCode: number,
    subjectName: string,
    timePeriod: number,
    group: number,
    type: string,
    day: number,
    week: number
  ) {
    this.Uid = Uid;
    this.SlotNumber = slotNumber;
    this.SubjectCode = subjectCode;
    this.SubjectName = subjectName;
    this.TimePeriod = timePeriod;
    this.Group = group;
    this.Type = type;
    this.Day = day;
    this.Week = week;
  }
}

export function CreateSlotFromRaw(raw: RawSlot): Slot {
  const stringHash = require("string-hash");
  const Uid = raw.Uid;
  const slotNumber = parseInt(raw.Number, 10);
  const subjectCode = stringHash(raw.SubjectCode);
  const timePeriod = TimePeriod.Parse(raw.TimePeriod).BinaryData;
  const week = Week.Parse(raw.WeekNumber).BinaryData;
  const day = ParseDay(raw.Day);
  const group = parseInt(raw.Group, 10);
  return new Slot(
    Uid,
    slotNumber,
    subjectCode,
    raw.SubjectName,
    timePeriod,
    group,
    raw.Type,
    day,
    week
  );
}

export function CreateSlotFromInterface(s: ISlot): Slot {
  return new Slot(
    s.Uid,
    s.SlotNumber,
    s.SubjectCode,
    s.SubjectName,
    s.TimePeriod,
    s.Group,
    s.Type,
    s.Day,
    s.Week
  );
}
