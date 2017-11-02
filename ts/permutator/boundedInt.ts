export class BoundedInt {
    public UpperLimit: number;
    public Value: number;

    public constructor(upperLimit: number, value: number) {
        this.UpperLimit = upperLimit;
        this.Value = value;
    }

    public Duplicate(): BoundedInt {
        return new BoundedInt(this.UpperLimit, this.Value);
    }

    public Equals(other: BoundedInt): boolean {
        return this.Value === other.Value && this.UpperLimit === other.UpperLimit;
    }

    public ToString(): string {
        return `UpperLimit : ${this.UpperLimit}, Value : ${this.Value}`;
    }
}
