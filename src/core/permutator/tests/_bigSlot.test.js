"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const find = require("lodash.find");
const rawSlot_1 = require("../../model/rawSlot");
const slot_1 = require("../../model/slot");
const parseStudentHtmlToRawSlot_1 = require("../../parser/parseStudentHtmlToRawSlot");
const testManager_1 = require("../../tests/testManager");
const bigSlot_1 = require("../bigSlot");
const matrix_1 = require("../matrix");
const testSlots = parseStudentHtmlToRawSlot_1.default(new testManager_1.default().GetDataFrom(testManager_1.FileName.cf_2017_nov));
describe("BigSlot", () => {
    it("DayTimeMatrix should have length of 7 * 14 (case 1)", () => {
        const rawSlot = find(testSlots, {
            Number: "129"
        });
        chai_1.expect(rawSlot.WeekNumber).to.eq("2,8");
        const slot = slot_1.CreateSlotFromRaw(rawSlot);
        const result = bigSlot_1.newBigSlot(slot);
        chai_1.expect(result.DayTimeMatrix).to.have.lengthOf(7 * 14);
    });
    it("DayTimeMatrix should have length of 7 * 14 (case 2)", () => {
        const rawSlot = find(testSlots, {
            Number: "1"
        });
        chai_1.expect(rawSlot.WeekNumber).to.eq("1-14");
        const slot = slot_1.CreateSlotFromRaw(rawSlot);
        const result = bigSlot_1.newBigSlot(slot);
        chai_1.expect(result.DayTimeMatrix).to.have.lengthOf(7 * 14);
    });
    it("DayTimeMatrix should be array of number, where every 7 number represent matrix of a week", () => {
        const rawSlot = find(testSlots, {
            Number: "1"
        });
        rawSlot.WeekNumber = "2";
        const slot = slot_1.CreateSlotFromRaw(rawSlot);
        const result = bigSlot_1.newBigSlot(slot);
        chai_1.expect(result.DayTimeMatrix).to.have.lengthOf(7 * 14);
        chai_1.expect(result.DayTimeMatrix).to.deep.eq([
            0, 0, 0, 0, 0, 0, 0,
            63, 0, 0, 0, 0, 0, 0,
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
            0, 0, 0, 0, 0, 0, 0,
        ]);
    });
    it("check for intersection 1", () => {
        const x = new rawSlot_1.RawSlot();
        x.WeekNumber = "2,8";
        x.TimePeriod = "2:00 PM - 5:00 PM";
        x.Day = "Mon";
        x.SubjectCode = "XXX";
        x.SubjectName = "XXX";
        x.Type = "T";
        const y = new rawSlot_1.RawSlot();
        y.WeekNumber = "3,7";
        y.TimePeriod = "2:00 PM - 5:00 PM";
        y.Day = "Mon";
        y.SubjectCode = "XXX";
        y.SubjectName = "XXX";
        y.Type = "T";
        const slot1 = bigSlot_1.newBigSlot(slot_1.CreateSlotFromRaw(x));
        const slot2 = bigSlot_1.newBigSlot(slot_1.CreateSlotFromRaw(y));
        chai_1.expect(matrix_1.GotIntersection(slot1.DayTimeMatrix, slot2.DayTimeMatrix)).to.eq(false);
    });
    it("check for intersection 2", () => {
        const x = new rawSlot_1.RawSlot();
        x.WeekNumber = "3,8";
        x.TimePeriod = "2:00 PM - 5:00 PM";
        x.Day = "Mon";
        x.SubjectCode = "XXX";
        x.SubjectName = "XXX";
        x.Type = "T";
        const y = new rawSlot_1.RawSlot();
        y.WeekNumber = "3,7";
        y.TimePeriod = "2:00 PM - 5:00 PM";
        y.Day = "Mon";
        y.SubjectCode = "XXX";
        y.SubjectName = "XXX";
        y.Type = "T";
        const slot1 = bigSlot_1.newBigSlot(slot_1.CreateSlotFromRaw(x));
        const slot2 = bigSlot_1.newBigSlot(slot_1.CreateSlotFromRaw(y));
        chai_1.expect(matrix_1.GotIntersection(slot1.DayTimeMatrix, slot2.DayTimeMatrix)).to.eq(true);
    });
});
//# sourceMappingURL=_bigSlot.test.js.map