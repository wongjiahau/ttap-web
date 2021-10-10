import { IGroupedTimetable } from "../groupedTimetable";
import { BoxKind, STCBox } from "./stcBox";

export function Filter(
  timetables: IGroupedTimetable[],
  box: STCBox
): [IGroupedTimetable[], IGroupedTimetable[]] {
  if (box.Kind !== BoxKind.MaybeOccupied) {
    throw new Error(
      "Only box that is MaybeOccupied can call the Filter function"
    );
  }
  const filtrate: IGroupedTimetable[] = [];
  const residue: IGroupedTimetable[] = [];
  for (let i = 0; i < timetables.length; i++) {
    const t = timetables[i];
    if ((t.DayTimeMatrix[box.Day] & box.TimePeriod) === 0) {
      filtrate.push(t);
    } else {
      residue.push(t);
    }
  }
  return [filtrate, residue];
}
