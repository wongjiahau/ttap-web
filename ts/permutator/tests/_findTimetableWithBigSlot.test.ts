import {
    expect
} from "chai";
import {
    concat,
    isEqual
} from "lodash";
import {
    FindTimetable,
    IncrementSpecificIndex
} from "../findTimetable";
import {
    RawSlot
} from "./../../model/rawSlot";
import {
    CodeOf, GetBigSlotsOf
} from "./../../tests/testDataGenerator";
import {
    BoundedInt
} from "./../boundedInt";

describe("FindTimetable() with BigSlot", () => {
    it("this test is currently disabled", () => {
        console.log("this test is disabled");
    });
    // it("case 1", () => {
    //     const slots = GetBigSlotsOf("MPU3113");
    //     const result = FindTimetable(slots);
    //     expect(result.length).to.eq(3);
    //     expect(result[0].HashIds.length).to.eq(2);
    //     expect(result[1].HashIds.length).to.eq(2);
    //     expect(result[2].HashIds.length).to.eq(2);
    // });

    // it("case 2", () => {
    //     const hubunganEtnikSlots = GetBigSlotsOf("MPU3113");
    //     const titasSlots = GetBigSlotsOf("MPU3123");
    //     const input = hubunganEtnikSlots.concat(titasSlots);
    //     const result = FindTimetable(input);
    //     expect(result.length).to.eq(5);
    // });

    // it("case 3", () => {
    //     const beamSlots = GetBigSlotsOf("UKMM1043");
    //     const result = FindTimetable(beamSlots);
    //     expect(result.length).to.eq(29);
    // });

    // it("case 4", () => {
    //     const beamSlots = GetBigSlotsOf("UKMM1043");
    //     const sunziSlots = GetBigSlotsOf("UKMM1011");
    //     const waterTreamentSlots = GetBigSlotsOf("UEMX3653");
    //     const input = beamSlots.concat(sunziSlots).concat(waterTreamentSlots);
    //     const result = FindTimetable(input);
    //     expect(result.length).to.eq(502);
    // });

    // it("case 5", () => {
    //     const beamSlots = GetBigSlotsOf("UKMM1043");
    //     const sunziSlots = GetBigSlotsOf("UKMM1011");
    //     const waterTreamentSlots = GetBigSlotsOf("UEMX3653");
    //     const koreanSlots = GetBigSlotsOf("UJLL1093");
    //     const input = concat(beamSlots, sunziSlots, waterTreamentSlots, koreanSlots);
    //     const result = FindTimetable(input);
    //     expect(result.length).to.eq(1020);
    // });

    // it("case 6", () => {
    //     const beamSlots = GetBigSlotsOf("UKMM1043");
    //     const sunziSlots = GetBigSlotsOf("UKMM1011");
    //     const waterTreamentSlots = GetBigSlotsOf("UEMX3653");
    //     const koreanSlots = GetBigSlotsOf("UJLL1093");
    //     const japanSlots = GetBigSlotsOf("UALJ2013");
    //     const input = concat(beamSlots, sunziSlots, waterTreamentSlots, koreanSlots, japanSlots);
    //     const result = FindTimetable(input);
    //     expect(result.length).to.eq(1244);
    // });

    // it("case 7", () => {
    //     const bkaSlots = GetBigSlotsOf("MPU32013");
    //     const result = FindTimetable(bkaSlots);
    //     expect(result.length).to.eq(1);
    // });

    // it("should return empty array when there is no possible timetable", () => {
    //     const acpSlots = GetBigSlotsOf(CodeOf.ACP);
    //     const bkaSlots = GetBigSlotsOf(CodeOf.BKA);
    //     const input = concat(acpSlots, bkaSlots);
    //     const result = FindTimetable(input);
    //     expect(result.length).to.eq(0);
    // });

    // it("case 1 on Timetable.State", () => {
    //     const bkaSlots = GetBigSlotsOf(CodeOf.BKA);
    //     const result = FindTimetable(bkaSlots);
    //     expect(result[0].State).to.deep.eq([
    //         0,
    //         parseInt("11111100", 2),
    //         parseInt("11111100", 2),
    //         0,
    //         0,
    //         0,
    //         0
    //     ]);
    // });

});

describe("IncrementSpecificIndex", () => {
    it("should return a new indices if the increment is possible", () => {
        const input = [
            new BoundedInt(1, 0),
            new BoundedInt(1, 0),
            new BoundedInt(1, 0),
        ];
        const result = IncrementSpecificIndex(input, 1);
        const expected = [
            new BoundedInt(1, 0),
            new BoundedInt(1, 1),
            new BoundedInt(1, 0),
        ];
        expect(isEqual(input, expected)).to.eq(true);
    });

    it("should return null if the increment is impossible", () => {
        const input = [
            new BoundedInt(1, 0),
            new BoundedInt(1, 1),
            new BoundedInt(1, 0),
        ];
        const result = IncrementSpecificIndex(input, 1);
        expect(result).to.eq(null);
    });

});
