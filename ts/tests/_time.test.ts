import {
    expect,
} from "chai";
import {
    Time,
} from "../att/time";
import {
    TimeSpan,
} from "../att/timeSpan";

describe("time", () => {
    it("Test Equal() 1", () => {
        const input1 = Time.CreateTime24Hour(10, 10);
        const input2 = Time.CreateTime24Hour(10, 10);
        expect(input1.Equal(input2)).to.equal(true);
    });

    it("Test Equal() 2", () => {
        const input1 = Time.CreateTime24Hour(10, 10);
        const input2 = Time.CreateTime24Hour(11, 10);
        expect(input1.Equal(input2)).to.equal(false);
    });

    it("Test Equal() 3", () => {
        const input1 = Time.CreateTime24Hour(10, 10);
        const input2 = Time.CreateTime24Hour(10, 11);
        expect(input1.Equal(input2)).to.equal(false);
    });

    it("Test Equal() 4", () => {
        const input1 = Time.CreateTime24Hour(10, 10);
        const input2 = Time.CreateTime24Hour(11, 11);
        expect(input1.Equal(input2)).to.equal(false);
    });

    it("Test Equal() 5", () => {
        const input1 = Time.CreateTime12Hour(12, 0, false);
        const input2 = Time.CreateTime24Hour(0, 0);
        expect(input1.Equal(input2)).to.equal(true);
    });

    it("Test LessThan() 1", () => {
        const input1 = Time.CreateTime24Hour(10, 0);
        const input2 = Time.CreateTime24Hour(11, 0);
        expect(input1.LessThan(input2)).to.equal(true);
    });

    it("Test LessThan() 2", () => {
        const input1 = Time.CreateTime24Hour(10, 0);
        const input2 = Time.CreateTime24Hour(10, 1);
        expect(input1.LessThan(input2)).to.equal(true);
    });

    it("Test LessThan() 3", () => {
        const input1 = Time.CreateTime24Hour(10, 0);
        const input2 = Time.CreateTime24Hour(9, 0);
        expect(input1.LessThan(input2)).to.equal(false);
    });

    it("Test LessThan() 4", () => {
        const input1 = Time.CreateTime24Hour(10, 0);
        const input2 = Time.CreateTime24Hour(10, 0);
        expect(input1.LessThan(input2)).to.equal(false);
    });

    it("Test LessThan() 5", () => {
        const input1 = Time.CreateTime24Hour(10, 0);
        const input2 = Time.CreateTime24Hour(10, 0);
        expect(input1.LessThan(input2)).to.equal(false);
    });

    it("Test LessThan() 6", () => {
        const input1 = Time.CreateTime12Hour(12, 0, false);
        const input2 = Time.CreateTime24Hour(0, 0);
        expect(input1.LessThan(input2)).to.equal(false);
    });

    it("Test MoreThan() 1", () => {
        const input1 = Time.CreateTime24Hour(10, 0);
        const input2 = Time.CreateTime24Hour(9, 0);
        expect(input1.MoreThan(input2)).to.equal(true);
    });

    it("Test MoreThan() 2", () => {
        const input1 = Time.CreateTime24Hour(9, 30);
        const input2 = Time.CreateTime24Hour(9, 0);
        expect(input1.MoreThan(input2)).to.equal(true);
    });

    it("Test MoreThan() 3", () => {
        const input1 = Time.CreateTime24Hour(9, 0);
        const input2 = Time.CreateTime24Hour(10, 0);
        expect(input1.MoreThan(input2)).to.equal(false);
    });

    it("Test MoreThan() 4", () => {
        const input1 = Time.CreateTime24Hour(9, 0);
        const input2 = Time.CreateTime24Hour(9, 30);
        expect(input1.MoreThan(input2)).to.equal(false);
    });

    it("Test MoreThan() 5", () => {
        const input1 = Time.CreateTime24Hour(9, 0);
        const input2 = Time.CreateTime24Hour(9, 0);
        expect(input1.MoreThan(input2)).to.equal(false);
    });

    it("Test MoreThan() 6", () => {
        const input1 = Time.CreateTime12Hour(12, 0, false);
        const input2 = Time.CreateTime24Hour(0, 0);
        expect(input1.MoreThan(input2)).to.equal(false);
    });

    it("Test MoreThanOrEqual() 1", () => {
        const input1 = Time.CreateTime24Hour(9, 0);
        const input2 = Time.CreateTime24Hour(0, 0);
        expect(input1.MoreThanOrEqual(input2)).to.equal(true);
    });

    it("Test MoreThanOrEqual() 2", () => {
        const input1 = Time.CreateTime24Hour(9, 0);
        const input2 = Time.CreateTime24Hour(10, 0);
        expect(input1.MoreThanOrEqual(input2)).to.equal(false);
    });

    it("Test MoreThanOrEqual() 3", () => {
        const input1 = Time.CreateTime24Hour(9, 0);
        const input2 = Time.CreateTime24Hour(9, 0);
        expect(input1.MoreThanOrEqual(input2)).to.equal(true);
    });

    it("Test MoreThanOrEqual() 4", () => {
        const input1 = Time.CreateTime24Hour(9, 1);
        const input2 = Time.CreateTime24Hour(9, 0);
        expect(input1.MoreThanOrEqual(input2)).to.equal(true);
    });

    it("Test LessThanOrEqual() 1", () => {
        const input1 = Time.CreateTime24Hour(7, 0);
        const input2 = Time.CreateTime24Hour(8, 0);
        expect(input1.LessThanOrEqual(input2)).to.equal(true);
    });

    it("Test LessThanOrEqual() 2", () => {
        const input1 = Time.CreateTime24Hour(9, 0);
        const input2 = Time.CreateTime24Hour(8, 0);
        expect(input1.LessThanOrEqual(input2)).to.equal(false);
    });

    it("Test LessThanOrEqual() 3", () => {
        const input1 = Time.CreateTime24Hour(9, 0);
        const input2 = Time.CreateTime24Hour(9, 0);
        expect(input1.LessThanOrEqual(input2)).to.equal(true);
    });

    it("Test Factory() 1", () => {
        const t = Time.CreateTime12Hour(12, 0, true);
        expect(t.Hour === 12).to.equal(true);
    });

    it("Test Factory() 2", () => {
        const t = Time.CreateTime12Hour(1, 0, true);
        expect(t.Hour === 13).to.equal(true);
    });

    it("Test Factory() 3", () => {
        const t = Time.CreateTime12Hour(1, 0, false);
        expect(t.Hour === 1).to.equal(true);
    });

    it("Test Parse() 1", () => {
        const input = "9:00 AM";
        const expected = Time.CreateTime24Hour(9, 0);
        const actual = Time.Parse(input);
        expect(actual.Equal(expected)).to.equal(true);
    });

    it("Test Parse() 2", () => {
        const input = "1:00 PM";
        const expected = Time.CreateTime24Hour(13, 0);
        const actual = Time.Parse(input);
        expect(actual.Equal(expected)).to.equal(true);
    });

    it("Test Parse() 3", () => {
        const input = "1:30 PM";
        const expected = Time.CreateTime24Hour(13, 30);
        const actual = Time.Parse(input);
        expect(actual.Equal(expected)).to.equal(true);
    });

    it("Test Parse() 4", () => {
        const input = "12:00 PM";
        const expected = Time.CreateTime24Hour(12, 0);
        const actual = Time.Parse(input);
        expect(actual.Equal(expected)).to.equal(true);
    });

    it("Test Parse() 5", () => {
        const input = "12:00 AM";
        const expected = Time.CreateTime24Hour(0, 0);
        const actual = Time.Parse(input);
        expect(actual.Equal(expected)).to.equal(true);
    });

    it("Test Minus() 1", () => {
        const input1 = Time.CreateTime24Hour(12, 0);
        const input2 = Time.CreateTime24Hour(9, 0);
        const actual = input1.Minus(input2);
        const expected = new TimeSpan(3, 0, 0);
        expect(actual.Equal(expected)).to.equal(true);
    });

    it("Test Minus() 2", () => {
        const input1 = Time.CreateTime24Hour(12, 0);
        const input2 = Time.CreateTime24Hour(9, 30);
        const actual = input1.Minus(input2);
        const expected = new TimeSpan(2, 30, 0);
        expect(actual.Equal(expected)).to.equal(true);
    });

    it("Test Minus() 3", () => {
        const input1 = Time.CreateTime24Hour(18, 0);
        const input2 = Time.CreateTime24Hour(9, 30);
        const actual = input1.Minus(input2);
        const expected = new TimeSpan(8, 30, 0);
        expect(actual.Equal(expected)).to.equal(true);
    });

    it("Test Minus() 4", () => {
        const input1 = Time.CreateTime24Hour(0, 0);
        const input2 = Time.CreateTime24Hour(0, 0);
        const actual = input1.Minus(input2);
        const expected = new TimeSpan(0, 0, 0);
        expect(actual.Equal(expected)).to.equal(true);
    });

    it("Test Add() 1", () => {
        const input1 = Time.CreateTime24Hour(12, 10);
        const input2 = Time.CreateTime24Hour(9, 40);
        const actual = input1.Add(input2);
        const expected = Time.CreateTime24Hour(21, 50);
        expect(actual.Equal(expected)).to.equal(true);
    });

    it("Test Add() 2", () => {
        const input1 = Time.CreateTime24Hour(12, 10);
        const input2 = Time.CreateTime24Hour(9, 55);
        const actual = input1.Add(input2);
        const expected = Time.CreateTime24Hour(22, 5);
        expect(actual.Equal(expected)).to.equal(true);
    });

    it("Test ToConstructionString() 1", () => {
        const input1 = Time.CreateTime24Hour(12, 10);
        const actual = input1.ToConstructionString();
        const expected = "Time.CreateTime24Hour(12,10)";
        expect(actual === expected).to.equal(true);
    });

    it("Test ToConstructionString() 2", () => {
        const input1 = Time.CreateTime24Hour(12, 30);
        const actual = input1.ToConstructionString();
        const expected = "Time.CreateTime24Hour(12,10)";
        expect(actual === expected).to.equal(false);
    });

    it("Test To12HourFormat() 1", () => {
        const input1 = Time.CreateTime24Hour(12, 30);
        const actual = input1.To12HourFormat(true);
        const expected = "12:30 PM";
        expect(actual === expected).to.equal(true);
    });

    it("Test To12HourFormat() 2", () => {
        const input1 = Time.CreateTime24Hour(12, 30);
        const actual = input1.To12HourFormat(false);
        const expected = "12:30 ";
        expect(actual === expected).to.equal(true);
    });

    it("Test To12HourFormat() 3", () => {
        const input1 = Time.CreateTime24Hour(14, 30);
        const actual = input1.To12HourFormat(true);
        const expected = " 2:30 PM";
        expect(actual === expected).to.equal(true);
    });

    it("Test To12HourFormat() 4", () => {
        const input1 = Time.CreateTime24Hour(14, 5);
        const actual = input1.To12HourFormat(true);
        const expected = " 2:05 PM";
        expect(actual === expected).to.equal(true);
    });

    it("Test To12HourFormat() 5", () => {
        const input1 = Time.CreateTime24Hour(0, 5);
        const actual = input1.To12HourFormat(true);
        const expected = "12:05 AM";
        expect(actual === expected).to.equal(true);
    });

    it("Test CreateTimeFrom12Hour() 1", () => {
        const input1 = Time.CreateTimeFrom12Hour("2:40", "am");
        const input2 = Time.CreateTime24Hour(2, 40);
        expect(input1.Equal(input2)).to.equal(true);
    });

    it("Test CreateTimeFrom12Hour() 2", () => {
        const input1 = Time.CreateTimeFrom12Hour("1:40", "pm");
        const input2 = Time.CreateTime24Hour(13, 40);
        expect(input1.Equal(input2)).to.equal(true);
    });

    it("Test CreateTimeFrom12Hour() 3", () => {
        const input1 = Time.CreateTimeFrom12Hour("12:40", "am");
        const input2 = Time.CreateTime24Hour(0, 40);
        expect(input1.Equal(input2)).to.equal(true);
    });

    it("Test CreateTimeFrom12Hour_2() 1", () => {
        const input1 = Time.CreateTimeFrom12Hour_2(1, 40, true);
        const input2 = Time.CreateTime24Hour(13, 40);
        expect(input1.Equal(input2)).to.equal(true);
    });

    it("Test CreateTimeFrom12Hour_2() 2", () => {
        const input1 = Time.CreateTimeFrom12Hour_2(1, 40, false);
        const input2 = Time.CreateTime24Hour(1, 40);
        expect(input1.Equal(input2)).to.equal(true);
    });

    it("Test CreateTimeFrom12Hour_2() 3", () => {
        const input1 = Time.CreateTimeFrom12Hour_2(12, 40, false);
        const input2 = Time.CreateTime24Hour(0, 40);
        expect(input1.Equal(input2)).to.equal(true);
    });

    it("Test StringValue() 1", () => {
        const input1 = Time.CreateTime24Hour(12, 30);
        const actual = input1.StringValue();
        const expected = "12:30 PM";
        expect(actual === expected).to.equal(true);
    });

    it("Test StringValue() 2", () => {
        const input1 = Time.CreateTime24Hour(0, 30);
        const actual = input1.StringValue();
        const expected = "12:30 AM";
        expect(actual === expected).to.equal(true);
    });

    it("Test StringValue() 3", () => {
        const input1 = Time.CreateTime24Hour(2, 0);
        const actual = input1.StringValue();
        const expected = " 2:00 AM";
        expect(actual === expected).to.equal(true);
    });

});
