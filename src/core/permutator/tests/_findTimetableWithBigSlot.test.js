"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const concat = require("lodash.concat");
const isEqual = require("lodash.isequal");
const timePeriod_1 = require("../../att/timePeriod");
const parseRawSlotToSlot_1 = require("../../parser/parseRawSlotToSlot");
const parseSlotToBigSlot_1 = require("../../parser/parseSlotToBigSlot");
const heng_2017_apr_1 = require("../../tests/testData/heng_2017_apr");
const findTimetable_1 = require("../findTimetable");
const testDataGenerator_1 = require("./../../tests/testDataGenerator");
describe("FindTimetable() with BigSlot", () => {
    beforeEach(() => {
        timePeriod_1.TimePeriod.SetMinTo8am();
    });
    it("case 1", () => {
        const slots = testDataGenerator_1.GetBigSlotsOf("MPU3113");
        const result = findTimetable_1.FindTimetable(slots);
        chai_1.expect(result.length).to.eq(3);
        chai_1.expect(result[0].SlotUids.length).to.eq(2);
        chai_1.expect(result[1].SlotUids.length).to.eq(2);
        chai_1.expect(result[2].SlotUids.length).to.eq(2);
    });
    it("case 2", () => {
        const hubunganEtnikSlots = testDataGenerator_1.GetBigSlotsOf("MPU3113");
        const titasSlots = testDataGenerator_1.GetBigSlotsOf("MPU3123");
        const input = hubunganEtnikSlots.concat(titasSlots);
        const result = findTimetable_1.FindTimetable(input);
        chai_1.expect(result.length).to.eq(5);
    });
    it("case 3", () => {
        const beamSlots = testDataGenerator_1.GetBigSlotsOf("UKMM1043");
        const result = findTimetable_1.FindTimetable(beamSlots);
        chai_1.expect(result.length).to.eq(29);
    });
    it("case 4", () => {
        const beamSlots = testDataGenerator_1.GetBigSlotsOf("UKMM1043");
        const sunziSlots = testDataGenerator_1.GetBigSlotsOf("UKMM1011");
        const waterTreamentSlots = testDataGenerator_1.GetBigSlotsOf("UEMX3653");
        const input = beamSlots.concat(sunziSlots).concat(waterTreamentSlots);
        const result = findTimetable_1.FindTimetable(input);
        chai_1.expect(result.length).to.eq(502);
    });
    it("case 5", () => {
        const beamSlots = testDataGenerator_1.GetBigSlotsOf("UKMM1043");
        const sunziSlots = testDataGenerator_1.GetBigSlotsOf("UKMM1011");
        const waterTreamentSlots = testDataGenerator_1.GetBigSlotsOf("UEMX3653");
        const koreanSlots = testDataGenerator_1.GetBigSlotsOf("UJLL1093");
        const input = concat(beamSlots, sunziSlots, waterTreamentSlots, koreanSlots);
        const result = findTimetable_1.FindTimetable(input);
        chai_1.expect(result.length).to.eq(1020);
    });
    it("case 6", () => {
        const beamSlots = testDataGenerator_1.GetBigSlotsOf("UKMM1043");
        const sunziSlots = testDataGenerator_1.GetBigSlotsOf("UKMM1011");
        const waterTreamentSlots = testDataGenerator_1.GetBigSlotsOf("UEMX3653");
        const koreanSlots = testDataGenerator_1.GetBigSlotsOf("UJLL1093");
        const japanSlots = testDataGenerator_1.GetBigSlotsOf("UALJ2013");
        const input = concat(beamSlots, sunziSlots, waterTreamentSlots, koreanSlots, japanSlots);
        const result = findTimetable_1.FindTimetable(input);
        chai_1.expect(result.length).to.eq(1244);
    });
    it("case 7", () => {
        const bkaSlots = testDataGenerator_1.GetBigSlotsOf("MPU32013");
        const result = findTimetable_1.FindTimetable(bkaSlots);
        chai_1.expect(result.length).to.eq(1);
    });
    it("case 8", () => {
        const fm2Slots = heng_2017_apr_1.HENG_2017_APR().filter((s) => s.SubjectCode === heng_2017_apr_1.CodeOf.FM2);
        const bigSlots = parseSlotToBigSlot_1.ParseSlotToBigSlot(parseRawSlotToSlot_1.ParseRawSlotToSlot(fm2Slots));
        const result = findTimetable_1.FindTimetable(bigSlots);
        chai_1.expect(result.length).to.eq(420);
    });
    it("should return empty array when there is no possible timetable", () => {
        const acpSlots = testDataGenerator_1.GetBigSlotsOf(heng_2017_apr_1.CodeOf.ACP);
        const bkaSlots = testDataGenerator_1.GetBigSlotsOf(heng_2017_apr_1.CodeOf.BKA);
        const input = concat(acpSlots, bkaSlots);
        const result = findTimetable_1.FindTimetable(input);
        chai_1.expect(result.length).to.eq(0);
    });
    it("case 1 on Timetable.DayTimeMatrix", () => {
        const bkaSlots = testDataGenerator_1.GetBigSlotsOf(heng_2017_apr_1.CodeOf.BKA);
        const result = findTimetable_1.FindTimetable(bkaSlots);
        chai_1.expect(result[0].DayTimeMatrix).to.deep.eq([
            0,
            parseInt("111111", 2),
            parseInt("111111", 2),
            0,
            0,
            0,
            0
        ]);
    });
});
//# sourceMappingURL=_findTimetableWithBigSlot.test.js.map