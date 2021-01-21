"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const isEqual = require("lodash.isequal");
const toggleIsOpenOfSlotsTable_1 = require("./../actions/toggleIsOpenOfSlotsTable");
const masterState_1 = require("./../reducers/masterState");
describe("ToggleIsOpenOfSlotsTable action", () => {
    it("'s typename should be 'open slots table' when passed in true", () => {
        const action = new toggleIsOpenOfSlotsTable_1.ToggleIsOpenOfSlotsTable(true);
        chai_1.expect(action.TypeName()).to.eq("open slots table");
    });
    it("'s typename should be 'close slots table' when passed in false", () => {
        const action = new toggleIsOpenOfSlotsTable_1.ToggleIsOpenOfSlotsTable(false);
        chai_1.expect(action.TypeName()).to.eq("close slots table");
    });
    it("should set IsOpen of SlotTableState property", () => {
        const action = new toggleIsOpenOfSlotsTable_1.ToggleIsOpenOfSlotsTable(true);
        const initialState = masterState_1.NewMasterState();
        chai_1.expect(initialState.SlotTableState.IsOpen).to.eq(false);
        const newState = masterState_1.MasterStateReducer(initialState, action);
        chai_1.expect(newState.SlotTableState.IsOpen).to.eq(true);
    });
    it("should close the snackbar", () => {
        const action = new toggleIsOpenOfSlotsTable_1.ToggleIsOpenOfSlotsTable(true);
        const initialState = masterState_1.NewMasterState();
        initialState.SnackbarState.IsOpen = true;
        chai_1.expect(initialState.SnackbarState.IsOpen).to.eq(true);
        const newState = masterState_1.MasterStateReducer(initialState, action);
        chai_1.expect(newState.SnackbarState.IsOpen).to.eq(false);
    });
});
//# sourceMappingURL=_toggleIsOpenOfSlotsTable.test.js.map