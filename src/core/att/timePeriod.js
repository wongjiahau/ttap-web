"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const time_1 = require("./time");
class TimePeriod {
    constructor(startTime, endTime) {
        if (startTime.LessThan(TimePeriod.Min)) {
            TimePeriod.Min = startTime;
        }
        if (endTime.MoreThan(TimePeriod.Max)) {
            TimePeriod.Max.Hour = endTime.Hour + (endTime.Minute > 0 ? 1 : 0);
        }
        this.StartTime = startTime;
        this.EndTime = endTime;
        this.BinaryData = TimePeriod.GenerateBinaryForm(this);
    }
    static GetNumberOfHalfHours() {
        const NUMBER_OF_HALF_HOURS_PER_HOUR = 2;
        return this.Max.Minus(this.Min).TotalHours() * NUMBER_OF_HALF_HOURS_PER_HOUR;
    }
    static SetMinTo8am() {
        this.Min = time_1.Time.CreateTime12Hour(8, 0, false);
    }
    static Parse(data) {
        const tokens = data.split("-");
        const startTime = tokens[0].trim();
        const endTime = tokens[1].trim();
        return new TimePeriod(time_1.Time.Parse(startTime), time_1.Time.Parse(endTime));
    }
    static GenerateBinaryForm(t) {
        const MinutesInHalfHour = 30;
        const HowManyHalfHourPerHour = 2;
        const maxWidth = TimePeriod.GetNumberOfHalfHours();
        const width = t
            .EndTime
            .Minus(t.StartTime)
            .TotalMinutes() / MinutesInHalfHour;
        let startIndex = (t.StartTime.Hour - TimePeriod.Min.Hour) * 2;
        if (t.StartTime.Minute === 30) {
            startIndex++;
        }
        const stringForm = [];
        for (let i = 0; i < maxWidth; i++) {
            stringForm.push("0");
        }
        for (let i = startIndex; i < startIndex + width; i++) {
            stringForm[i] = "1";
        }
        const result = parseInt(stringForm.reverse().join(""), 2);
        return result;
    }
    Equal(other) {
        if (!this.EndTime.Equal(other.EndTime)) {
            return false;
        }
        if (!this.StartTime.Equal(other.StartTime)) {
            return false;
        }
        return true;
    }
    GetDuplicate() {
        return new TimePeriod(this.StartTime, this.EndTime);
    }
    IntersectWith(other) {
        return (this.BinaryData & other.BinaryData) > 0;
        // if (this.StartTime.MoreThanOrEqual(other.EndTime)) {
        //     return false;
        // }
        // if (this.EndTime.LessThanOrEqual(other.StartTime)) {
        //     return false;
        // }
        // return true;
    }
    GetStartTimeInIsoFormat() {
        return this.pad(this.StartTime.Hour) + ":" + this.pad(this.StartTime.Minute);
    }
    GetEndTimeInIsoFormat() {
        return this.pad(this.EndTime.Hour) + ":" + this.pad(this.EndTime.Minute);
    }
    pad(n) {
        // pad numbers with leading zeros if it is less than 10
        return (n < 10) ? ("0" + n) : n.toString();
    }
}
TimePeriod.Max = time_1.Time.CreateTime12Hour(1, 0, true);
TimePeriod.Min = time_1.Time.CreateTime12Hour(11, 0, true);
exports.TimePeriod = TimePeriod;
//# sourceMappingURL=timePeriod.js.map