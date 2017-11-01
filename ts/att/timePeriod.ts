import {
    Time
} from "./time";
export class TimePeriod {

    public static CreateTimePeriod(startTime: Time, endTime: Time): TimePeriod {
        const timePeriod = new TimePeriod();
        timePeriod.StartTime = startTime;
        timePeriod.EndTime = endTime;
        return timePeriod;
    }

    public static Parse(data: string): TimePeriod {
        const tokens = data.split("-");
        const startTime = tokens[0].trim();
        const endTime = tokens[1].trim();
        const result = new TimePeriod();
        result.StartTime = Time.Parse(startTime);
        result.EndTime = Time.Parse(endTime);
        return result;
    }

    public StartTime: Time;
    public EndTime: Time;

    public constructor() {
        this.StartTime = Time.CreateTime24Hour(0, 0);
        this.EndTime = Time.CreateTime24Hour(0, 0);
    }

    public Equal(other: TimePeriod): boolean {
        if (!this.EndTime.Equal(other.EndTime)) {
            return false;
        }
        if (!this.StartTime.Equal(other.StartTime)) {
            return false;
        }
        return true;
    }

    public GetDuplicate(): TimePeriod {
        const timePeriod = new TimePeriod();
        timePeriod.StartTime = this.StartTime;
        timePeriod.EndTime = this.EndTime;
        return timePeriod;
    }

    public IntersectWith(other: TimePeriod): boolean {
        if (this.StartTime.MoreThanOrEqual(other.EndTime)) {
            return false;
        }
        if (this.EndTime.LessThanOrEqual(other.StartTime)) {
            return false;
        }
        return true;
    }

    public ToConstructionString(): string {
        return `TimePeriod.CreateTimePeriod(${this.StartTime.ToConstructionString()},
        ${this.EndTime.ToConstructionString()})`;
    }

}
