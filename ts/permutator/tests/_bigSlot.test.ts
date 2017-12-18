import {
    expect
} from "chai";
const find = require("lodash.find");
import {
    RawSlot
} from "../../model/rawSlot";
import {
    CreateSlotFromRaw
} from "../../model/slot";
import ParseHtmlToRawSlot from "../../parser/parseHtmlToRawSlot";
import TestManager, {
    FileName
} from "../../tests/testManager";
import {
    BigSlot
} from "../bigSlot";
import {
    GotIntersection
} from "../state";

const testSlots = ParseHtmlToRawSlot(new TestManager().GetDataFrom(FileName.cf_2017_nov));
describe("BigSlot", () => {
    it("State should have length of 7 * 14 (case 1)", () => {
        const rawSlot = find(testSlots, {
            Number: "129"
        });
        expect(rawSlot.WeekNumber).to.eq("2,8");
        const slot = CreateSlotFromRaw(rawSlot);
        const result = new BigSlot(slot);
        expect(result.State).to.have.lengthOf(7 * 14);
    });

    it("State should have length of 7 * 14 (case 2)", () => {
        const rawSlot = find(testSlots, {
            Number: "1"
        });
        expect(rawSlot.WeekNumber).to.eq("1-14");
        const slot = CreateSlotFromRaw(rawSlot);
        const result = new BigSlot(slot);
        expect(result.State).to.have.lengthOf(7 * 14);
    });

    it("State should be array of number, where every 7 number represent state of a week", () => {
        const rawSlot = find(testSlots, {
            Number: "1"
        });
        rawSlot.WeekNumber = "2";
        const slot = CreateSlotFromRaw(rawSlot);
        const result = new BigSlot(slot);
        expect(result.State).to.have.lengthOf(7 * 14);
        expect(result.State).to.deep.eq(
            [
                0, 0, 0, 0, 0, 0, 0, // week 1
                252, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, // week 14
            ]);
    });

    it("check for intersection 1", () => {
        const x = new RawSlot();
        x.WeekNumber = "2,8";
        x.TimePeriod = "2:00 PM - 5:00 PM";
        x.Day = "Mon";
        x.SubjectCode = "XXX";
        x.Type = "T";
        const y = new RawSlot();
        y.WeekNumber = "3,7";
        y.TimePeriod = "2:00 PM - 5:00 PM";
        y.Day = "Mon";
        y.SubjectCode = "XXX";
        y.Type = "T";
        const slot1 = new BigSlot(CreateSlotFromRaw(x));
        const slot2 = new BigSlot(CreateSlotFromRaw(y));
        expect(GotIntersection(slot1.State, slot2.State)).to.eq(false);
    });

    it("check for intersection 2", () => {
        const x = new RawSlot();
        x.WeekNumber = "3,8";
        x.TimePeriod = "2:00 PM - 5:00 PM";
        x.Day = "Mon";
        x.SubjectCode = "XXX";
        x.Type = "T";
        const y = new RawSlot();
        y.WeekNumber = "3,7";
        y.TimePeriod = "2:00 PM - 5:00 PM";
        y.Day = "Mon";
        y.SubjectCode = "XXX";
        y.Type = "T";
        const slot1 = new BigSlot(CreateSlotFromRaw(x));
        const slot2 = new BigSlot(CreateSlotFromRaw(y));
        expect(GotIntersection(slot1.State, slot2.State)).to.eq(true);
    });

});
