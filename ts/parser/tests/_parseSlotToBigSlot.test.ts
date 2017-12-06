import { expect } from "chai";
import TestManager, { FileName } from "../../tests/testManager";
import ParseHtmlToRawSlot from "../parseHtmlToRawSlot";
import { ParseRawSlotToSlot } from "../parseRawSlotToSlot";
import { ParseSlotToBigSlot } from "../parseSlotToBigSlot";

const testSlots = ParseHtmlToRawSlot(new TestManager().GetDataFrom(FileName.cf_2017_nov));

describe("ParseSlotToBigSlot", () => {
    it("case 1", () => {
        const rawSlots = testSlots.filter((s) => s.Number === "283");
        const bigSlots = ParseSlotToBigSlot(ParseRawSlotToSlot( rawSlots ));
        expect(bigSlots).to.have.lengthOf(1);
        expect(bigSlots[0].State).to.deep.eq([
            0, 0, 0, 0, 0, 0, 0, // week 1
            1008, 0, 0, 0, 0, 0, 0, // week 2
            0, 0, 0, 0, 0, 0, 0, // week 3
            0, 0, 0, 0, 0, 0, 0, // week 4
            0, 0, 0, 0, 0, 0, 0, // week 5
            0, 0, 0, 0, 0, 0, 0, // week 6
            0, 0, 0, 0, 0, 0, 0, // week 7
            1008, 0, 0, 0, 0, 0, 0// week 8
        ]);

    });
});
