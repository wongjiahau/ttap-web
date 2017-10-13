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
});
