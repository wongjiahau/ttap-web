"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const getInitial_1 = require("../getInitial");
describe("GetInitial()", () => {
    it("should return the initial of every word", () => {
        const result = getInitial_1.GetInitial("Community Project");
        chai_1.expect(result).to.equal("CP");
    });
    it("should ignore AMPERSAND(&) symbol", () => {
        const result = getInitial_1.GetInitial("Community & Project");
        chai_1.expect(result).to.equal("CP");
    });
    it("should ignore COMMA(,) symbol", () => {
        const result = getInitial_1.GetInitial("Ali, Baby Chow");
        chai_1.expect(result).to.equal("ABC");
    });
    it("should ignore words inside brackets", () => {
        const result = getInitial_1.GetInitial("Pew Die Pie (Pew pew!)");
        chai_1.expect(result).to.equal("PDP");
    });
    it("should ignore conjunctive words like 'AND'", () => {
        const result = getInitial_1.GetInitial("Ali and Boy");
        chai_1.expect(result).to.equal("AB");
    });
    it("should convert roman numeral to arabic numeral - 1", () => {
        const result = getInitial_1.GetInitial("Structural Analysis I");
        chai_1.expect(result).to.equal("SA1");
    });
    it("should convert roman numeral to arabic numeral - 2", () => {
        const result = getInitial_1.GetInitial("Structural Analysis II");
        chai_1.expect(result).to.equal("SA2");
    });
    it("should convert roman numeral to arabic numeral - 3", () => {
        const result = getInitial_1.GetInitial("Tamadun Islam");
        chai_1.expect(result).to.equal("TI");
    });
});
//# sourceMappingURL=_getInitials.test.js.map