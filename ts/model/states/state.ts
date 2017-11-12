import { Colors } from "../../react/colors/colors";

export enum StateKind {
    DefinitelyOccupied,
    DefinitelyUnoccupied,
    MaybeOccupied,
    Clicked
}

export class State {
    public readonly Uid: string;
    public Kind: StateKind;
    public readonly Day: number;
    public readonly TimePeriod: number; // in binary
    public readonly X: number; // X coordinate
    public constructor(kind: StateKind, day: number, timeperiod: number, x: number) {
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
