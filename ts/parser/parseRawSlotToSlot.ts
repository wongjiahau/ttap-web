import { CreateSlotFromRaw, Slot } from "../model/slot";
import { RawSlot } from "./../model/rawSlot";
export function ParseRawSlotToSlot(rawSlots: RawSlot[]): Slot[] {
  const parsableRawSlots = rawSlots.filter(
    (x) => IsParsable(x) && IsReasonable(x)
  );
  return parsableRawSlots.map((x) => CreateSlotFromRaw(x));
}

export function IsParsable(rawSlot: RawSlot): boolean {
  return rawSlot.TimePeriod !== "";
}

export function IsReasonable(rawSlot: RawSlot): boolean {
  if (rawSlot.SubjectName.toLowerCase() === "industrial training") {
    return false;
  }
  return true;
}
