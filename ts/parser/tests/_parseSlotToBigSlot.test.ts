import {
    expect
} from "chai";
import {
    HENG_2017_APR
} from "../../tests/testData/heng_2017_apr";
import {
    ParseRawSlotToSlot
} from "../parseRawSlotToSlot";
import {
    ParseSlotToBigSlot
} from "../parseSlotToBigSlot";

const testSlots = HENG_2017_APR();

describe("ParseSlotToBigSlot", () => {
    it("case 1", () => {
        const rawSlots = testSlots.filter((s) => s.Uid === 166);
        expect(rawSlots[0].WeekNumber).to.eq("3,9");
        const bigSlots = ParseSlotToBigSlot(ParseRawSlotToSlot(rawSlots));
        expect(bigSlots).to.have.lengthOf(1);
        expect(bigSlots[0].State).to.have.lengthOf(14 * 7);
        expect(bigSlots[0].State).to.deep.eq(
            [
                0,       0, 0, 0, 0, 0, 0, // week 1
                0,       0, 0, 0, 0, 0, 0, // week 2
                0, 1032192, 0, 0, 0, 0, 0, // week 3
                0,       0, 0, 0, 0, 0, 0,
                0,       0, 0, 0, 0, 0, 0,
                0,       0, 0, 0, 0, 0, 0,
                0,       0, 0, 0, 0, 0, 0,
                0,       0, 0, 0, 0, 0, 0,
                0, 1032192, 0, 0, 0, 0, 0, // week 9
                0,       0, 0, 0, 0, 0, 0,
                0,       0, 0, 0, 0, 0, 0,
                0,       0, 0, 0, 0, 0, 0,
                0,       0, 0, 0, 0, 0, 0,
                0,       0, 0, 0, 0, 0, 0
            ]
        );
    });
});
