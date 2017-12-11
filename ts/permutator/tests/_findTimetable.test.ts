import {
    expect
} from "chai";
import {
    concat,
    isEqual
} from "lodash";
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
    FindTimetable,
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
    it("case 1", () => {
        const slots = GetTinySlotsOf("MPU3113");
        const result = FindTimetable(slots);
        expect(result.length).to.eq(3);
        expect(result[0].HashIds.length).to.eq(2);
        expect(result[1].HashIds.length).to.eq(2);
        expect(result[2].HashIds.length).to.eq(2);
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
        const bkaSlots = GetTinySlotsOf(CodeOf.BKA);
        const result = FindTimetable(bkaSlots);
        expect(result[0].State).to.deep.eq([
            0,
            parseInt("11111100", 2),
            parseInt("11111100", 2),
            0,
            0,
            0,
            0
        ]);
    });

});
