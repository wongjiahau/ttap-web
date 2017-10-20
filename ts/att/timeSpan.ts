export class TimeSpan {

    public totalSeconds: number;

    public constructor(hours: number, minutes: number, seconds: number) {
        if (hours < 0 || minutes < 0 || seconds < 0) {throw RangeError; }
        this.totalSeconds = seconds + (hours * 60 + minutes) * 60;
    }

    public hours(): number {
        return this.totalSeconds / 3600;
    }

    public minutes(): number {
        return this.totalSeconds / 60;
    }

    public seconds(): number {
        return this.totalSeconds ;
    }
}
