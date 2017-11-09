export enum StateKind {
    DefinitelyOccupied,
    DefinitelyUnoccupied,
    MaybeOccupied,
    Clicked
}

export class State {
    private static nextUid = 0;
    public readonly Uid: number;
    public readonly Kind: StateKind;
    public readonly Day: number;
    public readonly TimePeriod: number; // in binary
    public readonly X: number; // X coordinate
    public constructor(kind: StateKind, day: number, timeperiod: number, x: number) {
        this.Uid = State.nextUid++;
        this.Kind = kind;
        this.Day = day;
        this.TimePeriod = timeperiod;
        this.X = x;
    }
}
