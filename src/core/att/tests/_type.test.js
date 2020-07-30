"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const type_1 = require("../type");
describe("ParseType", () => {
    it("should throw error if passed in stirng other than L/T/P", () => {
        chai_1.expect(() => {
            type_1.ParseType("Q");
        }).to.throw();
    });
});
//# sourceMappingURL=_type.test.js.map