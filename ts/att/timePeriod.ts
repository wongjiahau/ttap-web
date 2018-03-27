import {
    Time
} from "./time";
export class TimePeriod {
    public static Max = Time.CreateTime12Hour(1, 0, true);
    public static Min = Time.CreateTime12Hour(11, 0, true);
    public static GetNumberOfHalfHours(): number {
        const NUMBER_OF_HALF_HOURS_PER_HOUR = 2;
        return this.Max.Minus(this.Min).TotalHours() * NUMBER_OF_HALF_HOURS_PER_HOUR;
    }

    public static SetMinTo8am(): void {
        this.Min = Time.CreateTime12Hour(8, 0, false);
    }

    public static Parse(data: string): TimePeriod {
        const tokens = data.split("-");
        const startTime = tokens[0].trim();
        const endTime = tokens[1].trim();
        return new TimePeriod(Time.Parse(startTime), Time.Parse(endTime));
    }

    public static GenerateBinaryForm(t: TimePeriod): number {
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
        const stringForm: string[] = [];
        for (let i = 0; i < maxWidth; i++) {
            stringForm.push("0");
        }
        for (let i = startIndex; i < startIndex + width; i++) {
            stringForm[i] = "1";
        }
        const result = parseInt(stringForm.reverse().join(""), 2);
        return result;
    }

    public StartTime: Time;
    public EndTime: Time;
    public BinaryData: number;

    public constructor(startTime: Time, endTime: Time) {
        if (startTime.LessThan(TimePeriod.Min)) {
            TimePeriod.Min = startTime;
        }
        if (endTime.MoreThan(TimePeriod.Max)) {
            TimePeriod.Max = endTime;
        }
        this.StartTime = startTime;
        this.EndTime = endTime;
        this.BinaryData = TimePeriod.GenerateBinaryForm(this);
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
        return new TimePeriod(this.StartTime, this.EndTime);
    }

    public IntersectWith(other: TimePeriod): boolean {
        return (this.BinaryData & other.BinaryData) > 0;
        // if (this.StartTime.MoreThanOrEqual(other.EndTime)) {
        //     return false;
        // }
        // if (this.EndTime.LessThanOrEqual(other.StartTime)) {
        //     return false;
        // }
        // return true;
    }

    public ToConstructionString(): string {
        return `TimePeriod.CreateTimePeriod(${this
            .StartTime
            .ToConstructionString()},
        ${this
            .EndTime
            .ToConstructionString()})`;
    }

    public GetStartTimeInIsoFormat(): string {
        return this.pad(this.StartTime.Hour) + ":" + this.pad(this.StartTime.Minute);
    }

    public GetEndTimeInIsoFormat(): string {
        return this.pad(this.EndTime.Hour) + ":" + this.pad(this.EndTime.Minute);
    }

    private pad (n: number): string {
        // pad numbers with leading zeros if it is less than 10
        return (n < 10) ? ("0" + n) : n.toString();
    }
}
