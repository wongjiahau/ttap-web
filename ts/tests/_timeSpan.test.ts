import {
    expect,
} from "chai";
import {
    TimeSpan,
} from "../att/timeSpan";

describe("timespan", () => {
    it("Test TimeSpan 1", () => {
        const input1 = new TimeSpan(2, 30, 0);
        const input2 = 9000;
        expect(input1.totalSeconds === input2).to.equal(true);
    });

    it("Test TimeSpan Hours()", () => {
        const input1 = new TimeSpan(2, 30, 0);
        const input2 = 2;
        expect(input1.hours() === input2).to.equal(true);
    });

    it("Test TimeSpan Minutes()", () => {
        const input1 = new TimeSpan(2, 30, 0);
        const input2 = 30;
        expect(input1.minutes() === input2).to.equal(true);
    });

    it("Test TimeSpan Seconds()", () => {
        const input1 = new TimeSpan(2, 30, 59);
        const input2 = 59;
        expect(input1.seconds() === input2).to.equal(true);
    });

    it("Test TimeSpan Equal()", () => {
        const input1 = new TimeSpan(2, 30, 40);
        const input2 = new TimeSpan(2, 30, 40);
        expect(input1.Equal(input2)).to.equal(true);
    });
});
