"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const colorhash_1 = require("../colorhash");
const subjectCodesOfAprilFesSlots_1 = require("./subjectCodesOfAprilFesSlots");
const uniq = require("lodash.uniq");
describe("customHash()", () => {
    it("customHashFunction should generate unique integer for every subject code", () => {
        const subjectCodes = subjectCodesOfAprilFesSlots_1.subjectCodesOfAprilFesSlots;
        const hashes = subjectCodes.map(colorhash_1.customHashFunction);
        chai_1.expect(hashes).to.have.lengthOf(uniq(hashes).length);
    });
    it("ColorHash should generate unique rgb for every subject code", () => {
        const subjectCodes = subjectCodesOfAprilFesSlots_1.subjectCodesOfAprilFesSlots;
        const numbers = [];
        for (let i = 1; i < 999; i++) {
            numbers.push(i);
        }
        const result = numbers.map((p) => {
            const hs = subjectCodes.map((x) => colorhash_1.ColorHash(x, p, false));
            return {
                seed: p,
                diff: hs.length - uniq(hs).length
            };
        });
        const seedThatResultedInTheLeastHashesDuplicates = result.sort((a, b) => a.diff - b.diff)[0].seed;
        console.log(seedThatResultedInTheLeastHashesDuplicates);
        const hashes = subjectCodes.map((x) => colorhash_1.ColorHash(x, seedThatResultedInTheLeastHashesDuplicates, false));
        const numberOfDuplicates = hashes.length - uniq(hashes).length;
        chai_1.expect(numberOfDuplicates).to.be.lessThan(2);
    });
});
//# sourceMappingURL=_colorhash.test.js.map