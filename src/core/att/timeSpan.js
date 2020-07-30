"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TimeSpan {
    constructor(hours, minutes, seconds) {
        if (hours < 0 || minutes < 0 || seconds < 0) {
            throw RangeError;
        }
        this.TotalSeconds = seconds + (hours * 60 + minutes) * 60;
    }
    Hours() {
        const numberOfSecondsPerHour = 3600;
        return Math.floor(this.TotalSeconds / numberOfSecondsPerHour);
    }
    Minutes() {
        const numberOfSecondsPerHour = 3600;
        const numberOfSecondsPerMinute = 60;
        return Math.floor(this.TotalSeconds % numberOfSecondsPerHour / numberOfSecondsPerMinute);
    }
    Seconds() {
        const numberOfSecondsPerMinute = 60;
        return this.TotalSeconds % numberOfSecondsPerMinute;
    }
    TotalMinutes() {
        return this.TotalSeconds / 60;
    }
    TotalHours() {
        return this.TotalMinutes() / 60;
    }
    Equal(other) {
        if (this.TotalSeconds !== other.TotalSeconds) {
            return false;
        }
        return true;
    }
}
exports.TimeSpan = TimeSpan;
//# sourceMappingURL=timeSpan.js.map