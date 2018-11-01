import {
    expect
} from "chai";
const concat = require("lodash.concat");
const isEqual = require("lodash.isequal");
import { TimePeriod } from "../../att/timePeriod";
import {
    ParseRawSlotToSlot
} from "../../parser/parseRawSlotToSlot";
import {
    ParseSlotToBigSlot
} from "../../parser/parseSlotToBigSlot";
import {
    CodeOf,
    HENG_2017_APR
} from "../../tests/testData/heng_2017_apr";
import {
    FindTimetable
} from "../findTimetable";
import {
    RawSlot
} from "./../../model/rawSlot";
import {
    GetBigSlotsOf
} from "./../../tests/testDataGenerator";
import {
    BoundedInt
} from "./../boundedInt";

describe("FindTimetable() with BigSlot", () => {
    beforeEach(() => {
        TimePeriod.SetMinTo8am();
    });

    it("case 1", () => {
        const slots = GetBigSlotsOf("MPU3113");
        const result = FindTimetable(slots);
        expect(result.length).to.eq(3);
        expect(result[0].Uids.length).to.eq(2);
        expect(result[1].Uids.length).to.eq(2);
        expect(result[2].Uids.length).to.eq(2);
    });

    it("case 2", () => {
        const hubunganEtnikSlots = GetBigSlotsOf("MPU3113");
        const titasSlots = GetBigSlotsOf("MPU3123");
        const input = hubunganEtnikSlots.concat(titasSlots);
        const result = FindTimetable(input);
        expect(result.length).to.eq(5);
    });

    it("case 3", () => {
        const beamSlots = GetBigSlotsOf("UKMM1043");
        const result = FindTimetable(beamSlots);
        expect(result.length).to.eq(29);
    });

    it("case 4", () => {
        const beamSlots = GetBigSlotsOf("UKMM1043");
        const sunziSlots = GetBigSlotsOf("UKMM1011");
        const waterTreamentSlots = GetBigSlotsOf("UEMX3653");
        const input = beamSlots.concat(sunziSlots).concat(waterTreamentSlots);
        const result = FindTimetable(input);
        expect(result.length).to.eq(502);
    });

    it("case 5", () => {
        const beamSlots = GetBigSlotsOf("UKMM1043");
        const sunziSlots = GetBigSlotsOf("UKMM1011");
        const waterTreamentSlots = GetBigSlotsOf("UEMX3653");
        const koreanSlots = GetBigSlotsOf("UJLL1093");
        const input = concat(beamSlots, sunziSlots, waterTreamentSlots, koreanSlots);
        const result = FindTimetable(input);
        expect(result.length).to.eq(1020);
    });

    it("case 6", () => {
        const beamSlots = GetBigSlotsOf("UKMM1043");
        const sunziSlots = GetBigSlotsOf("UKMM1011");
        const waterTreamentSlots = GetBigSlotsOf("UEMX3653");
        const koreanSlots = GetBigSlotsOf("UJLL1093");
        const japanSlots = GetBigSlotsOf("UALJ2013");
        const input = concat(beamSlots, sunziSlots, waterTreamentSlots, koreanSlots, japanSlots);
        const result = FindTimetable(input);
        expect(result.length).to.eq(1244);
    });

    it("case 7", () => {
        const bkaSlots = GetBigSlotsOf("MPU32013");
        const result = FindTimetable(bkaSlots);
        expect(result.length).to.eq(1);
    });

    it("case 8", () => {
        const fm2Slots = HENG_2017_APR().filter((s) => s.SubjectCode === CodeOf.FM2);
        const bigSlots = ParseSlotToBigSlot(ParseRawSlotToSlot(fm2Slots));
        const result = FindTimetable(bigSlots);
        expect(result.length).to.eq(420);
    });

    it("should return empty array when there is no possible timetable", () => {
        const acpSlots = GetBigSlotsOf(CodeOf.ACP);
        const bkaSlots = GetBigSlotsOf(CodeOf.BKA);
        const input = concat(acpSlots, bkaSlots);
        const result = FindTimetable(input);
        expect(result.length).to.eq(0);
    });

    it("case 1 on Timetable.State", () => {
        const bkaSlots = GetBigSlotsOf(CodeOf.BKA);
        const result = FindTimetable(bkaSlots);
        expect(result[0].State).to.deep.eq(
             [  0, 63, 63, 0, 0, 0, 0,
                0, 63, 63, 0, 0, 0, 0,
                0, 63, 63, 0, 0, 0, 0,
                0, 63, 63, 0, 0, 0, 0,
                0, 63, 63, 0, 0, 0, 0,
                0, 63, 63, 0, 0, 0, 0,
                0, 63, 63, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0 ]);
    });

});
