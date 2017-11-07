import {
    expect
} from "chai";
import {
    concat, isEqual
} from "lodash";
import {
    Append,
    FindTimetable,
    GotIntersection
} from "../findTimetable";
import { RawSlot } from "./../../model/rawSlot";
import {
    GetTinySlotsOf
} from "./../../tests/testDataGenerator";

describe("FindTimetable()", () => {
    it("case 1", () => {
        const slots = GetTinySlotsOf("MPU3113");
        const result = FindTimetable(slots);
        expect(result.length).to.eq(3);
        expect(result[0].length).to.eq(2);
        expect(result[1].length).to.eq(2);
        expect(result[2].length).to.eq(2);
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
});

describe("GotIntersection()", () => {
    it("should return true if got intersection", () => {
        const a = [parseInt("1111", 2), 0, 0, 0, 0, 0, 0];
        const b = [parseInt("1111", 2), 0, 0, 0, 0, 0, 0];
        expect(GotIntersection(a, b)).to.eq(true);

    });

    it("should return false if don't have intersection", () => {
        const a = [parseInt("1111", 2), 0, 0, 0, 0, 0, 0];
        const b = [0, parseInt("1111", 2), 0, 0, 0, 0, 0];
        expect(GotIntersection(a, b)).to.eq(false);

    });
});

describe("Append()", () => {

    it("should return number array of length 7", () => {
        const a = [0, 0, 0, 0, 0, 0, 0];
        const b = [0, 0, 0, 0, 0, 0, 0];
        expect(Append(a, b).length).to.eq(7);

    });

    it("should combine two array into one array", () => {
        const a = [15, 0, 0, 0, 0, 0, 0];
        const b = [0, 15, 0, 0, 0, 0, 0];
        const result = Append(a, b);
        expect(isEqual(result, [15, 15, 0, 0, 0, 0, 0])).to.eq(true);
    });

    it("should combine two array using bitwise-OR", () => {
        const a = [parseInt("1111", 2), 0, 0, 0, 0, 0, 0];
        const b = [parseInt("11110000", 2), 0, 0, 0, 0, 0, 0];
        const result = Append(a, b);
        expect(isEqual(result, [parseInt("11111111", 2), 0, 0, 0, 0, 0, 0])).to.eq(true);
    });

});
