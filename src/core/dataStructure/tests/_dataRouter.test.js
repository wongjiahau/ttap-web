"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const dataRouter_1 = require("../dataRouter");
describe("DataRouter", () => {
    describe("GetCurrentData", () => {
        it("should throw error if route is not set yet", () => {
            const x = new dataRouter_1.DataRouter();
            x.AddData("apple", 3);
            chai_1.expect(() => x.GetCurrentData()).to.throw();
        });
    });
    describe("AddData", () => {
        it("should add data to its dictionary", () => {
            const x = new dataRouter_1.DataRouter();
            x.AddData("apple", 3);
            x.SetRouteTo("apple");
            chai_1.expect(x.GetCurrentData()).to.eq(3);
        });
        it("should throw error if the label passed in already existed", () => {
            const x = new dataRouter_1.DataRouter();
            x.AddData("apple", 3);
            chai_1.expect(() => x.AddData("apple", 99)).to.throw();
        });
    });
    describe("SetRouteTo", () => {
        it("case 1", () => {
            const x = new dataRouter_1.DataRouter();
            x.AddData("apple", 99);
            x.AddData("banana", 33);
            x.SetRouteTo("apple");
            chai_1.expect(x.GetCurrentData()).to.eq(99);
            x.SetRouteTo("banana");
            chai_1.expect(x.GetCurrentData()).to.eq(33);
        });
        it("should throw error if the route-to-be-set does not exist", () => {
            const x = new dataRouter_1.DataRouter();
            x.AddData("apple", 99);
            chai_1.expect(() => x.SetRouteTo("coconut")).to.throw();
        });
    });
    describe("GetDataFrom", () => {
        it("should return undefined if the label points to nothing", () => {
            const x = new dataRouter_1.DataRouter();
            x.AddData("apple", 99);
            chai_1.expect(x.GetDataFrom("banana")).to.eq(undefined);
        });
    });
    describe("GetCurrentRoute", () => {
        it("should return the current route", () => {
            const x = new dataRouter_1.DataRouter();
            x.AddData("apple", 99);
            x.SetRouteTo("apple");
            chai_1.expect(x.GetCurrentRoute()).to.eq("apple");
        });
    });
});
//# sourceMappingURL=_dataRouter.test.js.map