import { expect } from "chai";
import { ColorHash, customHashFunction } from "../colorhash";
import { subjectCodesOfAprilFesSlots } from "./subjectCodesOfAprilFesSlots";
const uniq = require("lodash.uniq");

describe("customHash()", () => {
  it("customHashFunction should generate unique integer for every subject code", () => {
    const subjectCodes = subjectCodesOfAprilFesSlots;
    const hashes = subjectCodes.map(customHashFunction);
    expect(hashes).to.have.lengthOf(uniq(hashes).length);
  });

  it("ColorHash should generate unique rgb for every subject code", () => {
    const subjectCodes = subjectCodesOfAprilFesSlots;
    const numbers = [];
    for (let i = 1; i < 999; i++) {
      numbers.push(i);
    }
    const result = numbers.map((p) => {
      const hs = subjectCodes.map((x) => ColorHash(x, p, false));
      return {
        seed: p,
        diff: hs.length - uniq(hs).length,
      };
    });

    const seedThatResultedInTheLeastHashesDuplicates = result.sort(
      (a, b) => a.diff - b.diff
    )[0].seed;
    console.log(seedThatResultedInTheLeastHashesDuplicates);

    const hashes = subjectCodes.map((x) =>
      ColorHash(x, seedThatResultedInTheLeastHashesDuplicates, false)
    );
    const numberOfDuplicates = hashes.length - uniq(hashes).length;
    expect(numberOfDuplicates).to.be.lessThan(2);
  });
});
