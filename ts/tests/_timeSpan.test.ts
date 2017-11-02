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
        expect(input1.TotalSeconds === input2).to.equal(true);
    });

    it("Test TimeSpan Hours()", () => {
        const input1 = new TimeSpan(2, 30, 0);
        const input2 = 2;
        expect(input1.Hours() === input2).to.equal(true);
    });

    it("Test TimeSpan Minutes()", () => {
        const input1 = new TimeSpan(2, 30, 0);
        const input2 = 30;
        expect(input1.Minutes() === input2).to.equal(true);
    });

    it("Test TimeSpan Seconds()", () => {
        const input1 = new TimeSpan(2, 30, 59);
        const input2 = 59;
        expect(input1.Seconds() === input2).to.equal(true);
    });

    it("Test TimeSpan Equal()", () => {
        const input1 = new TimeSpan(2, 30, 40);
        const input2 = new TimeSpan(2, 30, 40);
        expect(input1.Equal(input2)).to.equal(true);
    });
});
