"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const stcBox_1 = require("../stcBox");
describe("box", () => {
    describe("constructor", () => {
        it("should set Uid based on X and Day arguments", () => {
            const x = 1;
            const day = 0;
            const box = new stcBox_1.STCBox(0, day, 0, x);
            chai_1.expect(box.Uid).to.eq("01");
        });
    });
});
//# sourceMappingURL=_box.test.js.map