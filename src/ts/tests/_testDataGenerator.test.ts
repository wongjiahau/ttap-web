import { expect } from "chai";
const uniq = require("lodash.uniq");
import {
  GetTestRawSlot1,
  GetTestSlot1,
  GetTestSubjects1,
  GetTestTimetables1,
  GetTestTinySlot1,
  GetTinySlotsOf,
} from "./testDataGenerator";

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
      "BASIC ECONOMICS, ACCOUNTING AND MANAGEMENT",
    ]);
  });

  describe("GetTestSlot1", () => {
    const slots = GetTestSlot1();
    expect(slots).to.have.lengthOf(141);
  });

  describe("GetTestTinySlot1", () => {
    const tinySlots = GetTestTinySlot1();
    expect(tinySlots).to.have.lengthOf(89);
  });

  describe("GetTestSubjects1", () => {
    const subjects = GetTestSubjects1();
    expect(subjects).to.have.lengthOf(17);
    expect(subjects.map((x) => x.Name)).to.deep.eq([
      "ARTS AND CULTURAL PERFORMANCE",
      "BAHASA KEBANGSAAN A",
      "BAHASA MELAYU KOMUNIKASI 2",
      "BASIC ECONOMICS, ACCOUNTING AND MANAGEMENT",
      "COMMUNITY PROJECT",
      "ENGINEERING ECONOMICS",
      "HUBUNGAN ETNIK (FOR LOCAL STUDENTS)",
      "INTRODUCTION TO FRENCH",
      "INTRODUCTION TO GERMAN LANGUAGE",
      "INTRODUCTION TO JAPANESE",
      "INTRODUCTION TO KOREAN",
      "LEADERSHIP AND TEAMBUILDING",
      "MALAYSIAN STUDIES 3 (FOR INTERNATIONAL STUDENTS)",
      "STRUCTURAL ANALYSIS I",
      "SUN ZI'S ART OF WAR AND BUSINESS STRATEGIES",
      "TAMADUN ISLAM DAN TAMADUN ASIA (TITAS)",
      "WATER AND WASTEWATER TREATMENT",
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
        [0, 0, 0, 48, 0, 0, 0],
      ];
      const input1 = GetTinySlotsOf("UEMX3653"); // WWT
      expect(input1.map((x) => x.DayTimeMatrix)).to.deep.eq(expected);
    });
  });
});
