import { Colors } from "../../react/colors/colors";

export enum BoxKind {
  DefinitelyOccupied,
  DefinitelyUnoccupied,
  MaybeOccupied,
  Clicked,
}

/**
 * STCBox means SetTimeConstraintBox. It is used by SetTimeConstraintView
 * @export
 * @class STCBox
 */
export class STCBox {
  public readonly Uid: string;
  public Kind: BoxKind;
  public readonly Day: number;
  public readonly TimePeriod: number; // in binary
  public readonly X: number; // X coordinate
  public constructor(
    kind: BoxKind,
    day: number,
    timeperiod: number,
    x: number
  ) {
    this.Uid = "";
    this.Kind = kind;
    this.Day = day;
    this.TimePeriod = timeperiod;
    this.X = x;
    if (x !== null && day !== null) {
      this.Uid = day.toString() + x.toString();
    }
  }
}

export const ColorOfDefinitelyOccupied = Colors.DarkRed;
export const ColorOfDefinitelyUnoccupied = Colors.DarkGrey;
export const ColorOfMaybeOccupied = Colors.LightGreen;
export const ColorOfClicked = Colors.LightBlue;
