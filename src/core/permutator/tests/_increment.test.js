"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const increment_1 = require("../increment");
const boundedInt_1 = require("./../boundedInt");
describe("increment", () => {
    it("case 1", () => {
        const input = [
            new boundedInt_1.BoundedInt(1, 0),
            new boundedInt_1.BoundedInt(2, 1),
            new boundedInt_1.BoundedInt(3, 2)
        ];
        const expected = [
            new boundedInt_1.BoundedInt(1, 0),
            new boundedInt_1.BoundedInt(2, 1),
            new boundedInt_1.BoundedInt(3, 3)
        ];
        const actual = increment_1.Increment(input);
        for (let i = 0; i < 3; i++) {
            chai_1.expect(actual[i].Equals(expected[i])).to.eq(true);
        }
    });
    it("case 2", () => {
        const input = [
            new boundedInt_1.BoundedInt(1, 0),
            new boundedInt_1.BoundedInt(2, 1),
            new boundedInt_1.BoundedInt(3, 3)
        ];
        const expected = [
            new boundedInt_1.BoundedInt(1, 0),
            new boundedInt_1.BoundedInt(2, 2),
            new boundedInt_1.BoundedInt(3, 0)
        ];
        const actual = increment_1.Increment(input);
        for (let i = 0; i < 3; i++) {
            chai_1.expect(actual[i].Equals(expected[i])).to.eq(true);
        }
    });
    it("case 3", () => {
        const input = [
            new boundedInt_1.BoundedInt(1, 0),
            new boundedInt_1.BoundedInt(2, 2),
            new boundedInt_1.BoundedInt(3, 3)
        ];
        const expected = [
            new boundedInt_1.BoundedInt(1, 1),
            new boundedInt_1.BoundedInt(2, 0),
            new boundedInt_1.BoundedInt(3, 0)
        ];
        const actual = increment_1.Increment(input);
        for (let i = 0; i < 3; i++) {
            chai_1.expect(actual[i].Equals(expected[i])).to.eq(true);
        }
    });
    it("case 4", () => {
        const input = [
            new boundedInt_1.BoundedInt(1, 0),
            new boundedInt_1.BoundedInt(0, 0),
            new boundedInt_1.BoundedInt(0, 0),
        ];
        const expected = [
            new boundedInt_1.BoundedInt(1, 1),
            new boundedInt_1.BoundedInt(0, 0),
            new boundedInt_1.BoundedInt(0, 0)
        ];
        const actual = increment_1.Increment(input);
        for (let i = 0; i < 3; i++) {
            chai_1.expect(actual[i].Equals(expected[i])).to.eq(true);
        }
    });
    it("should return empty array when max value has reached", () => {
        const input = [
            new boundedInt_1.BoundedInt(1, 1)
        ];
        const result = increment_1.Increment(input);
        chai_1.expect(result).to.deep.eq([]);
    });
});
//# sourceMappingURL=_increment.test.js.map