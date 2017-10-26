export class TimeSpan {

    public totalSeconds: number;

    public constructor(hours: number, minutes: number, seconds: number) {
        if (hours < 0 || minutes < 0 || seconds < 0) {
            throw RangeError;
        }
        this.totalSeconds = seconds + (hours * 60 + minutes) * 60;
    }

    public hours(): number {
        const numberOfSecondsPerHour = 3600;
        return Math.floor(this.totalSeconds / numberOfSecondsPerHour);
    }

    public minutes(): number {
        const numberOfSecondsPerHour = 3600;
        const numberOfSecondsPerMinute = 60;
        return Math.floor(this.totalSeconds % numberOfSecondsPerHour / numberOfSecondsPerMinute);
    }

    public seconds(): number {
        const numberOfSecondsPerMinute = 60;
        return this.totalSeconds % numberOfSecondsPerMinute;
    }

    public Equal(other: TimeSpan): boolean {
        if (this.totalSeconds !== other.totalSeconds) {
            return false;
        }
        return true;
    }
}
