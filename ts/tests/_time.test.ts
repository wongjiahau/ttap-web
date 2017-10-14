import {
    expect,
} from "chai";
import {
    Time,
} from "./time";

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
        const input1 = Time.CreateTime24Hour(10 , 0);
        const input2 = Time.CreateTime24Hour(11 , 0);
        expect(input1.LessThan(input2)).to.equal(true);
    });

    it("Test LessThan() 2", () => {
        const input1 = Time.CreateTime24Hour(10 , 0);
        const input2 = Time.CreateTime24Hour(10 , 1);
        expect(input1.LessThan(input2)).to.equal(true);
    });

    it("Test LessThan() 3", () => {
        const input1 = Time.CreateTime24Hour(10 , 0);
        const input2 = Time.CreateTime24Hour(9 , 0);
        expect(input1.LessThan(input2)).to.equal(false);
    });

    it("Test LessThan() 4", () => {
        const input1 = Time.CreateTime24Hour(10 , 0);
        const input2 = Time.CreateTime24Hour(10 , 0);
        expect(input1.LessThan(input2)).to.equal(false);
    });

    it("Test LessThan() 5", () => {
        const input1 = Time.CreateTime24Hour(10 , 0);
        const input2 = Time.CreateTime24Hour(10 , 0);
        expect(input1.LessThan(input2)).to.equal(false);
    });

    it("Test LessThan() 6", () => {
        const input1 = Time.CreateTime12Hour(12, 0, false);
        const input2 = Time.CreateTime24Hour(0 , 0);
        expect(input1.LessThan(input2)).to.equal(false);
    });

});
