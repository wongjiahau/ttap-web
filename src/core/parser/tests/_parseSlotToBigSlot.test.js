"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const timePeriod_1 = require("../../att/timePeriod");
const heng_2017_apr_1 = require("../../tests/testData/heng_2017_apr");
const parseRawSlotToSlot_1 = require("../parseRawSlotToSlot");
const parseSlotToBigSlot_1 = require("../parseSlotToBigSlot");
const testSlots = heng_2017_apr_1.HENG_2017_APR();
describe("ParseSlotToBigSlot", () => {
    beforeEach(() => {
        timePeriod_1.TimePeriod.SetMinTo8am();
    });
    it("case 1", () => {
        const rawSlots = testSlots.filter((s) => s.Uid === 166);
        chai_1.expect(rawSlots).to.deep.eq([{
                Uid: 166,
                SubjectCode: "UEME2123",
                SubjectName: "Fluid Mechanics I",
                Number: "160",
                Type: "P",
                Group: "7",
                Day: "Tue",
                TimePeriod: "  2:00 PM -  5:00 PM",
                WeekNumber: "3,9",
                Room: "KB731"
            }]);
        chai_1.expect(rawSlots[0].WeekNumber).to.eq("3,9");
        const bigSlots = parseSlotToBigSlot_1.ParseSlotToBigSlot(parseRawSlotToSlot_1.ParseRawSlotToSlot(rawSlots));
        chai_1.expect(bigSlots).to.have.lengthOf(1);
        chai_1.expect(bigSlots[0].DayTimeMatrix).to.have.lengthOf(14 * 7);
        chai_1.expect(bigSlots[0].DayTimeMatrix).to.deep.eq([
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 258048, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 258048, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
        ]);
        /**
         * What is 258048???
         * If you convert 258048 to binary you will get 111111000000000000
         * This actually means 2.00 pm to 5.00 pm
         * Each digit means a half hour interval
         * 0 means no class, 1 means got class
         * The most right 0 stands for 8.00 am to 8.30 pm (Because we set the min to be 8am)
         * The most left 1 stands for 4.30 pm to 5.00 pm
         */
    });
});
//# sourceMappingURL=_parseSlotToBigSlot.test.js.map