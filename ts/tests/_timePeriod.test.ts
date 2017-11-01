import {
    expect,
} from "chai";
import {
    Time,
} from "../att/time";
import {
    TimePeriod,
} from "../att/timePeriod";

describe("time period", () => {

    it("Test TimePeriod Equal() 1", () => {
        const input1 = new TimePeriod();
        const input2 = new TimePeriod();
        expect(input1.Equal(input2)).to.equal(true);
    });

    it("Test TimePeriod Equal() 2", () => {
        const input1 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(8 , 0) , Time.CreateTime24Hour(10 , 0));
        const input2 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(8 , 0) , Time.CreateTime24Hour(10 , 0));
        expect(input1.Equal(input2)).to.equal(true);
    });

    it("Test TimePeriod Equal() 3", () => {
        const input1 = new TimePeriod();
        const input2 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(0 , 0) , Time.CreateTime24Hour(0 , 0));
        expect(input1.Equal(input2)).to.equal(true);
    });

    it("Test TimePeriod Equal() 4", () => {
        const input1 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(8 , 0) , Time.CreateTime24Hour(10 , 0));
        const input2 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(8 , 0) , Time.CreateTime24Hour(0 , 0));
        expect(input1.Equal(input2)).to.equal(false);
    });

    it("Test TimePeriod Equal() 5", () => {
        const input1 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(9 , 0) , Time.CreateTime24Hour(10 , 0));
        const input2 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(9 , 10) , Time.CreateTime24Hour(10 , 0));
        expect(input1.Equal(input2)).to.equal(false);
    });

    it("Test TimePeriod Equal() 6", () => {
        const input1 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(7 , 0) , Time.CreateTime24Hour(10 , 0));
        const input2 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(9 , 0) , Time.CreateTime24Hour(10 , 0));
        expect(input1.Equal(input2)).to.equal(false);
    });

    it("Test TimePeriod GetDuplicate() 1", () => {
        const input1 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(7 , 0) , Time.CreateTime24Hour(10 , 0));
        const input2 = input1.GetDuplicate();
        expect(input1.Equal(input2)).to.equal(true);
    });

    it("Test TimePeriod GetDuplicate() 2", () => {
        const input1 = new TimePeriod();
        const input2 = input1.GetDuplicate();
        expect(input1.Equal(input2)).to.equal(true);
    });

    it("Test TimePeriod Intersect() 1", () => {
        const input1 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(8 , 0) , Time.CreateTime24Hour(10 , 0));
        const input2 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(8 , 0) , Time.CreateTime24Hour(10 , 0));
        expect(input1.IntersectWith(input2)).to.equal(true);
    });

    it("Test TimePeriod Intersect() 2", () => {
        const input1 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(8 , 0) , Time.CreateTime24Hour(10 , 0));
        const input2 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(7 , 0) , Time.CreateTime24Hour(9 , 0));
        expect(input1.IntersectWith(input2)).to.equal(true);
    });

    it("Test TimePeriod Intersect() 3", () => {
        const input1 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(8 , 0) , Time.CreateTime24Hour(10 , 0));
        const input2 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(9 , 0) , Time.CreateTime24Hour(11 , 0));
        expect(input1.IntersectWith(input2)).to.equal(true);
    });

    it("Test TimePeriod Intersect() 4", () => {
        const input1 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(8 , 0) , Time.CreateTime24Hour(10 , 0));
        const input2 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(7 , 0) , Time.CreateTime24Hour(11 , 0));
        expect(input1.IntersectWith(input2)).to.equal(true);
    });

    it("Test TimePeriod Intersect() 5", () => {
        const input1 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(8 , 0) , Time.CreateTime24Hour(10 , 0));
        const input2 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(8 , 30) , Time.CreateTime24Hour(9 , 30));
        expect(input1.IntersectWith(input2)).to.equal(true);
    });

    it("Test TimePeriod Intersect() 6", () => {
        const input1 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(8 , 0) , Time.CreateTime24Hour(10 , 0));
        const input2 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(9 , 0) , Time.CreateTime24Hour(11 , 0));
        expect(input1.IntersectWith(input2)).to.equal(true);
    });

    it("Test TimePeriod Intersect() 7", () => {
        const input1 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(8, 0), Time.CreateTime24Hour(10, 0));
        const input2 = TimePeriod.CreateTimePeriod(Time.CreateTime24Hour(10 , 0) , Time.CreateTime24Hour(12 , 0));
        expect(input1.IntersectWith(input2)).to.equal(false);
    });

    it("Test TimePeriod Intersect() 8", () => {
        const time1 = "08:30 AM - 1:00 PM";
        const time2 = "1:00 PM - 2:00 PM";
        const input1 = TimePeriod.Parse(time1);
        const input2 = TimePeriod.Parse(time2);
        expect(input1.IntersectWith(input2)).to.equal(false);
    });

    it("Test TimePeriod Intersect() 9", () => {
        const time1 = "9:30 AM - 12:00 PM";
        const time2 = "11:00 AM - 1:00 PM";
        const input1 = TimePeriod.Parse(time1);
        const input2 = TimePeriod.Parse(time2);
        expect(input1.IntersectWith(input2)).to.equal(true);
    });
});
