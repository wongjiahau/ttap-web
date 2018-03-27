import {
    expect,
} from "chai";
import {
    TimeSpan,
} from "../att/timeSpan";

describe("timespan", () => {
    describe("constructor", () => {
        it("should throw error if hours less than 0", () => {
            expect(() => {
                const input = new TimeSpan(-1, 0, 0);
            }).to.throws();
        });

        it("should throw error if minutes less than 0", () => {
            expect(() => {
                const input = new TimeSpan(0, -1, 0);
            }).to.throws();
        });

        it("should throw error if seconds less than 0", () => {
            expect(() => {
                const input = new TimeSpan(0, 0, -1);
            }).to.throws();
        });

        it("case 1", () => {
            const input1 = new TimeSpan(2, 30, 0);
            const input2 = 9000;
            expect(input1.TotalSeconds === input2).to.equal(true);
        });
    });

    describe("Hours()", () => {
        it("case 1", () => {
            const input1 = new TimeSpan(2, 30, 0);
            const input2 = 2;
            expect(input1.Hours() === input2).to.equal(true);
        });
    });

    describe("Minutes()", () => {
        it("case 1", () => {
            const input1 = new TimeSpan(2, 30, 0);
            const input2 = 30;
            expect(input1.Minutes() === input2).to.equal(true);
        });
    });

    describe("Seconds()", () => {
        it("case 1", () => {
            const input1 = new TimeSpan(2, 30, 59);
            const input2 = 59;
            expect(input1.Seconds() === input2).to.equal(true);
        });
    });

    describe("Equal()", () => {
        it("case 1", () => {
            const input1 = new TimeSpan(2, 30, 40);
            const input2 = new TimeSpan(2, 30, 40);
            expect(input1.Equal(input2)).to.equal(true);
        });
    });

    describe("TotalMinutes()", () => {
        it("case 1", () => {
            const input1 = new TimeSpan(2, 30, 0);
            expect(input1.TotalMinutes()).to.eq(150);
        });

        it("case 2", () => {
            const input1 = new TimeSpan(0, 0, 30);
            expect(input1.TotalMinutes()).to.eq(0.5);
        });
    });

    describe("TotalHours()", () => {
        it("case 1", () => {
            const input1 = new TimeSpan(2, 0, 0);
            expect(input1.TotalHours()).to.eq(2);
        });

        it("case 2", () => {
            const input1 = new TimeSpan(2, 30, 0);
            expect(input1.TotalHours()).to.eq(2.5);
        });
    });
});
