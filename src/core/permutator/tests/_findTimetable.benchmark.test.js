"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const concat = require("lodash.concat");
const uniq = require("lodash.uniq");
const parseRawSlotToSlot_1 = require("../../parser/parseRawSlotToSlot");
const parseSlotToTinySlot_1 = require("../../parser/parseSlotToTinySlot");
const heng_2017_apr_1 = require("../../tests/testData/heng_2017_apr");
const findTimetable_1 = require("../findTimetable");
// This is to test FindTimetable using serious test case
const input = concat(heng_2017_apr_1.HENG_2017_APR().filter((x) => x.SubjectCode === heng_2017_apr_1.CodeOf.H), // Hydrology
heng_2017_apr_1.HENG_2017_APR().filter((x) => x.SubjectCode === heng_2017_apr_1.CodeOf.SA2), // Structural Analysis II
heng_2017_apr_1.HENG_2017_APR().filter((x) => x.SubjectCode === heng_2017_apr_1.CodeOf.HT), // Highway Transportation
heng_2017_apr_1.HENG_2017_APR().filter((x) => x.SubjectCode === heng_2017_apr_1.CodeOf.FM2), // Fluid Mechanic II
heng_2017_apr_1.HENG_2017_APR().filter((x) => x.SubjectCode === heng_2017_apr_1.CodeOf.ITBS));
const tinySlots = parseSlotToTinySlot_1.ParseSlotToTinySlot(parseRawSlotToSlot_1.ParseRawSlotToSlot(input));
describe("FindTimetable", () => {
    describe("using TinySlot", () => {
        it("case 1", () => {
            const result = findTimetable_1.FindTimetable(parseSlotToTinySlot_1.ParseSlotToTinySlot(parseRawSlotToSlot_1.ParseRawSlotToSlot(input)));
            chai_1.expect(result).to.have.lengthOf(285696);
        });
    });
});
//# sourceMappingURL=_findTimetable.benchmark.test.js.map