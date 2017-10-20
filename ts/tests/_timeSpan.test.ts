import {
    expect,
} from "chai";
import {
    TimeSpan,
} from "../att/timeSpan";

describe("time", () => {
    it("Test TimeSpan 1", () => {
        // arrange
        const input1 = new TimeSpan(2, 30, 0);
        const input2 = 9000;
        expect(input1.totalSeconds === input2).to.equal(true);
    });
});
