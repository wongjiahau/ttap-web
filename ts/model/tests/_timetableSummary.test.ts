import { expect } from "chai";
import { ObjectStore } from "../../dataStructure/objectStore";
import { ParseRawSlotToSlot } from "../../parser/parseRawSlotToSlot";
import { ParseSlotToTinySlot } from "../../parser/parseSlotToTinySlot";
import { FindTimetable } from "../../permutator/findTimetable";
import { CodeOf, HENG_2017_APR } from "../../tests/testData/heng_2017_apr";
import { CreateSlotViewModels } from "../slotViewModel";
import {
  GetTinySlotsOf,
  MockRawSlotStore,
} from "./../../tests/testDataGenerator";
import { TimetableSummary } from "./../timetableSummary";

describe("TimetableSummary", () => {
  describe("constructor", () => {
    it("should have X SubjectSummaries if the passed in timetable have X subjects", () => {
      // 2 subjects
      const input1 = GetTinySlotsOf("UKMM1043"); // BEAM
      const input2 = GetTinySlotsOf("UEMX3653"); // WWT
      const timetables = FindTimetable(input1.concat(input2));
      const svm = CreateSlotViewModels(
        MockRawSlotStore.GetBunch(timetables[0].SlotUids)
      );
      const timetableSummary = new TimetableSummary(svm);
      expect(timetableSummary.SubjectSummaries.length).to.eq(2);
    });
  });

  describe("ToString()", () => {
    it("case 1", () => {
      // 2 subjects
      const input1 = GetTinySlotsOf("UKMM1043"); // BEAM
      const input2 = GetTinySlotsOf("UEMX3653"); // WWT
      const timetables = FindTimetable(input1.concat(input2));
      const svm = CreateSlotViewModels(
        MockRawSlotStore.GetBunch(timetables[0].SlotUids)
      );
      const timetableSummary = new TimetableSummary(svm);
      expect(timetableSummary.ToString().split("\r\n")).to.deep.eq([
        "UEMX3653",
        "Water & Wastewater Treatment",
        "    L(1) - KB208",
        "    T(1) - KB326",
        "    -",
        "",
        "UKMM1043",
        "Basic Economics, Accounting & Management",
        "    L(1) - KB209",
        "    T(1) - KB517",
        "    -",
        "",
        "",
      ]);
    });
  });

  it("case 1", () => {
    // 1 subjects
    const input1 = GetTinySlotsOf("UEMX3653"); // BEAM
    const timetables = FindTimetable(input1);
    const svm = CreateSlotViewModels(
      MockRawSlotStore.GetBunch(timetables[0].SlotUids)
    );
    const timetableSummary = new TimetableSummary(svm);
    const subjectSummary1 = timetableSummary.SubjectSummaries[0];
    expect(subjectSummary1.SubjectCode).to.eq("UEMX3653");
    expect(subjectSummary1.SubjectName).to.eq("Water & Wastewater Treatment");
    expect(subjectSummary1.Lecture).to.eq("L(1) - KB208");
    expect(subjectSummary1.Tutorial).to.eq("T(1) - KB326");
    expect(subjectSummary1.Practical).to.eq("-");
  });

  it("case 2", () => {
    // 2 subjects
    const input1 = GetTinySlotsOf("UKMM1043"); // BEAM
    const input2 = GetTinySlotsOf("UEMX3653"); // WWT
    const timetables = FindTimetable(input1.concat(input2));
    const svm = CreateSlotViewModels(
      MockRawSlotStore.GetBunch(timetables[0].SlotUids)
    );
    const timetableSummary = new TimetableSummary(svm);
    const subjectSummary1 = timetableSummary.SubjectSummaries[0];
    expect(subjectSummary1.SubjectCode).to.eq("UEMX3653");
    expect(subjectSummary1.SubjectName).to.eq("Water & Wastewater Treatment");
    expect(subjectSummary1.Lecture).to.eq("L(1) - KB208");
    expect(subjectSummary1.Tutorial).to.eq("T(1) - KB326");
    expect(subjectSummary1.Practical).to.eq("-");
    expect(subjectSummary1.CreditHour).to.eq(3);
  });

  it("case 3", () => {
    const rawSlots = HENG_2017_APR().filter(
      (x) => x.SubjectCode === CodeOf.ACD
    );
    const slots = ParseRawSlotToSlot(rawSlots);
    const tinyslots = ParseSlotToTinySlot(ParseRawSlotToSlot(rawSlots));
    const timetable = FindTimetable(tinyslots)[0];
    const svm = CreateSlotViewModels(
      MockRawSlotStore.GetBunch(timetable.SlotUids)
    );
    const timetableSummary = new TimetableSummary(svm);
    expect(timetableSummary.SubjectSummaries).to.have.lengthOf(1);
  });

  it("test sort by scarcity", () => {
    // Refer heng_2017_sept.ts for number of slots for each subjects
    const rawSlotStore = new ObjectStore(HENG_2017_APR());
    const input1 = HENG_2017_APR().filter((x) => x.SubjectCode === CodeOf.FM1);
    const input2 = HENG_2017_APR().filter((x) => x.SubjectCode === CodeOf.HT);
    const timetables = FindTimetable(
      ParseSlotToTinySlot(ParseRawSlotToSlot(input1.concat(input2)))
    );
    const svm = CreateSlotViewModels(
      rawSlotStore.GetBunch(timetables[0].SlotUids)
    );
    const unsortedTimetableSummary = new TimetableSummary(svm);

    expect(
      unsortedTimetableSummary.SubjectSummaries.map((x) => x.SubjectCode)
    ).to.deep.eq([
      CodeOf.FM1, // 47 slots
      CodeOf.HT, // 27 slots
    ]);

    const sortedTimetableSummary = unsortedTimetableSummary.SortByScarcity(
      rawSlotStore.GetAll()
    );
    expect(
      sortedTimetableSummary.SubjectSummaries.map((x) => x.SubjectCode)
    ).to.deep.eq([
      CodeOf.HT, // 27 slots
      CodeOf.FM1, // 47 slots
    ]);
  });
});
