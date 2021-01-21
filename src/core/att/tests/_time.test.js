"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const time_1 = require("../time");
const timeSpan_1 = require("../timeSpan");
describe("time", () => {
    describe("CreateTime24Hour", () => {
        it("case 1", () => {
            const time = time_1.Time.CreateTime24Hour(13, 55);
            chai_1.expect(time.Hour).to.eq(13);
            chai_1.expect(time.Minute).to.eq(55);
        });
    });
    it("Test Equal() 1", () => {
        const input1 = time_1.Time.CreateTime24Hour(10, 10);
        const input2 = time_1.Time.CreateTime24Hour(10, 10);
        chai_1.expect(input1.Equal(input2)).to.equal(true);
    });
    it("Test Equal() 2", () => {
        const input1 = time_1.Time.CreateTime24Hour(10, 10);
        const input2 = time_1.Time.CreateTime24Hour(11, 10);
        chai_1.expect(input1.Equal(input2)).to.equal(false);
    });
    it("Test Equal() 3", () => {
        const input1 = time_1.Time.CreateTime24Hour(10, 10);
        const input2 = time_1.Time.CreateTime24Hour(10, 11);
        chai_1.expect(input1.Equal(input2)).to.equal(false);
    });
    it("Test Equal() 4", () => {
        const input1 = time_1.Time.CreateTime24Hour(10, 10);
        const input2 = time_1.Time.CreateTime24Hour(11, 11);
        chai_1.expect(input1.Equal(input2)).to.equal(false);
    });
    it("Test Equal() 5", () => {
        const input1 = time_1.Time.CreateTime12Hour(12, 0, false);
        const input2 = time_1.Time.CreateTime24Hour(0, 0);
        chai_1.expect(input1.Equal(input2)).to.equal(true);
    });
    it("Test LessThan() 1", () => {
        const input1 = time_1.Time.CreateTime24Hour(10, 0);
        const input2 = time_1.Time.CreateTime24Hour(11, 0);
        chai_1.expect(input1.LessThan(input2)).to.equal(true);
    });
    it("Test LessThan() 2", () => {
        const input1 = time_1.Time.CreateTime24Hour(10, 0);
        const input2 = time_1.Time.CreateTime24Hour(10, 1);
        chai_1.expect(input1.LessThan(input2)).to.equal(true);
    });
    it("Test LessThan() 3", () => {
        const input1 = time_1.Time.CreateTime24Hour(10, 0);
        const input2 = time_1.Time.CreateTime24Hour(9, 0);
        chai_1.expect(input1.LessThan(input2)).to.equal(false);
    });
    it("Test LessThan() 4", () => {
        const input1 = time_1.Time.CreateTime24Hour(10, 0);
        const input2 = time_1.Time.CreateTime24Hour(10, 0);
        chai_1.expect(input1.LessThan(input2)).to.equal(false);
    });
    it("Test LessThan() 5", () => {
        const input1 = time_1.Time.CreateTime24Hour(10, 0);
        const input2 = time_1.Time.CreateTime24Hour(10, 0);
        chai_1.expect(input1.LessThan(input2)).to.equal(false);
    });
    it("Test LessThan() 6", () => {
        const input1 = time_1.Time.CreateTime12Hour(12, 0, false);
        const input2 = time_1.Time.CreateTime24Hour(0, 0);
        chai_1.expect(input1.LessThan(input2)).to.equal(false);
    });
    it("Test MoreThan() 1", () => {
        const input1 = time_1.Time.CreateTime24Hour(10, 0);
        const input2 = time_1.Time.CreateTime24Hour(9, 0);
        chai_1.expect(input1.MoreThan(input2)).to.equal(true);
    });
    it("Test MoreThan() 2", () => {
        const input1 = time_1.Time.CreateTime24Hour(9, 30);
        const input2 = time_1.Time.CreateTime24Hour(9, 0);
        chai_1.expect(input1.MoreThan(input2)).to.equal(true);
    });
    it("Test MoreThan() 3", () => {
        const input1 = time_1.Time.CreateTime24Hour(9, 0);
        const input2 = time_1.Time.CreateTime24Hour(10, 0);
        chai_1.expect(input1.MoreThan(input2)).to.equal(false);
    });
    it("Test MoreThan() 4", () => {
        const input1 = time_1.Time.CreateTime24Hour(9, 0);
        const input2 = time_1.Time.CreateTime24Hour(9, 30);
        chai_1.expect(input1.MoreThan(input2)).to.equal(false);
    });
    it("Test MoreThan() 5", () => {
        const input1 = time_1.Time.CreateTime24Hour(9, 0);
        const input2 = time_1.Time.CreateTime24Hour(9, 0);
        chai_1.expect(input1.MoreThan(input2)).to.equal(false);
    });
    it("Test MoreThan() 6", () => {
        const input1 = time_1.Time.CreateTime12Hour(12, 0, false);
        const input2 = time_1.Time.CreateTime24Hour(0, 0);
        chai_1.expect(input1.MoreThan(input2)).to.equal(false);
    });
    it("Test MoreThanOrEqual() 1", () => {
        const input1 = time_1.Time.CreateTime24Hour(9, 0);
        const input2 = time_1.Time.CreateTime24Hour(0, 0);
        chai_1.expect(input1.MoreThanOrEqual(input2)).to.equal(true);
    });
    it("Test MoreThanOrEqual() 2", () => {
        const input1 = time_1.Time.CreateTime24Hour(9, 0);
        const input2 = time_1.Time.CreateTime24Hour(10, 0);
        chai_1.expect(input1.MoreThanOrEqual(input2)).to.equal(false);
    });
    it("Test MoreThanOrEqual() 3", () => {
        const input1 = time_1.Time.CreateTime24Hour(9, 0);
        const input2 = time_1.Time.CreateTime24Hour(9, 0);
        chai_1.expect(input1.MoreThanOrEqual(input2)).to.equal(true);
    });
    it("Test MoreThanOrEqual() 4", () => {
        const input1 = time_1.Time.CreateTime24Hour(9, 1);
        const input2 = time_1.Time.CreateTime24Hour(9, 0);
        chai_1.expect(input1.MoreThanOrEqual(input2)).to.equal(true);
    });
    it("Test LessThanOrEqual() 1", () => {
        const input1 = time_1.Time.CreateTime24Hour(7, 0);
        const input2 = time_1.Time.CreateTime24Hour(8, 0);
        chai_1.expect(input1.LessThanOrEqual(input2)).to.equal(true);
    });
    it("Test LessThanOrEqual() 2", () => {
        const input1 = time_1.Time.CreateTime24Hour(9, 0);
        const input2 = time_1.Time.CreateTime24Hour(8, 0);
        chai_1.expect(input1.LessThanOrEqual(input2)).to.equal(false);
    });
    it("Test LessThanOrEqual() 3", () => {
        const input1 = time_1.Time.CreateTime24Hour(9, 0);
        const input2 = time_1.Time.CreateTime24Hour(9, 0);
        chai_1.expect(input1.LessThanOrEqual(input2)).to.equal(true);
    });
    it("Test Factory() 1", () => {
        const t = time_1.Time.CreateTime12Hour(12, 0, true);
        chai_1.expect(t.Hour === 12).to.equal(true);
    });
    it("Test Factory() 2", () => {
        const t = time_1.Time.CreateTime12Hour(1, 0, true);
        chai_1.expect(t.Hour === 13).to.equal(true);
    });
    it("Test Factory() 3", () => {
        const t = time_1.Time.CreateTime12Hour(1, 0, false);
        chai_1.expect(t.Hour === 1).to.equal(true);
    });
    it("Test Parse() 1", () => {
        const input = "9:00 AM";
        const expected = time_1.Time.CreateTime24Hour(9, 0);
        const actual = time_1.Time.Parse(input);
        chai_1.expect(actual.Equal(expected)).to.equal(true);
    });
    it("Test Parse() 2", () => {
        const input = "1:00 PM";
        const expected = time_1.Time.CreateTime24Hour(13, 0);
        const actual = time_1.Time.Parse(input);
        chai_1.expect(actual.Equal(expected)).to.equal(true);
    });
    it("Test Parse() 3", () => {
        const input = "1:30 PM";
        const expected = time_1.Time.CreateTime24Hour(13, 30);
        const actual = time_1.Time.Parse(input);
        chai_1.expect(actual.Equal(expected)).to.equal(true);
    });
    it("Test Parse() 4", () => {
        const input = "12:00 PM";
        const expected = time_1.Time.CreateTime24Hour(12, 0);
        const actual = time_1.Time.Parse(input);
        chai_1.expect(actual.Equal(expected)).to.equal(true);
    });
    it("Test Parse() 5", () => {
        const input = "12:00 AM";
        const expected = time_1.Time.CreateTime24Hour(0, 0);
        const actual = time_1.Time.Parse(input);
        chai_1.expect(actual.Equal(expected)).to.equal(true);
    });
    it("Test Minus() 1", () => {
        const input1 = time_1.Time.CreateTime24Hour(12, 0);
        const input2 = time_1.Time.CreateTime24Hour(9, 0);
        const actual = input1.Minus(input2);
        const expected = new timeSpan_1.TimeSpan(3, 0, 0);
        chai_1.expect(actual.Equal(expected)).to.equal(true);
    });
    it("Test Minus() 2", () => {
        const input1 = time_1.Time.CreateTime24Hour(12, 0);
        const input2 = time_1.Time.CreateTime24Hour(9, 30);
        const actual = input1.Minus(input2);
        const expected = new timeSpan_1.TimeSpan(2, 30, 0);
        chai_1.expect(actual.Equal(expected)).to.equal(true);
    });
    it("Test Minus() 3", () => {
        const input1 = time_1.Time.CreateTime24Hour(18, 0);
        const input2 = time_1.Time.CreateTime24Hour(9, 30);
        const actual = input1.Minus(input2);
        const expected = new timeSpan_1.TimeSpan(8, 30, 0);
        chai_1.expect(actual.Equal(expected)).to.equal(true);
    });
    it("Test Minus() 4", () => {
        const input1 = time_1.Time.CreateTime24Hour(0, 0);
        const input2 = time_1.Time.CreateTime24Hour(0, 0);
        const actual = input1.Minus(input2);
        const expected = new timeSpan_1.TimeSpan(0, 0, 0);
        chai_1.expect(actual.Equal(expected)).to.equal(true);
    });
    it("Test Minus() 5", () => {
        const input1 = time_1.Time.CreateTime24Hour(8, 30);
        const input2 = time_1.Time.CreateTime24Hour(11, 0);
        const actual = input2.Minus(input1);
        const expected = new timeSpan_1.TimeSpan(2, 30, 0);
        chai_1.expect(actual.Equal(expected)).to.equal(true);
    });
    it("Test Add() 1", () => {
        const input1 = time_1.Time.CreateTime24Hour(12, 10);
        const input2 = time_1.Time.CreateTime24Hour(9, 40);
        const actual = input1.Add(input2);
        const expected = time_1.Time.CreateTime24Hour(21, 50);
        chai_1.expect(actual.Equal(expected)).to.equal(true);
    });
    it("Test Add() 2", () => {
        const input1 = time_1.Time.CreateTime24Hour(12, 10);
        const input2 = time_1.Time.CreateTime24Hour(9, 55);
        const actual = input1.Add(input2);
        const expected = time_1.Time.CreateTime24Hour(22, 5);
        chai_1.expect(actual.Equal(expected)).to.equal(true);
    });
    it("Test ToConstructionString() 1", () => {
        const input1 = time_1.Time.CreateTime24Hour(12, 10);
        const actual = input1.ToConstructionString();
        const expected = "Time.CreateTime24Hour(12,10)";
        chai_1.expect(actual === expected).to.equal(true);
    });
    it("Test ToConstructionString() 2", () => {
        const input1 = time_1.Time.CreateTime24Hour(12, 30);
        const actual = input1.ToConstructionString();
        const expected = "Time.CreateTime24Hour(12,10)";
        chai_1.expect(actual === expected).to.equal(false);
    });
    it("Test To12HourFormat() 1", () => {
        const input1 = time_1.Time.CreateTime24Hour(12, 30);
        const actual = input1.To12HourFormat(true);
        const expected = "12:30 PM";
        chai_1.expect(actual === expected).to.equal(true);
    });
    it("Test To12HourFormat() 2", () => {
        const input1 = time_1.Time.CreateTime24Hour(12, 30);
        const actual = input1.To12HourFormat(false);
        const expected = "12:30 ";
        chai_1.expect(actual === expected).to.equal(true);
    });
    it("Test To12HourFormat() 3", () => {
        const input1 = time_1.Time.CreateTime24Hour(14, 30);
        const actual = input1.To12HourFormat(true);
        const expected = " 2:30 PM";
        chai_1.expect(actual === expected).to.equal(true);
    });
    it("Test To12HourFormat() 4", () => {
        const input1 = time_1.Time.CreateTime24Hour(14, 5);
        const actual = input1.To12HourFormat(true);
        const expected = " 2:05 PM";
        chai_1.expect(actual === expected).to.equal(true);
    });
    it("Test To12HourFormat() 5", () => {
        const input1 = time_1.Time.CreateTime24Hour(0, 5);
        const actual = input1.To12HourFormat(true);
        const expected = "12:05 AM";
        chai_1.expect(actual === expected).to.equal(true);
    });
    it("Test CreateTimeFrom12Hour() 1", () => {
        const input1 = time_1.Time.CreateTimeFrom12Hour("2:40", "am");
        const input2 = time_1.Time.CreateTime24Hour(2, 40);
        chai_1.expect(input1.Equal(input2)).to.equal(true);
    });
    it("Test CreateTimeFrom12Hour() 2", () => {
        const input1 = time_1.Time.CreateTimeFrom12Hour("1:40", "pm");
        const input2 = time_1.Time.CreateTime24Hour(13, 40);
        chai_1.expect(input1.Equal(input2)).to.equal(true);
    });
    it("Test CreateTimeFrom12Hour() 3", () => {
        const input1 = time_1.Time.CreateTimeFrom12Hour("12:40", "am");
        const input2 = time_1.Time.CreateTime24Hour(0, 40);
        chai_1.expect(input1.Equal(input2)).to.equal(true);
    });
    it("Test CreateTimeFrom12Hour_2() 1", () => {
        const input1 = time_1.Time.CreateTimeFrom12Hour_2(1, 40, true);
        const input2 = time_1.Time.CreateTime24Hour(13, 40);
        chai_1.expect(input1.Equal(input2)).to.equal(true);
    });
    it("Test CreateTimeFrom12Hour_2() 2", () => {
        const input1 = time_1.Time.CreateTimeFrom12Hour_2(1, 40, false);
        const input2 = time_1.Time.CreateTime24Hour(1, 40);
        chai_1.expect(input1.Equal(input2)).to.equal(true);
    });
    it("Test CreateTimeFrom12Hour_2() 3", () => {
        const input1 = time_1.Time.CreateTimeFrom12Hour_2(12, 40, false);
        const input2 = time_1.Time.CreateTime24Hour(0, 40);
        chai_1.expect(input1.Equal(input2)).to.equal(true);
    });
    it("Test StringValue() 1", () => {
        const input1 = time_1.Time.CreateTime24Hour(12, 30);
        const actual = input1.StringValue();
        const expected = "12:30 PM";
        chai_1.expect(actual === expected).to.equal(true);
    });
    it("Test StringValue() 2", () => {
        const input1 = time_1.Time.CreateTime24Hour(0, 30);
        const actual = input1.StringValue();
        const expected = "12:30 AM";
        chai_1.expect(actual === expected).to.equal(true);
    });
    it("Test StringValue() 3", () => {
        const input1 = time_1.Time.CreateTime24Hour(2, 0);
        const actual = input1.StringValue();
        const expected = " 2:00 AM";
        chai_1.expect(actual === expected).to.equal(true);
    });
});
//# sourceMappingURL=_time.test.js.map