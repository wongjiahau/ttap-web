"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const boundedInt_1 = require("../boundedInt");
const generateIndices_1 = require("../generateIndices");
describe("GenerateIndices", () => {
    it("case 1", () => {
        const input = [
            [0],
            [0, 0],
            [0, 0, 0]
        ];
        const actual = generateIndices_1.GenerateIndices(input);
        const expected = [
            new boundedInt_1.BoundedInt(0, 0),
            new boundedInt_1.BoundedInt(1, 0),
            new boundedInt_1.BoundedInt(2, 0)
        ];
        for (let i = 0; i < 3; i++) {
            chai_1.expect(actual[i].Equals(expected[i])).to.eq(true);
        }
    });
    it("case 2", () => {
        const input = [
            [0, 0, 0],
            [0, 0],
            [0]
        ];
        const actual = generateIndices_1.GenerateIndices(input);
        const expected = [
            new boundedInt_1.BoundedInt(2, 0),
            new boundedInt_1.BoundedInt(1, 0),
            new boundedInt_1.BoundedInt(0, 0)
        ];
        for (let i = 0; i < 3; i++) {
            chai_1.expect(actual[i].Equals(expected[i])).to.eq(true);
        }
    });
});
//# sourceMappingURL=_generateIndices.test.js.map