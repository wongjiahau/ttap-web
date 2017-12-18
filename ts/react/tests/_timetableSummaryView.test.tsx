import * as React from "react";
import * as ReactDOM from "react-dom";
import { ParseRawSlotToSlot } from "../../parser/parseRawSlotToSlot";
import { ParseSlotToTinySlot } from "../../parser/parseSlotToTinySlot";
import { FindTimetable } from "../../permutator/findTimetable";
import { CodeOf, HENG_2017_APR } from "../../tests/testData/heng_2017_apr";
import { GetTinySlotsOf } from "../../tests/testDataGenerator";
import { TimetableSummaryView } from "../timetableSummaryView";
const find = require("lodash.find");

describe("<TimetableSummaryView/>", () => {
  it("should render without error", () => {
    const div = document.createElement("div");
    const rawSlots = HENG_2017_APR().filter((x) => x.SubjectCode ===  CodeOf.ACD);
    const slots = ParseRawSlotToSlot(rawSlots);
    const tinyslots = ParseSlotToTinySlot(ParseRawSlotToSlot(rawSlots));
    const timetable = FindTimetable(tinyslots)[0];
    ReactDOM.render( <TimetableSummaryView Timetable={timetable} />,  div);
  });
});
