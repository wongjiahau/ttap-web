"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const isEqual = require("lodash.isequal");
const parseSlotToTinySlot_1 = require("../parseSlotToTinySlot");
describe("ParseSlotToTinySlot", () => {
    it("should join slots into same group if they have the same SlotNumber", () => {
        const slot1 = {
            Day: 0,
            Group: 1,
            Uid: 1,
            Week: 999,
            SlotNumber: 1,
            SubjectCode: 333,
            SubjectName: "xxx",
            TimePeriod: 15,
            Type: "L"
        };
        const slot2 = {
            Day: 0,
            Group: 1,
            Uid: 2,
            SlotNumber: 1,
            SubjectCode: 333,
            SubjectName: "xxx",
            Week: 999,
            TimePeriod: 15,
            Type: "L"
        };
        const input = [slot1, slot2];
        const result = parseSlotToTinySlot_1.ParseSlotToTinySlot(input);
        chai_1.expect(result.length).to.eq(1);
    });
    it("should separate slots into different group if they have different SlotNumber", () => {
        const slot1 = {
            Day: 0,
            Group: 1,
            Uid: 1,
            SlotNumber: 1,
            SubjectCode: 333,
            TimePeriod: 15,
            Type: "L",
            SubjectName: "xxx",
            Week: 999,
        };
        const slot2 = {
            Day: 0,
            Group: 1,
            Uid: 2,
            SlotNumber: 2,
            SubjectCode: 333,
            TimePeriod: 15,
            Type: "L",
            SubjectName: "xxx",
            Week: 999,
        };
        const input = [slot1, slot2];
        const result = parseSlotToTinySlot_1.ParseSlotToTinySlot(input);
        chai_1.expect(result.length).to.eq(2);
    });
    it("should collect Uid of slots from the same group", () => {
        const slot1 = {
            Day: 0,
            Group: 1,
            Uid: 1,
            SlotNumber: 1,
            SubjectCode: 333,
            TimePeriod: 15,
            Type: "L",
            SubjectName: "xxx",
            Week: 999,
        };
        const slot2 = {
            Day: 1,
            Group: 1,
            Uid: 2,
            SlotNumber: 1,
            SubjectCode: 333,
            TimePeriod: 15,
            Type: "L",
            SubjectName: "xxx",
            Week: 999,
        };
        const input = [slot1, slot2];
        const result = parseSlotToTinySlot_1.ParseSlotToTinySlot(input);
        chai_1.expect(isEqual(result[0].SlotIds, [1, 2])).to.eq(true);
    });
    it("should join timeperiod into a matrix for slots from the same group", () => {
        const slot1 = {
            Day: 1,
            Group: 1,
            Uid: 1,
            SlotNumber: 1,
            SubjectCode: 333,
            TimePeriod: 15,
            Type: "L",
            SubjectName: "xxx",
            Week: 999,
        };
        const slot2 = {
            Day: 2,
            Group: 1,
            Uid: 2,
            SlotNumber: 1,
            SubjectCode: 333,
            TimePeriod: 15,
            Type: "L",
            SubjectName: "xxx",
            Week: 999,
        };
        const input = [slot1, slot2];
        const result = parseSlotToTinySlot_1.ParseSlotToTinySlot(input);
        const expectedMatrix = [15, 15, 0, 0, 0, 0, 0];
        chai_1.expect(isEqual(result[0].DayTimeMatrix, expectedMatrix)).to.eq(true);
    });
});
//# sourceMappingURL=_parseSlotToTinySlot.test.js.map