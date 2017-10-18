export class Time {

    public static CreateTime24Hour(hour: number, minute: number): Time {
        return new Time(hour, minute);
    }

    public static CreateTime12Hour(hour: number, minute: number, isPm: boolean): Time {
        if (hour < 1 || hour > 12) {throw new RangeError("Expected value is between 1 to 12, but actual is {hour}"); }
        if (isPm && hour !== 12) {hour += 12; }
        if (!isPm && hour === 12) {hour = 0; }
        const t = Time.CreateTime24Hour(hour, minute);
        return t;
    }

    public static Parse(input: string): Time {
        // let result = new Time();
        // no constructor with that takes no-parameter, hence the codes are modified compared to Time.cs
        const tokens = input.split(" ");
        const time = tokens[0].trim();
        const amOrPm = tokens[1].trim().toLowerCase();
        const timeTokens = time.split(":");
        let hour = parseInt(timeTokens[0], 10);
        const minute = parseInt(timeTokens[1], 10);
        if (amOrPm === "pm" && hour !== 12) {hour += 12; }
        if (amOrPm === "am" && hour === 12) {hour = 0; }
        return Time.CreateTime24Hour(hour, minute);
    }

    public Hour: number;
    public Minute: number;

    private constructor(hour: number, minute: number) {
        this.Hour = hour;
        this.Minute = minute;
    }

    public Equal(other: Time): boolean {
        if (this.Hour !== other.Hour) {
            return false;
        }
        if (this.Minute !== other.Minute) {
            return false;
        }
        return true;
    }

    public LessThan(other: Time): boolean {
        if (this.Hour < other.Hour) {return true; }
        if (this.Hour > other.Hour) {return false; }
        if (this.Minute < other.Minute) {return true; }
        return false;
    }

    public MoreThan(other: Time): boolean {
        if (this.Hour > other.Hour) {return true; }
        if (this.Hour < other.Hour) {return false; }
        if (this.Minute > other.Minute) {return true; }
        return false;
    }
}
