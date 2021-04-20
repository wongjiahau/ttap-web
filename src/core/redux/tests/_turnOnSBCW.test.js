"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const isEqual = require("lodash.isequal");
const findTimetable_1 = require("../../permutator/findTimetable");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const toggleIsOpenOfSBCWDialog_1 = require("../actions/toggleIsOpenOfSBCWDialog");
const turnOnSBCW_1 = require("./../actions/turnOnSBCW");
const masterState_1 = require("./../reducers/masterState");
const turnOffSBCW_1 = require("../actions/turnOffSBCW");
describe("Turn on SBCW", () => {
    it("'s typename should be 'turn on search by considering week number'", () => {
        const action = new turnOnSBCW_1.TurnOnSBCW();
        chai_1.expect(action.TypeName()).to.eq("turn on search by considering week number");
    });
    it("should set SearchByConsideringWeekNumber to true ", () => {
        const initialState = testDataGenerator_1.GetMockInitialState();
        chai_1.expect(initialState.SettingsState.SearchByConsideringWeekNumber).to.eq(true);
        const newState = masterState_1.MasterStateReducer(initialState, new turnOffSBCW_1.TurnOffSBCW());
        chai_1.expect(newState.SettingsState.SearchByConsideringWeekNumber).to.eq(false);
        const newState2 = masterState_1.MasterStateReducer(newState, new turnOnSBCW_1.TurnOnSBCW());
        chai_1.expect(newState2.SettingsState.SearchByConsideringWeekNumber).to.eq(true);
    });
    it("should set TimetableFinder to FindTimetableByConsideringWeekNumber", () => {
        const initialState = masterState_1.MasterStateReducer(testDataGenerator_1.GetMockInitialState(), new turnOffSBCW_1.TurnOffSBCW());
        const newState = masterState_1.MasterStateReducer(initialState, new turnOnSBCW_1.TurnOnSBCW());
        chai_1.expect(newState.SettingsState.TimetableFinder.toString())
            .to.eq(findTimetable_1.FindTimetableByConsideringWeekNumber.toString());
    });
    it("should set IsOpen of SBCWDialog to false", () => {
        const initialState = testDataGenerator_1.GetMockInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new toggleIsOpenOfSBCWDialog_1.ToggleIsOpenOfSBCWDialog(true));
        chai_1.expect(newState.SbcwDialogState.IsOpen).to.eq(true);
        newState = masterState_1.MasterStateReducer(newState, new turnOnSBCW_1.TurnOnSBCW());
        chai_1.expect(newState.SbcwDialogState.IsOpen).to.eq(false);
    });
    it("should set RawSlotDataRouter to route from 'ungeneralized' slot", () => {
        const initialState = masterState_1.MasterStateReducer(testDataGenerator_1.GetMockInitialState(), new turnOffSBCW_1.TurnOffSBCW());
        chai_1.expect(initialState.DataState.RawSlotDataRouter.GetCurrentRoute()).to.eq("generalized");
        const newState = masterState_1.MasterStateReducer(initialState, new turnOnSBCW_1.TurnOnSBCW());
        chai_1.expect(newState.DataState.RawSlotDataRouter.GetCurrentRoute()).to.eq("ungeneralized");
    });
});
//# sourceMappingURL=_turnOnSBCW.test.js.map