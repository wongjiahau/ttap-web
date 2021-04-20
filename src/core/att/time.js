"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timeSpan_1 = require("./timeSpan");
class Time {
    static CreateTime24Hour(hour, minute) {
        return new Time(hour, minute);
    }
    static CreateTime12Hour(hour, minute, isPm) {
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
    static CreateTimeFrom12Hour(numbers, amOrpm) {
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
    static CreateTimeFrom12Hour_2(hour, minute, isPm) {
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
    static Parse(input) {
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
    constructor(hour, minute) {
        this.Hour = hour;
        this.Minute = minute;
    }
    Equal(other) {
        if (this.Hour !== other.Hour) {
            return false;
        }
        if (this.Minute !== other.Minute) {
            return false;
        }
        return true;
    }
    LessThan(other) {
        if (this.MoreThan(other)) {
            return false;
        }
        if (this.Equal(other)) {
            return false;
        }
        return true;
    }
    MoreThan(other) {
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
    LessThanOrEqual(other) {
        return this.LessThan(other) || this.Equal(other);
    }
    MoreThanOrEqual(other) {
        return this.MoreThan(other) || this.Equal(other);
    }
    Minus(other) {
        if (this.LessThan(other)) {
            throw new RangeError(`${this.To12HourFormat(true)} is less than ${other.To12HourFormat(true)}, so a cannot be subtracted by b`);
        }
        let finalHour = this.Hour - other.Hour;
        let finalMinute = this.Minute - other.Minute;
        if (finalMinute < 0) {
            finalMinute = 60 + finalMinute;
            finalHour--;
        }
        return new timeSpan_1.TimeSpan(finalHour, finalMinute, 0);
    }
    Add(other) {
        let finalMinutes = this.Minute + other.Minute;
        let finalHour = this.Hour + other.Hour;
        if (finalMinutes > 59) {
            finalHour++;
            finalMinutes %= 60;
        }
        return Time.CreateTime24Hour(finalHour, finalMinutes);
    }
    ToConstructionString() {
        return `Time.CreateTime24Hour(${this.Hour},${this.Minute})`;
    }
    To12HourFormat(withAmOrPmLabel = true) {
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
    StringValue() {
        return this.To12HourFormat(true);
    }
}
exports.Time = Time;
//# sourceMappingURL=time.js.map