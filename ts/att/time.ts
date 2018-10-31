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
        return Time.CreateTime24Hour(hour, minute);
    }

    public static CreateTimeFrom12Hour(numbers: string, amOrpm: string): Time {
        const tokens = numbers.split(":");
        let hour = parseInt(tokens[0], 10);
        const minute = parseInt(tokens[1], 10);

        if (amOrpm.toLowerCase() === "pm" && hour !== 12) {
            hour += 12;
        }
        if (amOrpm.toLowerCase() === "am" && hour === 12) {
            hour = 0;
        }

        return Time.CreateTime24Hour(hour, minute);
    }

    public static CreateTimeFrom12Hour_2(hour: number, minute: number, isPm: boolean): Time {
        if (hour < 1 || hour > 12) {
            throw RangeError("Expected value is between 1 to 12, but actual is {hour}");
        }
        if (isPm && hour !== 12) {
            hour += 12;
        }
        if (!isPm && hour === 12) {
            hour = 0;
        }
        return Time.CreateTime24Hour(hour, minute);
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
        if (this.MoreThan(other)) {
            return false;
        }
        if (this.Equal(other)) {
            return false;
        }
        return true;
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

    public LessThanOrEqual(other: Time): boolean {
        return this.LessThan(other) || this.Equal(other);
    }

    public MoreThanOrEqual(other: Time): boolean {
        return this.MoreThan(other) || this.Equal(other);
    }

    public Minus(other: Time): TimeSpan {
        if (this.LessThan(other)) {
            throw new RangeError(`${this.To12HourFormat(true)} is less than ${other.To12HourFormat(true)}, so a cannot be subtracted by b`);
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

    public To12HourFormat(withAmOrPmLabel: boolean = true): string {
        let temp = this.Hour > 12 ? this.Hour - 12 : this.Hour;
        if (temp === 0) {
            temp = 12;
        }
        const hour = temp < 10 ? " " + temp : temp.toString();
        const minute = (this.Minute < 10 ? "0" : "") + this.Minute;
        let amOrPm = "";
        if (withAmOrPmLabel) {
            amOrPm = this.Hour >= 12 ? "PM" : "AM";
        }
        return `${hour}:${minute} ${amOrPm}`;
    }

    public StringValue(): string {
        return this.To12HourFormat(true);
    }
}
