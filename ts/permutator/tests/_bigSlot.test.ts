import { expect } from "chai";
import { find } from "lodash";
import { CreateSlotFromRaw } from "../../model/slot";
import ParseHtmlToRawSlot from "../../parser/parseHtmlToRawSlot";
import TestManager, { FileName } from "../../tests/testManager";
import { BigSlot } from "../bigSlot";

const testSlots = ParseHtmlToRawSlot(new TestManager().GetDataFrom(FileName.heng_2017_nov));
describe("BigSlot", () => {
    it("case 1", () => {
        const rawSlot = find(testSlots, { Number: "139" });
        expect(rawSlot.WeekNumber).to.eq("2,8");
        const slot = CreateSlotFromRaw(rawSlot);
        const result = new BigSlot(slot);
        expect(result.State.length === 7 * 8);
    });

    it("case 2", () => {
        const rawSlot = find(testSlots, { Number: "1" });
        expect(rawSlot.WeekNumber).to.eq("1-14");
        const slot = CreateSlotFromRaw(rawSlot);
        const result = new BigSlot(slot);
        expect(result.State.length === 7 * 14);
    });
});
