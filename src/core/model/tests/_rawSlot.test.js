"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const rawSlot_1 = require("../rawSlot");
describe("RawSlot", () => {
    it("every RawSlot should have a unique Uid", () => {
        const rawSlot1 = new rawSlot_1.RawSlot();
        const rawSlot2 = new rawSlot_1.RawSlot();
        chai_1.expect(rawSlot1.Uid).to.not.eq(rawSlot2.Uid);
    });
    describe("ResetUid", () => {
        it("is to make sure no rawslots can have the same uid", () => {
            const rawSlot1 = new rawSlot_1.RawSlot();
            rawSlot1.Uid = 1;
            const rawSlot2 = new rawSlot_1.RawSlot();
            rawSlot2.Uid = 1;
            chai_1.expect(rawSlot1.Uid).to.eq(rawSlot2.Uid);
            rawSlot_1.RawSlot.ResetUid(rawSlot1);
            rawSlot_1.RawSlot.ResetUid(rawSlot2);
            chai_1.expect(rawSlot1.Uid).to.not.eq(rawSlot2.Uid);
        });
    });
});
//# sourceMappingURL=_rawSlot.test.js.map