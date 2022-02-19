import { TimePeriod } from "../../att/timePeriod";
import { DecToBin } from "../../util/decToBin";
import { Str } from "../../util/str";
import { IGroupedTimetable } from "../groupedTimetable";
import { BoxKind, STCBox } from "./stcBox";

export function GenerateTotalMatrix(
  timetables: IGroupedTimetable[],
  uidsOfClickedMatrix: string[] = []
): STCBox[] {
  const result = new Array<STCBox>();
  const definitelyOccupiedMatrix = GetDefinitelyOccupiedMatrix(timetables); // dos
  const definitelyUnoccupiedMatrix = GetDefinitelyUnoccupiedMatrix(timetables); // dus
  const maybeOccupiedMatrix = GetMaybeOccupiedMatrix(
    definitelyOccupiedMatrix,
    definitelyUnoccupiedMatrix
  ); // mos
  for (let day = 0; day < 7; day++) {
    // dos = definitelyOccupiedMatrix in binary
    const dos = definitelyOccupiedMatrix[day]
      .toString(2)
      .split("")
      .reverse()
      .join("");
    for (let j = 0; j < dos.length; j++) {
      if (dos[j] === "1") {
        const timeperiod = parseInt("1" + new Array(j + 1).join("0"), 2);
        result.push(new STCBox(BoxKind.DefinitelyOccupied, day, timeperiod, j));
      }
    }
  }
  for (let day = 0; day < 7; day++) {
    // dus = definitelyUnoccupiedMatrix in binary
    const totalNumberOfHalfHourPerDay = TimePeriod.GetNumberOfHalfHours();
    const dus = DecToBin(
      definitelyUnoccupiedMatrix[day],
      totalNumberOfHalfHourPerDay
    )
      .split("")
      .reverse()
      .join("");
    for (let j = 0; j < dus.length; j++) {
      if (dus[j] === "0") {
        const timeperiod = parseInt("1" + new Array(j + 1).join("0"), 2);
        result.push(
          new STCBox(BoxKind.DefinitelyUnoccupied, day, timeperiod, j)
        );
      }
    }
  }
  for (let day = 0; day < 7; day++) {
    // mos = maybeOccupiedMatrix in binary
    const mos = maybeOccupiedMatrix[day]
      .toString(2)
      .split("")
      .reverse()
      .join("");
    for (let j = 0; j < mos.length; j++) {
      if (mos[j] === "1") {
        const timeperiod = parseInt("1" + new Array(j + 1).join("0"), 2);
        result.push(new STCBox(BoxKind.MaybeOccupied, day, timeperiod, j));
      }
    }
  }

  for (let i = 0; i < uidsOfClickedMatrix.length; i++) {
    // change to clicked based on uidsOfClickedMatrix
    for (let j = 0; j < result.length; j++) {
      if (result[j].Uid === uidsOfClickedMatrix[i]) {
        result[j].Kind = BoxKind.Clicked;
      }
    }
  }

  return result;
}

export function GetDefinitelyOccupiedMatrix(
  timetables: IGroupedTimetable[]
): number /*7*/[] {
  const result = [-1, -1, -1, -1, -1, -1, -1];
  for (let i = 0; i < timetables.length; i++) {
    for (let j = 0; j < 7; j++) {
      result[j] &= timetables[i].DayTimeMatrix[j];
    }
  }
  return result;
}

export function GetDefinitelyUnoccupiedMatrix(
  timetables: IGroupedTimetable[]
): number /*7*/[] {
  const result = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < timetables.length; i++) {
    for (let j = 0; j < 7; j++) {
      result[j] |= timetables[i].DayTimeMatrix[j];
    }
  }
  return result;
}

export function GetMaybeOccupiedMatrix(
  definitelyOccupiedMatrix: number[],
  definitelyUnoccupiedMatrix: number[]
): number /*7*/[] {
  const result = definitelyOccupiedMatrix.slice();
  for (let i = 0; i < 7; i++) {
    result[i] ^= definitelyUnoccupiedMatrix[i];
  }
  return result;
}

export function StringifyTotalMatrix(totalMatrix: STCBox[]): string {
  const getRow = () => Array(TimePeriod.GetNumberOfHalfHours());
  const data = [
    getRow(),
    getRow(),
    getRow(),
    getRow(),
    getRow(),
    getRow(),
    getRow(),
  ];
  totalMatrix.forEach((box) => {
    data[box.Day][box.X] = box.Kind.toString();
  });
  const result = new Str(
    data
      .map((row) => {
        return row.join("");
      })
      .join("\n")
  )
    .ReplaceAll("0", "*") // * = definitely occupied
    .ReplaceAll("1", "-") // - = definitely unoccupied
    .ReplaceAll("2", "O") // O = maybe occupied
    .ReplaceAll("3", "X") // X = clicked
    .Value();
  return "\n" + result;
}
