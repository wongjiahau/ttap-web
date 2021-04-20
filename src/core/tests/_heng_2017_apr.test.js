"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const parseRawSlotToSubject_1 = require("../parser/parseRawSlotToSubject");
const getInitial_1 = require("../util/getInitial");
const heng_2017_apr_1 = require("./testData/heng_2017_apr");
describe("heng_2017_apr", () => {
    describe("IndexOf", () => {
        it("case 1", () => {
            const rawSlots = heng_2017_apr_1.HENG_2017_APR();
            const subjects = parseRawSlotToSubject_1.ParseRawSlotToSubject(rawSlots);
            const subjectNameInitials = subjects.map((x) => getInitial_1.GetInitial(x.Name));
            const indexDic = {};
            subjectNameInitials.forEach((name, index) => {
                indexDic[name] = index;
                indexDic[index] = name;
            });
            chai_1.expect(indexDic).to.deep.eq(heng_2017_apr_1.IndexOf);
        });
    });
});
//# sourceMappingURL=_heng_2017_apr.test.js.map