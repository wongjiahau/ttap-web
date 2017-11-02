export class TimeSpan {

    public readonly TotalSeconds: number;

    public constructor(hours: number, minutes: number, seconds: number) {
        if (hours < 0 || minutes < 0 || seconds < 0) {
            throw RangeError;
        }
        this.TotalSeconds = seconds + (hours * 60 + minutes) * 60;
    }

    public Hours(): number {
        const numberOfSecondsPerHour = 3600;
        return Math.floor(this.TotalSeconds / numberOfSecondsPerHour);
    }

    public Minutes(): number {
        const numberOfSecondsPerHour = 3600;
        const numberOfSecondsPerMinute = 60;
        return Math.floor(this.TotalSeconds % numberOfSecondsPerHour / numberOfSecondsPerMinute);
    }

    public Seconds(): number {
        const numberOfSecondsPerMinute = 60;
        return this.TotalSeconds % numberOfSecondsPerMinute;
    }

    public TotalMinutes() : number {
        return this.TotalSeconds / 60;
    }

    public TotalHours() : number {
        return this.TotalMinutes() / 60;
    }

    public Equal(other: TimeSpan): boolean {
        if (this.TotalSeconds !== other.TotalSeconds) {
            return false;
        }
        return true;
    }
}
