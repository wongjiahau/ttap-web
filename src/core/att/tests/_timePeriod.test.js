"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const time_1 = require("../time");
const timePeriod_1 = require("../timePeriod");
describe("constructor of TimePeriod", () => {
    it("should set TimePeriod.Min if startTime is less than TimePeriod.Min", () => {
        timePeriod_1.TimePeriod.Min = time_1.Time.CreateTime12Hour(11, 0, true);
        const startTime = time_1.Time.CreateTime24Hour(0, 0);
        const endTime = time_1.Time.CreateTime24Hour(10, 0);
        const input = new timePeriod_1.TimePeriod(startTime, endTime);
        chai_1.expect(timePeriod_1.TimePeriod.Min.Equal(startTime)).to.eq(true);
    });
    it("should set TimePeriod.Max if endTime is more than TimePeriod.Max", () => {
        timePeriod_1.TimePeriod.Max = time_1.Time.CreateTime12Hour(1, 0, false);
        const startTime = time_1.Time.CreateTime24Hour(9, 0);
        const endTime = time_1.Time.CreateTime24Hour(23, 0);
        const input = new timePeriod_1.TimePeriod(startTime, endTime); // this line has side effects
        chai_1.expect(timePeriod_1.TimePeriod.Max.Equal(endTime)).to.eq(true);
    });
    it("should set TimePeriod.Max to be 1 more hour than endTime if endTime contains minutes", () => {
        timePeriod_1.TimePeriod.Max = time_1.Time.CreateTime12Hour(1, 0, false);
        const startTime = time_1.Time.CreateTime24Hour(9, 0);
        const endTime = time_1.Time.CreateTime24Hour(22, 30);
        const input = new timePeriod_1.TimePeriod(startTime, endTime); // this line has side effects (holy crap)
        chai_1.expect(timePeriod_1.TimePeriod.Max.Hour).to.eq(endTime.Hour + 1);
        chai_1.expect(timePeriod_1.TimePeriod.Max.Minute).to.not.eq(endTime.Minute);
        chai_1.expect(timePeriod_1.TimePeriod.Max.Minute).to.eq(0);
    });
    it("should throw error when endTime is less than startTime", () => {
        chai_1.expect(() => {
            const input = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(10, 0), time_1.Time.CreateTime24Hour(9, 0));
        }).to.throw();
    });
});
describe("time period", () => {
    it("Test Equal() 1", () => {
        const input1 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(8, 0), time_1.Time.CreateTime24Hour(9, 0));
        const input2 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(8, 0), time_1.Time.CreateTime24Hour(9, 0));
        chai_1.expect(input1.Equal(input2))
            .to
            .equal(true);
    });
    it("Test Equal() 2", () => {
        const input1 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(8, 0), time_1.Time.CreateTime24Hour(10, 0));
        const input2 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(8, 0), time_1.Time.CreateTime24Hour(10, 0));
        chai_1.expect(input1.Equal(input2))
            .to
            .equal(true);
    });
    it("Test Equal() 4", () => {
        const input1 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(8, 0), time_1.Time.CreateTime24Hour(10, 0));
        const input2 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(8, 0), time_1.Time.CreateTime24Hour(9, 0));
        chai_1.expect(input1.Equal(input2))
            .to
            .equal(false);
    });
    it("Test Equal() 5", () => {
        const input1 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(9, 0), time_1.Time.CreateTime24Hour(10, 0));
        const input2 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(9, 10), time_1.Time.CreateTime24Hour(10, 0));
        chai_1.expect(input1.Equal(input2))
            .to
            .equal(false);
    });
    it("Test Equal() 6", () => {
        const input1 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(8, 0), time_1.Time.CreateTime24Hour(10, 0));
        const input2 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(9, 0), time_1.Time.CreateTime24Hour(10, 0));
        chai_1.expect(input1.Equal(input2))
            .to
            .equal(false);
    });
    it("Test GetDuplicate() 1", () => {
        const input1 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(8, 0), time_1.Time.CreateTime24Hour(10, 0));
        const input2 = input1.GetDuplicate();
        chai_1.expect(input1.Equal(input2))
            .to
            .equal(true);
    });
    it("Test GetDuplicate() 2", () => {
        const input1 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(8, 30), time_1.Time.CreateTime24Hour(9, 30));
        const input2 = input1.GetDuplicate();
        chai_1.expect(input1.Equal(input2))
            .to
            .equal(true);
    });
    it("Test Intersect() 1", () => {
        const input1 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(8, 0), time_1.Time.CreateTime24Hour(10, 0));
        const input2 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(8, 0), time_1.Time.CreateTime24Hour(10, 0));
        chai_1.expect(input1.IntersectWith(input2))
            .to
            .equal(true);
    });
    it("Test Intersect() 2", () => {
        const input1 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(8, 30), time_1.Time.CreateTime24Hour(10, 0));
        const input2 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(8, 0), time_1.Time.CreateTime24Hour(9, 0));
        chai_1.expect(input1.IntersectWith(input2))
            .to
            .equal(true);
    });
    it("Test Intersect() 3", () => {
        const input1 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(8, 0), time_1.Time.CreateTime24Hour(10, 0));
        const input2 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(9, 0), time_1.Time.CreateTime24Hour(11, 0));
        chai_1.expect(input1.IntersectWith(input2))
            .to
            .equal(true);
    });
    it("Test Intersect() 4", () => {
        const input1 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(9, 0), time_1.Time.CreateTime24Hour(10, 0));
        const input2 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(8, 0), time_1.Time.CreateTime24Hour(11, 0));
        chai_1.expect(input1.IntersectWith(input2))
            .to
            .equal(true);
    });
    it("Test Intersect() 5", () => {
        const input1 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(8, 0), time_1.Time.CreateTime24Hour(10, 0));
        const input2 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(8, 30), time_1.Time.CreateTime24Hour(9, 30));
        chai_1.expect(input1.IntersectWith(input2))
            .to
            .equal(true);
    });
    it("Test Intersect() 6", () => {
        const input1 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(8, 0), time_1.Time.CreateTime24Hour(10, 0));
        const input2 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(9, 0), time_1.Time.CreateTime24Hour(11, 0));
        chai_1.expect(input1.IntersectWith(input2))
            .to
            .equal(true);
    });
    it("Test Intersect() 7", () => {
        const input1 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(8, 0), time_1.Time.CreateTime24Hour(10, 0));
        const input2 = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(10, 0), time_1.Time.CreateTime24Hour(12, 0));
        chai_1.expect(input1.IntersectWith(input2))
            .to
            .equal(false);
    });
    it("Test Intersect() 8", () => {
        const time1 = "08:30 AM - 1:00 PM";
        const time2 = "1:00 PM - 2:00 PM";
        const input1 = timePeriod_1.TimePeriod.Parse(time1);
        const input2 = timePeriod_1.TimePeriod.Parse(time2);
        chai_1.expect(input1.IntersectWith(input2))
            .to
            .equal(false);
    });
    it("Test Intersect() 9", () => {
        const time1 = "9:30 AM - 12:00 PM";
        const time2 = "11:00 AM - 1:00 PM";
        const input1 = timePeriod_1.TimePeriod.Parse(time1);
        const input2 = timePeriod_1.TimePeriod.Parse(time2);
        chai_1.expect(input1.IntersectWith(input2))
            .to
            .equal(true);
    });
    it("Test Parse() 1", () => {
        const input = "9:30 AM - 12:00 PM";
        const expected = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(9, 30), time_1.Time.CreateTime24Hour(12, 0));
        const actual = timePeriod_1.TimePeriod.Parse(input);
        chai_1.expect(actual.Equal(expected)).to.eq(true);
    });
    it("Test Parse() 2", () => {
        const input = "8:30 AM - 1:00 PM";
        const expected = new timePeriod_1.TimePeriod(time_1.Time.CreateTime24Hour(8, 30), time_1.Time.CreateTime24Hour(13, 0));
        const actual = timePeriod_1.TimePeriod.Parse(input);
        chai_1.expect(actual.Equal(expected)).to.eq(true);
    });
    it("Test BinaryData 1", () => {
        timePeriod_1.TimePeriod.Min = time_1.Time.CreateTime12Hour(7, 0, false);
        const time = "8:00 AM - 11:00 AM";
        const input = timePeriod_1.TimePeriod.Parse(time);
        chai_1.expect(input.BinaryData.toString(2)).to.eq("11111100");
    });
    it("Test BinaryData 2", () => {
        const time = "9:00 AM - 11:30 AM";
        const input = timePeriod_1.TimePeriod.Parse(time);
        chai_1.expect(input.BinaryData.toString(2)).to.eq("111110000");
    });
    it("Test BinaryData 3", () => {
        const time = "11:00 AM - 1:00 PM";
        const input = timePeriod_1.TimePeriod.Parse(time);
        chai_1.expect(input.BinaryData.toString(2)).to.eq("111100000000");
    });
    describe("GetStarTime", () => {
        it("case 1", () => {
            const time = "11:00 AM - 1:00 PM";
            const input = timePeriod_1.TimePeriod.Parse(time);
            chai_1.expect(input.GetStartTimeInIsoFormat()).to.eq("11:00");
        });
        it("case 2", () => {
            const time = "01:00 PM - 1:00 PM";
            const input = timePeriod_1.TimePeriod.Parse(time);
            chai_1.expect(input.GetStartTimeInIsoFormat()).to.eq("13:00");
        });
        it("case 3", () => {
            const time = "08:00 AM - 1:00 PM";
            const input = timePeriod_1.TimePeriod.Parse(time);
            chai_1.expect(input.GetStartTimeInIsoFormat()).to.eq("08:00");
        });
    });
    describe("GetEndTime", () => {
        it("case 1", () => {
            const time = "11:00 AM - 1:00 PM";
            const input = timePeriod_1.TimePeriod.Parse(time);
            chai_1.expect(input.GetEndTimeInIsoFormat()).to.eq("13:00");
        });
        it("case 2", () => {
            const time = "8:00 AM - 9:00 AM";
            const input = timePeriod_1.TimePeriod.Parse(time);
            chai_1.expect(input.GetEndTimeInIsoFormat()).to.eq("09:00");
        });
    });
});
//# sourceMappingURL=_timePeriod.test.js.map