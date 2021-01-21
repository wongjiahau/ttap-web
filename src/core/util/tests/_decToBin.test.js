"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const decToBin_1 = require("../decToBin");
describe("DecToBin()", () => {
    it("case 1", () => {
        const input = 7;
        const result = decToBin_1.DecToBin(input, 4);
        chai_1.expect(result).to.eq("0111");
    });
    it("case 2", () => {
        const input = 255;
        const result = decToBin_1.DecToBin(input, 32);
        chai_1.expect(result).to.eq("00000000000000000000000011111111");
    });
});
//# sourceMappingURL=_decToBin.test.js.map