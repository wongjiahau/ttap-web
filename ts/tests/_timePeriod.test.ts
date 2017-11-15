import {
    expect
} from "chai";
import {
    Time
} from "../att/time";
import {
    TimePeriod
} from "../att/timePeriod";

describe("constructor of TimePeriod", () => {
    it("should throw error if startTime is less than TimePeriod.Min", () => {
        expect(() => {
            const input = new TimePeriod(Time.CreateTime24Hour(0, 0), Time.CreateTime24Hour(10, 0));
        }).to.throw();
    });

    it("should throw error if endTime is less than TimePeriod.Max", () => {
        expect(() => {
            const input = new TimePeriod(Time.CreateTime24Hour(9, 0), Time.CreateTime24Hour(23, 0));
        }).to.throw();
    });

    it("should throw error when endTime is less than startTime", () => {
        expect(() => {
            const input = new TimePeriod(Time.CreateTime24Hour(10, 0), Time.CreateTime24Hour(9, 0));
        }).to.throw();
    });

});

describe("time period", () => {

    it("Test Equal() 1", () => {
        const input1 = new TimePeriod(Time.CreateTime24Hour(8, 0), Time.CreateTime24Hour(9, 0));
        const input2 = new TimePeriod(Time.CreateTime24Hour(8, 0), Time.CreateTime24Hour(9, 0));
        expect(input1.Equal(input2))
            .to
            .equal(true);
    });

    it("Test Equal() 2", () => {
        const input1 = new TimePeriod(Time.CreateTime24Hour(8, 0), Time.CreateTime24Hour(10, 0));
        const input2 = new TimePeriod(Time.CreateTime24Hour(8, 0), Time.CreateTime24Hour(10, 0));
        expect(input1.Equal(input2))
            .to
            .equal(true);
    });

    it("Test Equal() 4", () => {
        const input1 = new TimePeriod(Time.CreateTime24Hour(8, 0), Time.CreateTime24Hour(10, 0));
        const input2 = new TimePeriod(Time.CreateTime24Hour(8, 0), Time.CreateTime24Hour(9, 0));
        expect(input1.Equal(input2))
            .to
            .equal(false);
    });

    it("Test Equal() 5", () => {
        const input1 = new TimePeriod(Time.CreateTime24Hour(9, 0), Time.CreateTime24Hour(10, 0));
        const input2 = new TimePeriod(Time.CreateTime24Hour(9, 10), Time.CreateTime24Hour(10, 0));
        expect(input1.Equal(input2))
            .to
            .equal(false);
    });

    it("Test Equal() 6", () => {
        const input1 = new TimePeriod(Time.CreateTime24Hour(8, 0), Time.CreateTime24Hour(10, 0));
        const input2 = new TimePeriod(Time.CreateTime24Hour(9, 0), Time.CreateTime24Hour(10, 0));
        expect(input1.Equal(input2))
            .to
            .equal(false);
    });

    it("Test GetDuplicate() 1", () => {
        const input1 = new TimePeriod(Time.CreateTime24Hour(8, 0), Time.CreateTime24Hour(10, 0));
        const input2 = input1.GetDuplicate();
        expect(input1.Equal(input2))
            .to
            .equal(true);
    });

    it("Test GetDuplicate() 2", () => {
        const input1 = new TimePeriod(Time.CreateTime24Hour(8, 30), Time.CreateTime24Hour(9, 30));
        const input2 = input1.GetDuplicate();
        expect(input1.Equal(input2))
            .to
            .equal(true);
    });

    it("Test Intersect() 1", () => {
        const input1 = new TimePeriod(Time.CreateTime24Hour(8, 0), Time.CreateTime24Hour(10, 0));
        const input2 = new TimePeriod(Time.CreateTime24Hour(8, 0), Time.CreateTime24Hour(10, 0));
        expect(input1.IntersectWith(input2))
            .to
            .equal(true);
    });

    it("Test Intersect() 2", () => {
        const input1 = new TimePeriod(Time.CreateTime24Hour(8, 30), Time.CreateTime24Hour(10, 0));
        const input2 = new TimePeriod(Time.CreateTime24Hour(8, 0), Time.CreateTime24Hour(9, 0));
        expect(input1.IntersectWith(input2))
            .to
            .equal(true);
    });

    it("Test Intersect() 3", () => {
        const input1 = new TimePeriod(Time.CreateTime24Hour(8, 0), Time.CreateTime24Hour(10, 0));
        const input2 = new TimePeriod(Time.CreateTime24Hour(9, 0), Time.CreateTime24Hour(11, 0));
        expect(input1.IntersectWith(input2))
            .to
            .equal(true);
    });

    it("Test Intersect() 4", () => {
        const input1 = new TimePeriod(Time.CreateTime24Hour(9, 0), Time.CreateTime24Hour(10, 0));
        const input2 = new TimePeriod(Time.CreateTime24Hour(8, 0), Time.CreateTime24Hour(11, 0));
        expect(input1.IntersectWith(input2))
            .to
            .equal(true);
    });

    it("Test Intersect() 5", () => {
        const input1 = new TimePeriod(Time.CreateTime24Hour(8, 0), Time.CreateTime24Hour(10, 0));
        const input2 = new TimePeriod(Time.CreateTime24Hour(8, 30), Time.CreateTime24Hour(9, 30));
        expect(input1.IntersectWith(input2))
            .to
            .equal(true);
    });

    it("Test Intersect() 6", () => {
        const input1 = new TimePeriod(Time.CreateTime24Hour(8, 0), Time.CreateTime24Hour(10, 0));
        const input2 = new TimePeriod(Time.CreateTime24Hour(9, 0), Time.CreateTime24Hour(11, 0));
        expect(input1.IntersectWith(input2))
            .to
            .equal(true);
    });

    it("Test Intersect() 7", () => {
        const input1 = new TimePeriod(Time.CreateTime24Hour(8, 0), Time.CreateTime24Hour(10, 0));
        const input2 = new TimePeriod(Time.CreateTime24Hour(10, 0), Time.CreateTime24Hour(12, 0));
        expect(input1.IntersectWith(input2))
            .to
            .equal(false);
    });

    it("Test Intersect() 8", () => {
        const time1 = "08:30 AM - 1:00 PM";
        const time2 = "1:00 PM - 2:00 PM";
        const input1 = TimePeriod.Parse(time1);
        const input2 = TimePeriod.Parse(time2);
        expect(input1.IntersectWith(input2))
            .to
            .equal(false);
    });

    it("Test Intersect() 9", () => {
        const time1 = "9:30 AM - 12:00 PM";
        const time2 = "11:00 AM - 1:00 PM";
        const input1 = TimePeriod.Parse(time1);
        const input2 = TimePeriod.Parse(time2);
        expect(input1.IntersectWith(input2))
            .to
            .equal(true);
    });

    it("Test Parse() 1", () => {
        const input = "9:30 AM - 12:00 PM";
        const expected = new TimePeriod(Time.CreateTime24Hour(9, 30), Time.CreateTime24Hour(12, 0));
        const actual = TimePeriod.Parse(input);
        expect(actual.Equal(expected)).to.eq(true);
    });

    it("Test Parse() 2", () => {
        const input = "8:30 AM - 1:00 PM";
        const expected = new TimePeriod(Time.CreateTime24Hour(8, 30), Time.CreateTime24Hour(13, 0));
        const actual = TimePeriod.Parse(input);
        expect(actual.Equal(expected)).to.eq(true);
    });

    it("Test BinaryData 1", () => {
        const time = "8:00 AM - 11:00 AM";
        const input = TimePeriod.Parse(time);
        expect(input.BinaryData.toString(2)).to.eq("111111");
    });

    it("Test BinaryData 2", () => {
        const time = "9:00 AM - 11:30 AM";
        const input = TimePeriod.Parse(time);
        expect(input.BinaryData.toString(2)).to.eq("1111100");
    });

    it("Test BinaryData 3", () => {
        const time = "11:00 AM - 1:00 PM";
        const input = TimePeriod.Parse(time);
        expect(input.BinaryData.toString(2)).to.eq("1111000000");
    });

    describe("GetStarTime", () => {
        it("case 1", () => {
            const time = "11:00 AM - 1:00 PM";
            const input = TimePeriod.Parse(time);
            expect(input.GetStartTimeInIsoFormat()).to.eq("11:00");
        });

        it("case 2", () => {
            const time = "01:00 PM - 1:00 PM";
            const input = TimePeriod.Parse(time);
            expect(input.GetStartTimeInIsoFormat()).to.eq("13:00");
        });

        it("case 3", () => {
            const time = "08:00 AM - 1:00 PM";
            const input = TimePeriod.Parse(time);
            expect(input.GetStartTimeInIsoFormat()).to.eq("08:00");
        });
    });

    describe("GetEndTime", () => {
        it("case 1", () => {
            const time = "11:00 AM - 1:00 PM";
            const input = TimePeriod.Parse(time);
            expect(input.GetEndTimeInIsoFormat()).to.eq("13:00");
        });

        it("case 2", () => {
            const time = "8:00 AM - 9:00 AM";
            const input = TimePeriod.Parse(time);
            expect(input.GetEndTimeInIsoFormat()).to.eq("09:00");
        });
    });
});
