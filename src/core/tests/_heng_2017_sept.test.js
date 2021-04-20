"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const parseRawSlotToSubject_1 = require("../parser/parseRawSlotToSubject");
const getInitial_1 = require("../util/getInitial");
const heng_2017_sept_1 = require("./testData/heng_2017_sept");
describe("heng_2017_sept", () => {
    describe("IndexOf", () => {
        it("case 1", () => {
            const rawSlots = heng_2017_sept_1.heng_2017_sept();
            const subjects = parseRawSlotToSubject_1.ParseRawSlotToSubject(rawSlots);
            const subjectNameInitials = subjects.map((x) => getInitial_1.GetInitial(x.Name));
            const indexDic = {};
            subjectNameInitials.forEach((name, index) => {
                indexDic[name] = index;
                indexDic[index] = name;
            });
            chai_1.expect(indexDic).to.deep.eq(heng_2017_sept_1.IndexOf);
        });
    });
});
//# sourceMappingURL=_heng_2017_sept.test.js.map