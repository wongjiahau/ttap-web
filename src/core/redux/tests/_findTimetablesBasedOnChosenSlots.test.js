"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const isEqual = require("lodash.isequal");
const subjectSchema_1 = require("../../model/subjectSchema");
const heng_2017_apr_1 = require("../../tests/testData/heng_2017_apr");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const toggleSelectionOnGroupOfSlots_1 = require("../actions/toggleSelectionOnGroupOfSlots");
const toggleSelectionOnSpecificSlot_1 = require("../actions/toggleSelectionOnSpecificSlot");
const toggleSubjectSelection_1 = require("../actions/toggleSubjectSelection");
const updateSlotsTableState_1 = require("../actions/updateSlotsTableState");
const findTimetablesBasedOnChosenSlots_1 = require("./../actions/findTimetablesBasedOnChosenSlots");
const masterState_1 = require("./../reducers/masterState");
describe("FindTimetablesBasedOnChosenSlots action", () => {
    it("'s typename should be 'find timetables based on chosen slots'", () => {
        const action = new findTimetablesBasedOnChosenSlots_1.FindTimetablesBasedOnChosenSlots();
        chai_1.expect(action.TypeName()).to.eq("find timetables based on chosen slots");
    });
    it("should set property of FiltrateTimetables and ResidueTimetables if there are no error", () => {
        const initialState = testDataGenerator_1.GetMockInitialState("heng_2017_apr");
        let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.HE));
        newState = masterState_1.MasterStateReducer(newState, new updateSlotsTableState_1.UpdateSlotsTableState());
        chai_1.expect(newState.TimetableListState.FiltrateTimetables).to.have.lengthOf(4);
        newState = masterState_1.MasterStateReducer(newState, new toggleSelectionOnSpecificSlot_1.ToggleSelectionOnSpecificSlot("1", true, heng_2017_apr_1.CodeOf.HE));
        newState = masterState_1.MasterStateReducer(newState, new findTimetablesBasedOnChosenSlots_1.FindTimetablesBasedOnChosenSlots());
        chai_1.expect(newState.SlotTableState.ErrorMessages).to.deep.eq(null);
        chai_1.expect(newState.TimetableListState.FiltrateTimetables).to.have.lengthOf(3);
        chai_1.expect(newState.TimetableListState.ResidueTimetables).to.have.lengthOf(0);
    });
    it("should set ErrorMessages property of SlotsTableState if there are schema intolerance(1)", () => {
        const initialState = testDataGenerator_1.GetMockInitialState("heng_2017_apr");
        let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.BKA));
        newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.HE));
        newState = masterState_1.MasterStateReducer(newState, new updateSlotsTableState_1.UpdateSlotsTableState());
        newState = masterState_1.MasterStateReducer(newState, new toggleSelectionOnGroupOfSlots_1.ToggleSelectionOnGroupOfSlots(heng_2017_apr_1.CodeOf.BKA));
        newState = masterState_1.MasterStateReducer(newState, new findTimetablesBasedOnChosenSlots_1.FindTimetablesBasedOnChosenSlots());
        chai_1.expect(newState.SlotTableState.ErrorMessages).to.deep.eq([new subjectSchema_1.DiffReport(heng_2017_apr_1.CodeOf.BKA, "L")]);
    });
    it("should set ErrorMessages of SlotsTableState if there are schema intolerance(2)", () => {
        const initialState = testDataGenerator_1.GetMockInitialState("heng_2017_apr");
        let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.BEAM));
        newState = masterState_1.MasterStateReducer(newState, new updateSlotsTableState_1.UpdateSlotsTableState());
        newState = masterState_1.MasterStateReducer(newState, new toggleSelectionOnGroupOfSlots_1.ToggleSelectionOnGroupOfSlots(heng_2017_apr_1.CodeOf.BEAM));
        newState = masterState_1.MasterStateReducer(newState, new findTimetablesBasedOnChosenSlots_1.FindTimetablesBasedOnChosenSlots());
        chai_1.expect(newState.SlotTableState.ErrorMessages).to.deep.eq([new subjectSchema_1.DiffReport(heng_2017_apr_1.CodeOf.BEAM, "L"), new subjectSchema_1.DiffReport(heng_2017_apr_1.CodeOf.BEAM, "T")]);
    });
    it("should set ErrorMessages of SlotsTableState if there are schema intolerance(3)", () => {
        const initialState = testDataGenerator_1.GetMockInitialState("heng_2017_apr");
        let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.ACD));
        newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.SA2));
        newState = masterState_1.MasterStateReducer(newState, new updateSlotsTableState_1.UpdateSlotsTableState());
        newState = masterState_1.MasterStateReducer(newState, new toggleSelectionOnGroupOfSlots_1.ToggleSelectionOnGroupOfSlots(heng_2017_apr_1.CodeOf.ACD));
        // 239 is the slot number for L-1 of Structural Analysis
        newState = masterState_1.MasterStateReducer(newState, new toggleSelectionOnSpecificSlot_1.ToggleSelectionOnSpecificSlot("239", true, heng_2017_apr_1.CodeOf.SA2));
        newState = masterState_1.MasterStateReducer(newState, new findTimetablesBasedOnChosenSlots_1.FindTimetablesBasedOnChosenSlots());
        chai_1.expect(newState.SlotTableState.ErrorMessages).to.deep.eq([new subjectSchema_1.DiffReport(heng_2017_apr_1.CodeOf.ACD, "L"), new subjectSchema_1.DiffReport(heng_2017_apr_1.CodeOf.SA2, "L")]);
    });
    it("should set ErrorMessages of SlotsTableState if no possible timetable is found even thought the schema is tolerated", () => {
        const initialState = testDataGenerator_1.GetMockInitialState("heng_2017_apr");
        let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.ACD));
        newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.HE));
        newState = masterState_1.MasterStateReducer(newState, new updateSlotsTableState_1.UpdateSlotsTableState());
        newState = masterState_1.MasterStateReducer(newState, new toggleSelectionOnGroupOfSlots_1.ToggleSelectionOnGroupOfSlots(heng_2017_apr_1.CodeOf.HE));
        newState = masterState_1.MasterStateReducer(newState, new toggleSelectionOnSpecificSlot_1.ToggleSelectionOnSpecificSlot("2", false, heng_2017_apr_1.CodeOf.HE));
        newState = masterState_1.MasterStateReducer(newState, new findTimetablesBasedOnChosenSlots_1.FindTimetablesBasedOnChosenSlots());
        chai_1.expect(newState.SlotTableState.ErrorMessages).to.deep.eq([new subjectSchema_1.DiffReport("", "no possible timetables found")]);
    });
    it("should set IsOpen property of SlotTableState to false if there are no errors", () => {
        const initialState = testDataGenerator_1.GetMockInitialState("heng_2017_apr");
        let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.ACP));
        newState = masterState_1.MasterStateReducer(newState, new updateSlotsTableState_1.UpdateSlotsTableState());
        newState = masterState_1.MasterStateReducer(newState, new findTimetablesBasedOnChosenSlots_1.FindTimetablesBasedOnChosenSlots());
        chai_1.expect(newState.SlotTableState.ErrorMessages).to.eq(null);
        chai_1.expect(newState.SlotTableState.IsOpen).to.eq(false);
    });
    it("should notify user about number of timetables found if there are no errors", () => {
        const initialState = testDataGenerator_1.GetMockInitialState("heng_2017_apr");
        let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.ACP));
        newState = masterState_1.MasterStateReducer(newState, new updateSlotsTableState_1.UpdateSlotsTableState());
        newState = masterState_1.MasterStateReducer(newState, new findTimetablesBasedOnChosenSlots_1.FindTimetablesBasedOnChosenSlots());
        chai_1.expect(newState.SlotTableState.ErrorMessages).to.eq(null);
        chai_1.expect(newState.SnackbarState.IsOpen).to.eq(true);
        chai_1.expect(newState.SnackbarState.Message).to.eq("1 possible timetables found.");
    });
});
describe("GetSlotsFromSlotNumbers", () => {
    it("case 1", () => {
        const testSlots = heng_2017_apr_1.HENG_2017_APR();
        const result = findTimetablesBasedOnChosenSlots_1.GetSlotsFromSlotNumbers(testSlots, ["1", "151"]);
        chai_1.expect(result).to.have.lengthOf(3);
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
                Room: "KB521"
            }, {
                Uid: 154,
                SubjectCode: "UEME2123",
                SubjectName: "Fluid Mechanics I",
                Number: "151",
                Type: "L",
                Group: "1",
                Day: "Mon",
                TimePeriod: " 10:00 AM - 12:00 PM",
                WeekNumber: "1-14",
                Room: "KB209"
            }, {
                Uid: 155,
                SubjectCode: "UEME2123",
                SubjectName: "Fluid Mechanics I",
                Number: "151",
                Type: "L",
                Group: "1",
                Day: "Thu",
                TimePeriod: "  1:00 PM -  2:00 PM",
                WeekNumber: "1-14",
                Room: "KB207"
            }
        ];
        chai_1.expect(result).to.deep.eq(expected);
    });
});
//# sourceMappingURL=_findTimetablesBasedOnChosenSlots.test.js.map