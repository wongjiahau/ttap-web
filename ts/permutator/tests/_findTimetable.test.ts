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
    ParseSlotToTinySlot
} from "../../parser/parseSlotToTinySlot";
import {
    CodeOf,
    HENG_2017_APR
} from "../../tests/testData/heng_2017_apr";
import {
    FindTimetable, FindTimetableByConsideringWeekNumber,
} from "../findTimetable";
import {
    RawSlot
} from "./../../model/rawSlot";
import {
    GetTinySlotsOf
} from "./../../tests/testDataGenerator";
import {
    BoundedInt
} from "./../boundedInt";

describe("FindTimetable()", () => {
    it("should throw error if passed in empty array", () => {
        expect(() => {
            FindTimetable([]);
        }).to.throw();
    });

    it("case 1", () => {
        const slots = GetTinySlotsOf("MPU3113");
        const result = FindTimetable(slots);
        expect(result.length).to.eq(3);
        expect(result[0].Uids.length).to.eq(2);
        expect(result[1].Uids.length).to.eq(2);
        expect(result[2].Uids.length).to.eq(2);
    });

    it("case 2", () => {
        const hubunganEtnikSlots = GetTinySlotsOf("MPU3113");
        const titasSlots = GetTinySlotsOf("MPU3123");
        const input = hubunganEtnikSlots.concat(titasSlots);
        const result = FindTimetable(input);
        expect(result.length).to.eq(5);
    });

    it("case 3", () => {
        const beamSlots = GetTinySlotsOf("UKMM1043");
        const result = FindTimetable(beamSlots);
        expect(result.length).to.eq(29);
    });

    it("case 4", () => {
        const beamSlots = GetTinySlotsOf("UKMM1043");
        const sunziSlots = GetTinySlotsOf("UKMM1011");
        const waterTreamentSlots = GetTinySlotsOf("UEMX3653");
        const input = beamSlots.concat(sunziSlots).concat(waterTreamentSlots);
        const result = FindTimetable(input);
        expect(result.length).to.eq(502);
    });

    it("case 5", () => {
        const beamSlots = GetTinySlotsOf("UKMM1043");
        const sunziSlots = GetTinySlotsOf("UKMM1011");
        const waterTreamentSlots = GetTinySlotsOf("UEMX3653");
        const koreanSlots = GetTinySlotsOf("UJLL1093");
        const input = concat(beamSlots, sunziSlots, waterTreamentSlots, koreanSlots);
        const result = FindTimetable(input);
        expect(result.length).to.eq(1020);
    });

    it("case 6", () => {
        const beamSlots = GetTinySlotsOf("UKMM1043");
        const sunziSlots = GetTinySlotsOf("UKMM1011");
        const waterTreamentSlots = GetTinySlotsOf("UEMX3653");
        const koreanSlots = GetTinySlotsOf("UJLL1093");
        const japanSlots = GetTinySlotsOf("UALJ2013");
        const input = concat(beamSlots, sunziSlots, waterTreamentSlots, koreanSlots, japanSlots);
        const result = FindTimetable(input);
        expect(result.length).to.eq(1244);
    });

    it("case 7", () => {
        const bkaSlots = GetTinySlotsOf("MPU32013");
        const result = FindTimetable(bkaSlots);
        expect(result.length).to.eq(1);
    });

    it("case 8", () => {
        const fm2Slots = HENG_2017_APR().filter((s) => s.SubjectCode === CodeOf.FM2);
        const bigSlots = ParseSlotToTinySlot(ParseRawSlotToSlot(fm2Slots));
        const result = FindTimetable(bigSlots);
        expect(result.length).to.eq(392);
    });

    it("should return empty array when there is no possible timetable", () => {
        const acpSlots = GetTinySlotsOf(CodeOf.ACP);
        const bkaSlots = GetTinySlotsOf(CodeOf.BKA);
        const input = concat(acpSlots, bkaSlots);
        const result = FindTimetable(input);
        expect(result.length).to.eq(0);
    });

    it("case 1 on Timetable.State", () => {
        TimePeriod.SetMinTo8am();
        const bkaSlots = GetTinySlotsOf(CodeOf.BKA);
        const result = FindTimetable(bkaSlots);
        expect(result[0].State).to.deep.eq([
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

describe("FindTimetableByConsideringWeekNumber ", () => {
    it("case 1", () => {
        const slots = HENG_2017_APR().filter((x) =>
            x.SubjectCode === CodeOf.FM2 ||  // Fluid Mechanics 2
            x.SubjectCode === CodeOf.H   ||  // Hydrology
            x.SubjectCode === CodeOf.SA2 ||  // Structural Analysis 2
            x.SubjectCode === CodeOf.HT  ||  // Highway Transportation
            x.SubjectCode === CodeOf.ITBS    // Introduction To Building Services
        );
        const timetables = FindTimetableByConsideringWeekNumber(slots);
        expect(timetables.length).to.eq(616872);
    });
});
