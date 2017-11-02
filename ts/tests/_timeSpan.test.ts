import {
    expect,
} from "chai";
import {
    TimeSpan,
} from "../att/timeSpan";

describe("timespan", () => {
    it("Test 1", () => {
        const input1 = new TimeSpan(2, 30, 0);
        const input2 = 9000;
        expect(input1.TotalSeconds === input2).to.equal(true);
    });

    it("Test Hours()", () => {
        const input1 = new TimeSpan(2, 30, 0);
        const input2 = 2;
        expect(input1.Hours() === input2).to.equal(true);
    });

    it("Test Minutes()", () => {
        const input1 = new TimeSpan(2, 30, 0);
        const input2 = 30;
        expect(input1.Minutes() === input2).to.equal(true);
    });

    it("Test Seconds()", () => {
        const input1 = new TimeSpan(2, 30, 59);
        const input2 = 59;
        expect(input1.Seconds() === input2).to.equal(true);
    });

    it("Test Equal()", () => {
        const input1 = new TimeSpan(2, 30, 40);
        const input2 = new TimeSpan(2, 30, 40);
        expect(input1.Equal(input2)).to.equal(true);
    });

    it("Test TotalMinutes() 1", () => {
        const input1 = new TimeSpan(2, 30, 0);
        expect(input1.TotalMinutes()).to.eq(150);
    });

    it("Test TotalMinutes() 2", () => {
        const input1 = new TimeSpan(0, 0, 30);
        expect(input1.TotalMinutes()).to.eq(0.5);
    });

    it("Test TotalHours() 1", () => {
        const input1 = new TimeSpan(2, 0, 0);
        expect(input1.TotalHours()).to.eq(2);
    });

    it("Test TotalHours() 2", () => {
        const input1 = new TimeSpan(2, 30, 0);
        expect(input1.TotalHours()).to.eq(2.5);
    });

});
