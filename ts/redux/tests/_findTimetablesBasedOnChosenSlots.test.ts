import { expect } from "chai";
const isEqual = require("lodash.isequal");
import { RawSlot } from "../../model/rawSlot";
import { DiffReport } from "../../model/subjectSchema";
import {
  CodeOf,
  HENG_2017_APR,
  IndexOf,
} from "../../tests/testData/heng_2017_apr";
import { GetMockInitialState } from "../../tests/testDataGenerator";
import { NotifyDataLoaded } from "../actions/notifyDataLoaded";
import { ToggleSelectionOnGroupOfSlots } from "../actions/toggleSelectionOnGroupOfSlots";
import { ToggleSelectionOnSpecificSlot } from "../actions/toggleSelectionOnSpecificSlot";
import { ToggleSubjectSelection } from "../actions/toggleSubjectSelection";
import { UpdateSlotsTableState } from "../actions/updateSlotsTableState";
import { NewSubjectListState } from "../reducers/subjectListState";
import {
  FindTimetablesBasedOnChosenSlots,
  GetSlotsFromSlotNumbers,
} from "./../actions/findTimetablesBasedOnChosenSlots";
import {
  IMasterState,
  MasterStateReducer,
  NewMasterState,
} from "./../reducers/masterState";

describe("FindTimetablesBasedOnChosenSlots action", () => {
  it("'s typename should be 'find timetables based on chosen slots'", () => {
    const action = new FindTimetablesBasedOnChosenSlots();
    expect(action.TypeName()).to.eq("find timetables based on chosen slots");
  });

  it("should set property of FiltrateTimetables and ResidueTimetables if there are no error", () => {
    const initialState = GetMockInitialState("heng_2017_apr");
    let newState = MasterStateReducer(
      initialState,
      new ToggleSubjectSelection(IndexOf.HE)
    );
    newState = MasterStateReducer(newState, new UpdateSlotsTableState());
    expect(newState.TimetableListState.FiltrateTimetables).to.have.lengthOf(4);
    newState = MasterStateReducer(
      newState,
      new ToggleSelectionOnSpecificSlot("1", true, CodeOf.HE)
    );
    newState = MasterStateReducer(
      newState,
      new FindTimetablesBasedOnChosenSlots()
    );
    expect(newState.SlotTableState.ErrorMessages).to.deep.eq(null);
    expect(newState.TimetableListState.FiltrateTimetables).to.have.lengthOf(3);
    expect(newState.TimetableListState.ResidueTimetables).to.have.lengthOf(0);
  });

  it("should set ErrorMessages property of SlotsTableState if there are schema intolerance(1)", () => {
    const initialState = GetMockInitialState("heng_2017_apr");
    let newState = MasterStateReducer(
      initialState,
      new ToggleSubjectSelection(IndexOf.BKA)
    );
    newState = MasterStateReducer(
      newState,
      new ToggleSubjectSelection(IndexOf.HE)
    );
    newState = MasterStateReducer(newState, new UpdateSlotsTableState());
    newState = MasterStateReducer(
      newState,
      new ToggleSelectionOnGroupOfSlots(CodeOf.BKA)
    );
    newState = MasterStateReducer(
      newState,
      new FindTimetablesBasedOnChosenSlots()
    );
    expect(newState.SlotTableState.ErrorMessages).to.deep.eq([
      new DiffReport(CodeOf.BKA, "L"),
    ]);
  });

  it("should set ErrorMessages of SlotsTableState if there are schema intolerance(2)", () => {
    const initialState = GetMockInitialState("heng_2017_apr");
    let newState = MasterStateReducer(
      initialState,
      new ToggleSubjectSelection(IndexOf.BEAM)
    );
    newState = MasterStateReducer(newState, new UpdateSlotsTableState());
    newState = MasterStateReducer(
      newState,
      new ToggleSelectionOnGroupOfSlots(CodeOf.BEAM)
    );
    newState = MasterStateReducer(
      newState,
      new FindTimetablesBasedOnChosenSlots()
    );
    expect(newState.SlotTableState.ErrorMessages).to.deep.eq([
      new DiffReport(CodeOf.BEAM, "L"),
      new DiffReport(CodeOf.BEAM, "T"),
    ]);
  });

  it("should set ErrorMessages of SlotsTableState if there are schema intolerance(3)", () => {
    const initialState = GetMockInitialState("heng_2017_apr");
    let newState = MasterStateReducer(
      initialState,
      new ToggleSubjectSelection(IndexOf.ACD)
    );
    newState = MasterStateReducer(
      newState,
      new ToggleSubjectSelection(IndexOf.SA2)
    );
    newState = MasterStateReducer(newState, new UpdateSlotsTableState());
    newState = MasterStateReducer(
      newState,
      new ToggleSelectionOnGroupOfSlots(CodeOf.ACD)
    );
    // 239 is the slot number for L-1 of Structural Analysis
    newState = MasterStateReducer(
      newState,
      new ToggleSelectionOnSpecificSlot("239", true, CodeOf.SA2)
    );
    newState = MasterStateReducer(
      newState,
      new FindTimetablesBasedOnChosenSlots()
    );
    expect(newState.SlotTableState.ErrorMessages).to.deep.eq([
      new DiffReport(CodeOf.ACD, "L"),
      new DiffReport(CodeOf.SA2, "L"),
    ]);
  });

  it("should set ErrorMessages of SlotsTableState if no possible timetable is found even thought the schema is tolerated", () => {
    const initialState = GetMockInitialState("heng_2017_apr");
    let newState = MasterStateReducer(
      initialState,
      new ToggleSubjectSelection(IndexOf.ACD)
    );
    newState = MasterStateReducer(
      newState,
      new ToggleSubjectSelection(IndexOf.HE)
    );
    newState = MasterStateReducer(newState, new UpdateSlotsTableState());
    newState = MasterStateReducer(
      newState,
      new ToggleSelectionOnGroupOfSlots(CodeOf.HE)
    );
    newState = MasterStateReducer(
      newState,
      new ToggleSelectionOnSpecificSlot("2", false, CodeOf.HE)
    );
    newState = MasterStateReducer(
      newState,
      new FindTimetablesBasedOnChosenSlots()
    );
    expect(newState.SlotTableState.ErrorMessages).to.deep.eq([
      new DiffReport("", "no possible timetables found"),
    ]);
  });

  it("should set IsOpen property of SlotTableState to false if there are no errors", () => {
    const initialState = GetMockInitialState("heng_2017_apr");
    let newState = MasterStateReducer(
      initialState,
      new ToggleSubjectSelection(IndexOf.ACP)
    );
    newState = MasterStateReducer(newState, new UpdateSlotsTableState());
    newState = MasterStateReducer(
      newState,
      new FindTimetablesBasedOnChosenSlots()
    );
    expect(newState.SlotTableState.ErrorMessages).to.eq(null);
    expect(newState.SlotTableState.IsOpen).to.eq(false);
  });

  it("should notify user about number of timetables found if there are no errors", () => {
    const initialState = GetMockInitialState("heng_2017_apr");
    let newState = MasterStateReducer(
      initialState,
      new ToggleSubjectSelection(IndexOf.ACP)
    );
    newState = MasterStateReducer(newState, new UpdateSlotsTableState());
    newState = MasterStateReducer(
      newState,
      new FindTimetablesBasedOnChosenSlots()
    );
    expect(newState.SlotTableState.ErrorMessages).to.eq(null);
    expect(newState.SnackbarState.IsOpen).to.eq(true);
    expect(newState.SnackbarState.Message).to.eq(
      "1 possible timetables found."
    );
  });
});

describe("GetSlotsFromSlotNumbers", () => {
  it("case 1", () => {
    const testSlots = HENG_2017_APR();
    const result = GetSlotsFromSlotNumbers(testSlots, ["1", "151"]);
    expect(result).to.have.lengthOf(3);
    const expected = [
      {
        Uid: 1,
        SubjectCode: "MPU3113",
        SubjectName: "Hubungan Etnik (for Local Students)",
        Number: "1",
        Type: "L",
        Group: "1",
        Day: "Mon",
        TimePeriod: "  9:00 AM - 12:00 PM",
        WeekNumber: "1-14",
        Room: "KB521",
      },
      {
        Uid: 154,
        SubjectCode: "UEME2123",
        SubjectName: "Fluid Mechanics I",
        Number: "151",
        Type: "L",
        Group: "1",
        Day: "Mon",
        TimePeriod: " 10:00 AM - 12:00 PM",
        WeekNumber: "1-14",
        Room: "KB209",
      },
      {
        Uid: 155,
        SubjectCode: "UEME2123",
        SubjectName: "Fluid Mechanics I",
        Number: "151",
        Type: "L",
        Group: "1",
        Day: "Thu",
        TimePeriod: "  1:00 PM -  2:00 PM",
        WeekNumber: "1-14",
        Room: "KB207",
      },
    ];
    expect(result).to.deep.eq(expected);
  });
});
