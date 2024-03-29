import { IRawSlot, RawSlot } from "../model/rawSlot";
const clone = require("lodash.clone");

/**
 * This function will generalize slots that have the same Day, Group, Time, Type and SubjectCode.
 * However, it will not generalize slos that have relatives
 *  Assumptions:
 *  - All slots that have relatives have the same Slot.Number
 *  - Two slots are consider relatives if they have the same SubjectCode, Type and Group
 *  Purpose:
 *  - To reduce search space of FindTimetable function
 * @export
 * @param {RawSlot[]} slots
 * @returns {RawSlot[]}
 */
export function GeneralizeSlot(originalSlots: RawSlot[]): RawSlot[] {
  const slots = originalSlots.map(clone) as IRawSlot[];
  const results = new Array<RawSlot>();
  results.push(slots[0]);
  let generalized: boolean;
  for (let i = 1; i < slots.length; i++) {
    const s = slots[i];
    if (slots.some((x) => x.Number === s.Number && x.Uid !== s.Uid)) {
      results.push(s);
      continue;
    }
    generalized = false;
    for (let j = 0; j < results.length; j++) {
      const r = results[j];
      if (CanBeGeneralize(s, r)) {
        if (results.some((x) => x.Number === r.Number && x.Uid !== r.Uid)) {
          continue;
        }
        r.Number += "/" + s.Number;
        r.Group += "/" + s.Group;
        r.WeekNumber += "/" + s.WeekNumber;
        r.Room += "/" + s.Room;
        generalized = true;
        break;
      }
    }
    if (!generalized) {
      results.push(s);
    }
  }
  return results;
}

export function CanBeGeneralize(x: RawSlot, y: RawSlot): boolean {
  return (
    x.SubjectCode === y.SubjectCode &&
    x.Type === y.Type &&
    x.Day === y.Day &&
    x.TimePeriod === y.TimePeriod
  );
}
