"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isEqual = require("lodash.isequal");
const chai_1 = require("chai");
const heng_2017_apr_1 = require("../../../../tests/testData/heng_2017_apr");
const testDataGenerator_1 = require("../../../../tests/testDataGenerator");
const toggleIsOpenOfGetDateDialog_1 = require("../../toggleIsOpenOfGetDateDialog");
const toggleIsOpenOfSaveDialog_1 = require("../../toggleIsOpenOfSaveDialog");
const toggleSubjectSelection_1 = require("../../toggleSubjectSelection");
const masterState_1 = require("./../../../reducers/masterState");
const saveTimetable_1 = require("./../saveTimetable");
describe("SaveTimetable action", () => {
    it("should set IsMainDialogOpen property to false", () => {
        const initialState = testDataGenerator_1.GetMockInitialState("heng_2017_apr");
        let newState = masterState_1.MasterStateReducer(initialState, new toggleIsOpenOfSaveDialog_1.ToggleIsOpenOfSaveDialog(true));
        newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.ASSD));
        chai_1.expect(newState.SaveTimetableDialogState.IsMainDialogOpen).to.eq(true);
        newState = masterState_1.MasterStateReducer(newState, new saveTimetable_1.MockSaveTimetable());
        chai_1.expect(newState.SaveTimetableDialogState.IsMainDialogOpen).to.eq(false);
    });
    it("should set IsGetDateDialogOpen property to false", () => {
        const initialState = testDataGenerator_1.GetMockInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new toggleIsOpenOfGetDateDialog_1.ToggleIsOpenOfGetDateDialog(true));
        newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.ASSD));
        chai_1.expect(newState.SaveTimetableDialogState.IsGetDateDialogOpen).to.eq(true);
        newState = masterState_1.MasterStateReducer(newState, new saveTimetable_1.MockSaveTimetable());
        chai_1.expect(newState.SaveTimetableDialogState.IsGetDateDialogOpen).to.eq(false);
    });
});
//# sourceMappingURL=_saveTimetable.test.js.map