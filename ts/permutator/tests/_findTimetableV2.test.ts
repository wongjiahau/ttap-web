import {
    expect
} from "chai";
const concat = require("lodash.concat");
import {
    CodeOf,
    HENG_2017_APR
} from "../../tests/testData/heng_2017_apr";
import {
    GetRawSlotsOf
} from "../../tests/testDataGenerator";
import {
    FindTimetableV2
} from "../findTimetableV2";

const seriousInput = concat(
    HENG_2017_APR().filter((x) => x.SubjectCode === CodeOf.H), // Hydrology
    HENG_2017_APR().filter((x) => x.SubjectCode === CodeOf.SA2), // Structural Analysis II
    HENG_2017_APR().filter((x) => x.SubjectCode === CodeOf.HT), // Highway Transportation
    HENG_2017_APR().filter((x) => x.SubjectCode === CodeOf.FM2), // Fluid Mechanic II
    HENG_2017_APR().filter((x) => x.SubjectCode === CodeOf.ITBS), // Introduction To Building Services
);

describe.skip("FindTimetableV2", () => {
    it("serious case", () => {
        const isCI = require("is-ci");
        if (!isCI) {
            const result = FindTimetableV2(seriousInput);
            expect(result).to.have.lengthOf(285696);
        }
    });
    it("case 1", () => {
        const slots = GetRawSlotsOf("MPU3113");
        const result = FindTimetableV2(slots);
        expect(result.length).to.eq(3);
        expect(result[0].SlotUids.length).to.eq(2);
        expect(result[1].SlotUids.length).to.eq(2);
        expect(result[2].SlotUids.length).to.eq(2);
    });

    it("case 2", () => {
        const hubunganEtnikSlots = GetRawSlotsOf("MPU3113");
        const titasSlots = GetRawSlotsOf("MPU3123");
        const input = hubunganEtnikSlots.concat(titasSlots);
        const result = FindTimetableV2(input);
        expect(result.length).to.eq(5);
    });

    it("case 3", () => {
        const beamSlots = GetRawSlotsOf("UKMM1043");
        const result = FindTimetableV2(beamSlots);
        expect(result.length).to.eq(29);
    });

    it("case 4", () => {
        const beamSlots = GetRawSlotsOf("UKMM1043");
        const sunziSlots = GetRawSlotsOf("UKMM1011");
        const waterTreamentSlots = GetRawSlotsOf("UEMX3653");
        const input = beamSlots.concat(sunziSlots).concat(waterTreamentSlots);
        const result = FindTimetableV2(input);
        expect(result.length).to.eq(502);
    });

    it("case 5", () => {
        const beamSlots = GetRawSlotsOf("UKMM1043");
        const sunziSlots = GetRawSlotsOf("UKMM1011");
        const waterTreamentSlots = GetRawSlotsOf("UEMX3653");
        const koreanSlots = GetRawSlotsOf("UJLL1093");
        const input = concat(beamSlots, sunziSlots, waterTreamentSlots, koreanSlots);
        const result = FindTimetableV2(input);
        expect(result.length).to.eq(1020);
    });

    it("case 6", () => {
        const beamSlots = GetRawSlotsOf("UKMM1043");
        const sunziSlots = GetRawSlotsOf("UKMM1011");
        const waterTreamentSlots = GetRawSlotsOf("UEMX3653");
        const koreanSlots = GetRawSlotsOf("UJLL1093");
        const japanSlots = GetRawSlotsOf("UALJ2013");
        const input = concat(beamSlots, sunziSlots, waterTreamentSlots, koreanSlots, japanSlots);
        const result = FindTimetableV2(input);
        expect(result.length).to.eq(1244);
    });

    it("case 7", () => {
        const bkaSlots = GetRawSlotsOf("MPU32013");
        const result = FindTimetableV2(bkaSlots);
        expect(result.length).to.eq(1);
    });

    it("should return empty array when there is no possible timetable", () => {
        const acpSlots = GetRawSlotsOf(CodeOf.ACP);
        const bkaSlots = GetRawSlotsOf(CodeOf.BKA);
        const input = concat(acpSlots, bkaSlots);
        const result = FindTimetableV2(input);
        expect(result.length).to.eq(0);
    });

    it("case 1 on Timetable.DayTimeMatrix", () => {
        const bkaSlots = GetRawSlotsOf(CodeOf.BKA);
        const result = FindTimetableV2(bkaSlots);
        expect(result[0].DayTimeMatrix).to.deep.eq([
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
