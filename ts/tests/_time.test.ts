import {
    expect,
} from "chai";
import {
    Time,
} from "../att/time";

describe("time", () => {
    it("Test Equal() 1", () => {
        // arrange
        const input1 = Time.CreateTime24Hour(10, 10);
        const input2 = Time.CreateTime24Hour(10, 10);
        expect(input1.Equal(input2)).to.equal(true);
    });

    it("Test Equal() 2", () => {
        // arrange
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

    it("Test Factory() 1", () => {
        const t = Time.CreateTime12Hour(12, 0, true);
        expect(t.Hour === 12).to.equal(true);
    });

    it("Test Factory() 2", () => {
        const t = Time.CreateTime12Hour(1 , 0 , true);
        expect(t.Hour === 13).to.equal(true);
    });

    it("Test Factory() 3", () => {
        const t = Time.CreateTime12Hour(1 , 0 , false);
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
        const expected = Time.CreateTime24Hour(13 , 0);
        const actual = Time.Parse(input);
        expect(actual.Equal(expected)).to.equal(true);
    });

    it("Test Parse() 3", () => {
        const input = "1:30 PM";
        const expected = Time.CreateTime24Hour(13 , 30);
        const actual = Time.Parse(input);
        expect(actual.Equal(expected)).to.equal(true);
    });

    it("Test Parse() 4", () => {
        const input = "12:00 PM";
        const expected = Time.CreateTime24Hour(12 , 0);
        const actual = Time.Parse(input);
        expect(actual.Equal(expected)).to.equal(true);
    });

    it("Test Parse() 5", () => {
        const input = "12:00 AM";
        const expected = Time.CreateTime24Hour(0 , 0);
        const actual = Time.Parse(input);
        expect(actual.Equal(expected)).to.equal(true);
    });
});
