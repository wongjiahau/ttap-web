"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const week_1 = require("../week");
describe("week", () => {
    it("Test IntersectWith 1", () => {
        const w1 = new week_1.Week([1, 2, 3, 4, 5]);
        const w2 = new week_1.Week([5, 6, 7, 8, 9]);
        chai_1.expect(w1.IntersectWith(w2)).to.eq(true);
    });
    it("Test IntersectWith 2", () => {
        const w1 = new week_1.Week([1, 3, 5, 7, 9]);
        const w2 = new week_1.Week([2, 4, 6, 8, 10]);
        chai_1.expect(w1.IntersectWith(w2)).to.eq(false);
    });
    it("Test IntersectWith 3", () => {
        const w1 = new week_1.Week([6, 8]);
        const w2 = new week_1.Week([4, 3]);
        chai_1.expect(w1.IntersectWith(w2)).to.eq(false);
    });
    it("Test IntersectWith 4", () => {
        const w1 = new week_1.Week([1, 3, 5, 7, 11, 13]);
        const w2 = new week_1.Week([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);
        chai_1.expect(w1.IntersectWith(w2)).to.eq(true);
    });
    it("Test IntersectWith 5", () => {
        const w1 = new week_1.Week([1, 2, 3, 4, 5, 6, 7]);
        const w2 = new week_1.Week([7, 8, 9, 10, 11, 12, 13, 14]);
        chai_1.expect(w1.IntersectWith(w2)).to.eq(true);
    });
    it("Test Parse 1", () => {
        const input = "3,5,7,9,11,13";
        const expected = new week_1.Week([3, 5, 7, 9, 11, 13]);
        const actual = week_1.Week.Parse(input);
        chai_1.expect(actual.Equals(expected)).to.eq(true);
    });
    it("Test Parse 2", () => {
        const input = "1-5";
        const expected = new week_1.Week([1, 2, 3, 4, 5]);
        const actual = week_1.Week.Parse(input);
        chai_1.expect(actual.Equals(expected)).to.eq(true);
    });
    it("Test Parse 3", () => {
        const input = "1-3,7-9";
        const expected = new week_1.Week([1, 2, 3, 7, 8, 9]);
        const actual = week_1.Week.Parse(input);
        chai_1.expect(actual.Equals(expected)).to.eq(true);
    });
    it("Test Parse 4", () => {
        const input = "1-3,7-9,11,13";
        const expected = new week_1.Week([1, 2, 3, 7, 8, 9, 11, 13]);
        const actual = week_1.Week.Parse(input);
        chai_1.expect(actual.Equals(expected)).to.eq(true);
    });
    it("Test Parse 5", () => {
        const input5 = "1-3,4,5,11-14";
        const expected5 = new week_1.Week([1, 2, 3, 4, 5, 11, 12, 13, 14]);
        const actual5 = week_1.Week.Parse(input5);
        chai_1.expect(actual5.Equals(expected5)).to.eq(true);
    });
    describe("BinaryData", () => {
        it("case 1", () => {
            const input = "1-14";
            const result = week_1.Week.Parse(input).BinaryData;
            chai_1.expect(result.toString(2)).to.eq("11111111111111");
        });
        it("case 2", () => {
            const input = "2,6";
            const result = week_1.Week.Parse(input).BinaryData;
            chai_1.expect(result.toString(2)).to.eq("100010");
        });
    });
});
//# sourceMappingURL=_week.test.js.map