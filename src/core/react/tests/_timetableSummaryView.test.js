"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const slotViewModel_1 = require("../../model/slotViewModel");
const parseRawSlotToSlot_1 = require("../../parser/parseRawSlotToSlot");
const parseSlotToTinySlot_1 = require("../../parser/parseSlotToTinySlot");
const findTimetable_1 = require("../../permutator/findTimetable");
const heng_2017_sept_1 = require("../../tests/testData/heng_2017_sept");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const timetableSummaryView_1 = require("../timetableSummaryView");
const find = require("lodash.find");
describe("<TimetableSummaryView/>", () => {
    it("should render without error", () => {
        const div = document.createElement("div");
        const rawSlotStore = testDataGenerator_1.MockRawSlotStore;
        const rawSlots = rawSlotStore.GetAll().filter((x) => x.SubjectCode === heng_2017_sept_1.CodeOf.BEAM);
        const slots = parseRawSlotToSlot_1.ParseRawSlotToSlot(rawSlots);
        const tinyslots = parseSlotToTinySlot_1.ParseSlotToTinySlot(parseRawSlotToSlot_1.ParseRawSlotToSlot(rawSlots));
        const timetable = findTimetable_1.FindTimetable(tinyslots)[0];
        const slotViewModels = slotViewModel_1.CreateSlotViewModels(rawSlotStore.GetBunch(timetable.SlotUids));
        ReactDOM.render(React.createElement(timetableSummaryView_1.TimetableSummaryView, { slots: slotViewModels }), div);
    });
});
//# sourceMappingURL=_timetableSummaryView.test.js.map