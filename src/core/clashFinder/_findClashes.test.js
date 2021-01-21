"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const objectStore_1 = require("../dataStructure/objectStore");
const parseRawSlotToSubject_1 = require("../parser/parseRawSlotToSubject");
const heng_2017_apr_1 = require("../tests/testData/heng_2017_apr");
const testDataGenerator_1 = require("../tests/testDataGenerator");
const findClashes_1 = require("./findClashes");
const testSlots = testDataGenerator_1.GetTestRawSlot1();
const rawSlotStore = new objectStore_1.ObjectStore(testSlots);
const testSubjects = () => parseRawSlotToSubject_1.ParseRawSlotToSubject(testSlots);
function get(subjectCode, subjects) {
    return subjects.filter((x) => x.Code === subjectCode)[0];
}
describe("FindClashes()", () => {
    it("should throw error when input length is less than 2", () => {
        const subjects = testSubjects();
        const acp = get(heng_2017_apr_1.CodeOf.ACP, subjects);
        chai_1.expect(() => {
            findClashes_1.FindClashes([acp], rawSlotStore);
        }).to.throw();
    });
    it("should mutate the input's ClasingCounterpart property only", () => {
        const subjects = testSubjects();
        const acp = get(heng_2017_apr_1.CodeOf.ACP, subjects);
        const bka = get(heng_2017_apr_1.CodeOf.BKA, subjects);
        const selectedSubjects = [acp, bka];
        const originalAcp = JSON.parse(JSON.stringify(acp));
        findClashes_1.FindClashes(selectedSubjects, rawSlotStore);
        const mutatedAcp = JSON.parse(JSON.stringify(acp));
        chai_1.expect(mutatedAcp).to.not.deep.eq(originalAcp);
        delete originalAcp.ClashingCounterparts;
        delete mutatedAcp.ClashingCounterparts;
        chai_1.expect(mutatedAcp).to.deep.eq(originalAcp);
    });
    it("should not duplicate clashing counterparts", () => {
        const subjects = testSubjects();
        const acp = get(heng_2017_apr_1.CodeOf.ACP, subjects);
        const bka = get(heng_2017_apr_1.CodeOf.BKA, subjects);
        const selectedSubjects = [acp, bka];
        findClashes_1.FindClashes(selectedSubjects, rawSlotStore);
        chai_1.expect(acp.ClashingCounterparts.length).to.eq(1);
        chai_1.expect(bka.ClashingCounterparts.length).to.eq(1);
        // Find clashes again
        findClashes_1.FindClashes(selectedSubjects, rawSlotStore);
        chai_1.expect(acp.ClashingCounterparts.length).to.eq(1);
        chai_1.expect(bka.ClashingCounterparts.length).to.eq(1);
    });
    it("case 1", () => {
        const subjects = testSubjects();
        const acp = get(heng_2017_apr_1.CodeOf.ACP, subjects);
        const bka = get(heng_2017_apr_1.CodeOf.BKA, subjects);
        const selectedSubjects = [acp, bka];
        findClashes_1.FindClashes(selectedSubjects, rawSlotStore);
        chai_1.expect(acp.ClashingCounterparts).to.include(bka.Code);
        chai_1.expect(bka.ClashingCounterparts).to.include(acp.Code);
    });
    it("case 2", () => {
        const subjects = testSubjects();
        const acp = get(heng_2017_apr_1.CodeOf.ACP, subjects);
        const bka = get(heng_2017_apr_1.CodeOf.BKA, subjects);
        const bmk = get(heng_2017_apr_1.CodeOf.BMK2, subjects);
        const selectedSubjects = [acp, bka, bmk];
        findClashes_1.FindClashes(selectedSubjects, rawSlotStore);
        chai_1.expect(acp.ClashingCounterparts).to.deep.eq([bka.Code]);
        chai_1.expect(bka.ClashingCounterparts).to.deep.eq([acp.Code, bmk.Code]);
        chai_1.expect(bmk.ClashingCounterparts).to.deep.eq([bka.Code]);
    });
    it("case 3", () => {
        const subjects = testSubjects();
        const acp = get(heng_2017_apr_1.CodeOf.ACP, subjects);
        const bmk = get(heng_2017_apr_1.CodeOf.BMK2, subjects);
        const selectedSubjects = [acp, bmk];
        findClashes_1.FindClashes(selectedSubjects, rawSlotStore);
        chai_1.expect(acp.ClashingCounterparts.length === 0);
        chai_1.expect(bmk.ClashingCounterparts.length === 0);
    });
});
//# sourceMappingURL=_findClashes.test.js.map