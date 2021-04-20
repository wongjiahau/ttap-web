"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const day_1 = require("../day");
describe("day parser", () => {
    it("test 1", () => {
        const input = "Mon";
        chai_1.expect(day_1.ParseDay(input)).to.eq(1);
    });
    it("test 2", () => {
        const input = "Tue";
        chai_1.expect(day_1.ParseDay(input)).to.eq(2);
    });
    it("test 3", () => {
        const input = "Wed";
        chai_1.expect(day_1.ParseDay(input)).to.eq(3);
    });
    it("test 4", () => {
        const input = "Thu";
        chai_1.expect(day_1.ParseDay(input)).to.eq(4);
    });
    it("test 5", () => {
        const input = "Fri";
        chai_1.expect(day_1.ParseDay(input)).to.eq(5);
    });
    it("test 6", () => {
        const input = "Sat";
        chai_1.expect(day_1.ParseDay(input)).to.eq(6);
    });
    it("test 7", () => {
        const input = "Sun";
        chai_1.expect(day_1.ParseDay(input)).to.eq(7);
    });
});
//# sourceMappingURL=_day.test.js.map