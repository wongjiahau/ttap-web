"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const boundedInt_1 = require("./../boundedInt");
describe("boundedInt", () => {
    describe("constructor", () => {
        it("should not throw error", () => {
            chai_1.expect(() => {
                const x = new boundedInt_1.BoundedInt(10, 0);
            }).to.not.throw();
        });
        it("should allow client to set upperLimit and value", () => {
            const x = new boundedInt_1.BoundedInt(10, 0);
            chai_1.expect(x.UpperLimit).to.eq(10);
            chai_1.expect(x.Value).to.eq(0);
        });
    });
    describe("Equal", () => {
        it("should return true if the target have same upperLimit and value as itself", () => {
            const x = new boundedInt_1.BoundedInt(9, 8);
            const y = new boundedInt_1.BoundedInt(9, 8);
            chai_1.expect(x.Equals(y)).to.eq(true);
        });
        it("should return false if upperLimit is not same", () => {
            const x = new boundedInt_1.BoundedInt(9, 9);
            const y = new boundedInt_1.BoundedInt(8, 9);
            chai_1.expect(x.Equals(y)).to.eq(false);
        });
        it("should return false if value is not same", () => {
            const x = new boundedInt_1.BoundedInt(9, 9);
            const y = new boundedInt_1.BoundedInt(9, 8);
            chai_1.expect(x.Equals(y)).to.eq(false);
        });
    });
    describe("Duplicate", () => {
        it("should return a new duplicate which is equal to itself", () => {
            const x = new boundedInt_1.BoundedInt(10, 7);
            const y = x.Duplicate();
            chai_1.expect(x.Equals(y)).to.eq(true);
        });
        it("should return a new object", () => {
            const x = new boundedInt_1.BoundedInt(8, 7);
            const y = x.Duplicate();
            y.UpperLimit = 10;
            y.Value = 6;
            chai_1.expect(x.UpperLimit).to.eq(8);
            chai_1.expect(x.Value).to.eq(7);
        });
    });
    describe("ToString", () => {
        it("should allow client to know its Upperlimit and Value", () => {
            const x = new boundedInt_1.BoundedInt(1, 3);
            chai_1.expect(x.ToString()).to.eq("UpperLimit : 1, Value : 3");
        });
    });
});
//# sourceMappingURL=_boundedInt.test.js.map