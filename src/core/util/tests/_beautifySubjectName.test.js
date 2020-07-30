"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const beautifySubjectName_1 = require("../beautifySubjectName");
describe("BeautifySubjectName()", () => {
    it("should convert AND to &", () => {
        const result = beautifySubjectName_1.BeautifySubjectName("ARTS AND CULTURAL PERFORMANCE");
        chai_1.expect(result).to.equal("Arts & Cultural Performance");
    });
    it("should capitalize every word ", () => {
        const result = beautifySubjectName_1.BeautifySubjectName("MALAYSIAN STUDIES 3 (FOR INTERNATIONAL STUDENTS)");
        chai_1.expect(result).to.equal("Malaysian Studies 3 (for International Students)");
    });
    it("should convert DAN to & ", () => {
        const result = beautifySubjectName_1.BeautifySubjectName("Ali dan Abu");
        chai_1.expect(result).to.equal("Ali & Abu");
    });
    it("should preserve Roman numerals (case 1)", () => {
        const result = beautifySubjectName_1.BeautifySubjectName("SEJARAH II");
        chai_1.expect(result).to.eq("Sejarah II");
    });
    it("should preserve Roman numerals (case 2)", () => {
        const result = beautifySubjectName_1.BeautifySubjectName("SEJARAH III");
        chai_1.expect(result).to.eq("Sejarah III");
    });
});
//# sourceMappingURL=_beautifySubjectName.test.js.map