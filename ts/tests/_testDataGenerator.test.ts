import { expect } from "chai";
const uniq = require("lodash.uniq");
import { GetTestRawSlot1, GetTestTimetables1, GetTinySlotsOf } from "./testDataGenerator";

describe("testDataGenerator", () => {
    describe("GetTestRawSlots", () => {
        const rawSlots = GetTestRawSlot1();
        const subjectNames = uniq(rawSlots.map((x) => x.SubjectName));
        expect(subjectNames).to.deep.eq([
            "HUBUNGAN ETNIK (FOR LOCAL STUDENTS)",
            "TAMADUN ISLAM DAN TAMADUN ASIA (TITAS)",
            "BAHASA MELAYU KOMUNIKASI 2",
            "MALAYSIAN STUDIES 3 (FOR INTERNATIONAL STUDENTS)",
            "BAHASA KEBANGSAAN A",
            "ARTS AND CULTURAL PERFORMANCE",
            "COMMUNITY PROJECT",
            "LEADERSHIP AND TEAMBUILDING",
            "INTRODUCTION TO GERMAN LANGUAGE",
            "INTRODUCTION TO FRENCH",
            "INTRODUCTION TO JAPANESE",
            "INDUSTRIAL TRAINING",
            "ENGINEERING ECONOMICS",
            "STRUCTURAL ANALYSIS I",
            "WATER AND WASTEWATER TREATMENT",
            "INTRODUCTION TO KOREAN",
            "SUN ZI'S ART OF WAR AND BUSINESS STRATEGIES",
            "BASIC ECONOMICS, ACCOUNTING AND MANAGEMENT"
        ]);
    });

    describe("GetTestTimetables1 ", () => {
        it("should return 29 timetables", () => {
            const timetables = GetTestTimetables1();
            expect(timetables).to.have.lengthOf(29);
        });
    });

    describe("Name of the group", () => {
        it("case 1", () => {
            const expected = [
                [0, 1032192, 0, 4032, 0, 0, 0],
                [0, 48, 0, 0, 0, 0, 0],
                [0, 192, 0, 0, 0, 0, 0],
                [0, 0, 48, 0, 0, 0, 0],
                [0, 0, 0, 3, 0, 0, 0],
                [0, 0, 0, 12, 0, 0, 0],
                [0, 0, 0, 48, 0, 0, 0]
            ];
            const input1 = GetTinySlotsOf("UEMX3653"); // WWT
            expect(input1.map((x) => x.State)).to.deep.eq(expected);
        });
    });
});
