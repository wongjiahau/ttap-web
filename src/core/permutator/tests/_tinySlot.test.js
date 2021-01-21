"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const isEqual = require("lodash.isequal");
const timePeriod_1 = require("../../att/timePeriod");
const parseRawSlotToSlot_1 = require("../../parser/parseRawSlotToSlot");
const parseSlotToTinySlot_1 = require("../../parser/parseSlotToTinySlot");
const heng_2017_sept_1 = require("../../tests/testData/heng_2017_sept");
const slot_1 = require("./../../model/slot");
const testDataGenerator_1 = require("./../../tests/testDataGenerator");
const tinySlot_1 = require("./../tinySlot");
function GetTestSlot() {
    const result = {
        Day: 1,
        Group: 2,
        Uid: 3,
        SlotNumber: 4,
        SubjectCode: 333,
        SubjectName: "XXX",
        TimePeriod: 15,
        Type: "L",
        Week: 15,
    };
    return slot_1.CreateSlotFromInterface(result);
}
describe("tinySlot", () => {
    beforeEach(() => {
        timePeriod_1.TimePeriod.SetMinTo8am();
    });
    describe("constructor", () => {
        it("should set SlotNumber", () => {
            const result = new tinySlot_1.TinySlot(GetTestSlot());
            chai_1.expect(result.SlotNumber).to.eq(4);
        });
        it("should set Uids", () => {
            const result = new tinySlot_1.TinySlot(GetTestSlot());
            chai_1.expect(isEqual(result.SlotIds, [3])).to.eq(true);
        });
        it("should set PartitionKey", () => {
            const result = new tinySlot_1.TinySlot(GetTestSlot());
            chai_1.expect(result.PartitionKey).to.eq(3330);
        });
        it("should set DayTimeMatrix 1", () => {
            const result = new tinySlot_1.TinySlot(GetTestSlot());
            const expected = [
                15,
                0,
                0,
                0,
                0,
                0,
                0,
            ];
            chai_1.expect(isEqual(result.DayTimeMatrix, expected)).to.eq(true);
        });
        it("should set DayTimeMatrix 2", () => {
            const bkaSlots = testDataGenerator_1.GetRawSlotsOf(heng_2017_sept_1.CodeOf.BKA);
            chai_1.expect(bkaSlots).to.deep.eq([{
                    Uid: 16,
                    SubjectCode: "MPU32013",
                    SubjectName: "BAHASA KEBANGSAAN A",
                    Number: "9",
                    Type: "L",
                    Group: "1",
                    ClassSize: "30",
                    Day: "Tue",
                    TimePeriod: "08:00 AM - 11:00 AM",
                    CreditHour: "3.0",
                    WeekNumber: "1-7",
                    Room: "KB204",
                    Remark: ""
                }, {
                    Uid: 17,
                    SubjectCode: "MPU32013",
                    SubjectName: "BAHASA KEBANGSAAN A",
                    Number: "9",
                    Type: "L",
                    Group: "1",
                    Day: "Wed",
                    TimePeriod: "08:00 AM - 11:00 AM",
                    CreditHour: "3.0",
                    WeekNumber: "1-7",
                    Room: "KB201"
                }]);
            const result = parseSlotToTinySlot_1.ParseSlotToTinySlot(parseRawSlotToSlot_1.ParseRawSlotToSlot(bkaSlots));
            const expected = [
                0,
                parseInt("111111", 2),
                parseInt("111111", 2),
                0,
                0,
                0,
                0
            ];
            chai_1.expect(result[0].DayTimeMatrix).to.deep.eq(expected);
        });
    });
});
//# sourceMappingURL=_tinySlot.test.js.map