import {
    TimeSpan,
} from "./timeSpan";
export class Time {

    public static CreateTime24Hour(hour: number, minute: number): Time {
        return new Time(hour, minute);
    }

    public static CreateTime12Hour(hour: number, minute: number, isPm: boolean): Time {
        if (hour < 1 || hour > 12) {
            throw new RangeError("Expected value is between 1 to 12, but actual is {hour}");
        }
        if (isPm && hour !== 12) {
            hour += 12;
        }
        if (!isPm && hour === 12) {
            hour = 0;
        }
        const t = Time.CreateTime24Hour(hour, minute);
        return t;
    }

    public static Parse(input: string): Time {
        const tokens = input.split(" ");
        const time = tokens[0].trim();
        const amOrPm = tokens[1].trim().toLowerCase();
        const timeTokens = time.split(":");
        let hour = parseInt(timeTokens[0], 10);
        const minute = parseInt(timeTokens[1], 10);
        if (amOrPm === "pm" && hour !== 12) {
            hour += 12;
        }
        if (amOrPm === "am" && hour === 12) {
            hour = 0;
        }
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
        if (this.Hour < other.Hour) {
            return true;
        }
        if (this.Hour > other.Hour) {
            return false;
        }
        if (this.Minute < other.Minute) {
            return true;
        }
        return false;
    }

    public MoreThan(other: Time): boolean {
        if (this.Hour > other.Hour) {
            return true;
        }
        if (this.Hour < other.Hour) {
            return false;
        }
        if (this.Minute > other.Minute) {
            return true;
        }
        return false;
    }

    public Minus(other: Time): TimeSpan {
        if (this.LessThan(other)) {
            throw new RangeError("a is less than b, so a cannot be subtracted by b");
        }
        let finalHour = this.Hour - other.Hour;
        let finalMinute = this.Minute - other.Minute;
        if (finalMinute < 0) {
            finalMinute = 60 + finalMinute;
            finalHour--;
        }
        return new TimeSpan(finalHour, finalMinute, 0);
    }

    public Add(other: Time): Time {
        let finalMinutes = this.Minute + other.Minute;
        let finalHour = this.Hour + other.Hour;
        if (finalMinutes > 59) {
            finalHour++;
            finalMinutes %= 60;
        }
        return Time.CreateTime24Hour(finalHour, finalMinutes);
    }

    public ToConstructionString(): string {
        return `Time.CreateTime24Hour(${this.Hour},${this.Minute})`;
    }

    public To12HourFormat(withAmOrPmLabel: boolean): string {
        const temp = this.Hour > 12 ? this.Hour - 12 : this.Hour;
        const hour = temp < 10 ? " " + temp : temp.toString();
        const minute = (this.Minute < 10 ? "0" : "") + this.Minute;
        let amOrPm = "";
        if (withAmOrPmLabel) { amOrPm = this.Hour >= 12 ? "PM" : "AM"; }
        return `${hour}:${minute} ${amOrPm}`;
    }
}
