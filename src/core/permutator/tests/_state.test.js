"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const isEqual = require("lodash.isequal");
const matrix_1 = require("../matrix");
describe("GotIntersection()", () => {
    it("should return true if got intersection", () => {
        const a = [parseInt("1111", 2), 0, 0, 0, 0, 0, 0];
        const b = [parseInt("1111", 2), 0, 0, 0, 0, 0, 0];
        chai_1.expect(matrix_1.GotIntersection(a, b)).to.eq(true);
    });
    it("should return false if don't have intersection", () => {
        const a = [parseInt("1111", 2), 0, 0, 0, 0, 0, 0];
        const b = [0, parseInt("1111", 2), 0, 0, 0, 0, 0];
        chai_1.expect(matrix_1.GotIntersection(a, b)).to.eq(false);
    });
});
describe("Append()", () => {
    it("should return number array of length 7", () => {
        const a = [0, 0, 0, 0, 0, 0, 0];
        const b = [0, 0, 0, 0, 0, 0, 0];
        chai_1.expect(matrix_1.AppendMatrix(a, b).length).to.eq(7);
    });
    it("should combine two array into one array", () => {
        const a = [15, 0, 0, 0, 0, 0, 0];
        const b = [0, 15, 0, 0, 0, 0, 0];
        const result = matrix_1.AppendMatrix(a, b);
        chai_1.expect(isEqual(result, [15, 15, 0, 0, 0, 0, 0])).to.eq(true);
    });
    it("should combine two array using bitwise-OR", () => {
        const a = [parseInt("1111", 2), 0, 0, 0, 0, 0, 0];
        const b = [parseInt("11110000", 2), 0, 0, 0, 0, 0, 0];
        const result = matrix_1.AppendMatrix(a, b);
        chai_1.expect(isEqual(result, [parseInt("11111111", 2), 0, 0, 0, 0, 0, 0])).to.eq(true);
    });
    it("shold return results which have the length of the first input", () => {
        const a = [0, 0, 0, 0, 0, 0, 0];
        const b = [0, 0, 0];
        const result = matrix_1.AppendMatrix(a, b);
        chai_1.expect(result).to.have.lengthOf(a.length);
        chai_1.expect(result).to.deep.eq(a);
        // Why is this happenning ?
        // Tips : Because any number bitwise-and with undefined equals = 0
        // E.g. (8 & undefined) will return 0
    });
});
//# sourceMappingURL=_state.test.js.map