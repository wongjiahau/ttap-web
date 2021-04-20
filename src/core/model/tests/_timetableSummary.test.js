"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const objectStore_1 = require("../../dataStructure/objectStore");
const parseRawSlotToSlot_1 = require("../../parser/parseRawSlotToSlot");
const parseSlotToTinySlot_1 = require("../../parser/parseSlotToTinySlot");
const findTimetable_1 = require("../../permutator/findTimetable");
const heng_2017_apr_1 = require("../../tests/testData/heng_2017_apr");
const slotViewModel_1 = require("../slotViewModel");
const testDataGenerator_1 = require("./../../tests/testDataGenerator");
const timetableSummary_1 = require("./../timetableSummary");
describe("TimetableSummary", () => {
    describe("constructor", () => {
        it("should have X SubjectSummaries if the passed in timetable have X subjects", () => {
            // 2 subjects
            const input1 = testDataGenerator_1.GetTinySlotsOf("UKMM1043"); // BEAM
            const input2 = testDataGenerator_1.GetTinySlotsOf("UEMX3653"); // WWT
            const timetables = findTimetable_1.FindTimetable(input1.concat(input2));
            const svm = slotViewModel_1.CreateSlotViewModels(testDataGenerator_1.MockRawSlotStore.GetBunch(timetables[0].SlotUids));
            const timetableSummary = new timetableSummary_1.TimetableSummary(svm);
            chai_1.expect(timetableSummary.SubjectSummaries.length).to.eq(2);
        });
    });
    describe("ToString()", () => {
        it("case 1", () => {
            // 2 subjects
            const input1 = testDataGenerator_1.GetTinySlotsOf("UKMM1043"); // BEAM
            const input2 = testDataGenerator_1.GetTinySlotsOf("UEMX3653"); // WWT
            const timetables = findTimetable_1.FindTimetable(input1.concat(input2));
            const svm = slotViewModel_1.CreateSlotViewModels(testDataGenerator_1.MockRawSlotStore.GetBunch(timetables[0].SlotUids));
            const timetableSummary = new timetableSummary_1.TimetableSummary(svm);
            chai_1.expect(timetableSummary.ToString().split('\r\n')).to.deep.eq([
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
                ""
            ]);
        });
    });
    it("case 1", () => {
        // 1 subjects
        const input1 = testDataGenerator_1.GetTinySlotsOf("UEMX3653"); // BEAM
        const timetables = findTimetable_1.FindTimetable(input1);
        const svm = slotViewModel_1.CreateSlotViewModels(testDataGenerator_1.MockRawSlotStore.GetBunch(timetables[0].SlotUids));
        const timetableSummary = new timetableSummary_1.TimetableSummary(svm);
        const subjectSummary1 = timetableSummary.SubjectSummaries[0];
        chai_1.expect(subjectSummary1.SubjectCode).to.eq("UEMX3653");
        chai_1.expect(subjectSummary1.SubjectName).to.eq("Water & Wastewater Treatment");
        chai_1.expect(subjectSummary1.Lecture).to.eq("L(1) - KB208");
        chai_1.expect(subjectSummary1.Tutorial).to.eq("T(1) - KB326");
        chai_1.expect(subjectSummary1.Practical).to.eq("-");
    });
    it("case 2", () => {
        // 2 subjects
        const input1 = testDataGenerator_1.GetTinySlotsOf("UKMM1043"); // BEAM
        const input2 = testDataGenerator_1.GetTinySlotsOf("UEMX3653"); // WWT
        const timetables = findTimetable_1.FindTimetable(input1.concat(input2));
        const svm = slotViewModel_1.CreateSlotViewModels(testDataGenerator_1.MockRawSlotStore.GetBunch(timetables[0].SlotUids));
        const timetableSummary = new timetableSummary_1.TimetableSummary(svm);
        const subjectSummary1 = timetableSummary.SubjectSummaries[0];
        chai_1.expect(subjectSummary1.SubjectCode).to.eq("UEMX3653");
        chai_1.expect(subjectSummary1.SubjectName).to.eq("Water & Wastewater Treatment");
        chai_1.expect(subjectSummary1.Lecture).to.eq("L(1) - KB208");
        chai_1.expect(subjectSummary1.Tutorial).to.eq("T(1) - KB326");
        chai_1.expect(subjectSummary1.Practical).to.eq("-");
        chai_1.expect(subjectSummary1.CreditHour).to.eq(3);
    });
    it("case 3", () => {
        const rawSlots = heng_2017_apr_1.HENG_2017_APR().filter((x) => x.SubjectCode === heng_2017_apr_1.CodeOf.ACD);
        const slots = parseRawSlotToSlot_1.ParseRawSlotToSlot(rawSlots);
        const tinyslots = parseSlotToTinySlot_1.ParseSlotToTinySlot(parseRawSlotToSlot_1.ParseRawSlotToSlot(rawSlots));
        const timetable = findTimetable_1.FindTimetable(tinyslots)[0];
        const svm = slotViewModel_1.CreateSlotViewModels(testDataGenerator_1.MockRawSlotStore.GetBunch(timetable.SlotUids));
        const timetableSummary = new timetableSummary_1.TimetableSummary(svm);
        chai_1.expect(timetableSummary.SubjectSummaries).to.have.lengthOf(1);
    });
    it("test sort by scarcity", () => {
        // Refer heng_2017_sept.ts for number of slots for each subjects
        const rawSlotStore = new objectStore_1.ObjectStore(heng_2017_apr_1.HENG_2017_APR());
        const input1 = heng_2017_apr_1.HENG_2017_APR().filter((x) => x.SubjectCode === heng_2017_apr_1.CodeOf.FM1);
        const input2 = heng_2017_apr_1.HENG_2017_APR().filter((x) => x.SubjectCode === heng_2017_apr_1.CodeOf.HT);
        const timetables = findTimetable_1.FindTimetable(parseSlotToTinySlot_1.ParseSlotToTinySlot(parseRawSlotToSlot_1.ParseRawSlotToSlot(input1.concat(input2))));
        const svm = slotViewModel_1.CreateSlotViewModels(rawSlotStore.GetBunch(timetables[0].SlotUids));
        const unsortedTimetableSummary = new timetableSummary_1.TimetableSummary(svm);
        chai_1.expect(unsortedTimetableSummary.SubjectSummaries.map((x) => x.SubjectCode)).to.deep.eq([
            heng_2017_apr_1.CodeOf.FM1,
            heng_2017_apr_1.CodeOf.HT,
        ]);
        const sortedTimetableSummary = unsortedTimetableSummary.SortByScarcity(rawSlotStore.GetAll());
        chai_1.expect(sortedTimetableSummary.SubjectSummaries.map((x) => x.SubjectCode)).to.deep.eq([
            heng_2017_apr_1.CodeOf.HT,
            heng_2017_apr_1.CodeOf.FM1,
        ]);
    });
});
//# sourceMappingURL=_timetableSummary.test.js.map