import * as React from "react";
import * as ReactDOM from "react-dom";
import { CreateSlotViewModels } from "../../model/slotViewModel";
import { ParseRawSlotToSlot } from "../../parser/parseRawSlotToSlot";
import { ParseSlotToTinySlot } from "../../parser/parseSlotToTinySlot";
import { FindTimetable } from "../../permutator/findTimetable";
import { CodeOf } from "../../tests/testData/heng_2017_sept";
import {
  GetTinySlotsOf,
  MockRawSlotStore,
} from "../../tests/testDataGenerator";
import { TimetableSummaryView } from "../timetableSummaryView";
const find = require("lodash.find");

describe("<TimetableSummaryView/>", () => {
  it("should render without error", () => {
    const div = document.createElement("div");
    const rawSlotStore = MockRawSlotStore;
    const rawSlots = rawSlotStore
      .GetAll()
      .filter((x) => x.SubjectCode === CodeOf.BEAM);
    const slots = ParseRawSlotToSlot(rawSlots);
    const tinyslots = ParseSlotToTinySlot(ParseRawSlotToSlot(rawSlots));
    const timetable = FindTimetable(tinyslots)[0];
    const slotViewModels = CreateSlotViewModels(
      rawSlotStore.GetBunch(timetable.SlotUids)
    );
    ReactDOM.render(<TimetableSummaryView slots={slotViewModels} />, div);
  });
});
