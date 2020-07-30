"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const isEqual = require("lodash.isequal");
const toggleIsOpenOfSaveDialog_1 = require("./../actions/toggleIsOpenOfSaveDialog");
const masterState_1 = require("./../reducers/masterState");
describe("ToggleIsOpenOfSaveDialog action", () => {
    it("'s typename should be 'open save dialog' if passed in true", () => {
        const action = new toggleIsOpenOfSaveDialog_1.ToggleIsOpenOfSaveDialog(true);
        chai_1.expect(action.TypeName()).to.eq("open save dialog");
    });
    it("'s typename should be 'close save dialog' if passed in false", () => {
        const action = new toggleIsOpenOfSaveDialog_1.ToggleIsOpenOfSaveDialog(false);
        chai_1.expect(action.TypeName()).to.eq("close save dialog");
    });
    it("should set IsMainDialogOpen property", () => {
        const action = new toggleIsOpenOfSaveDialog_1.ToggleIsOpenOfSaveDialog(true);
        const initialState = masterState_1.NewMasterState();
        chai_1.expect(initialState.SaveTimetableDialogState.IsMainDialogOpen).to.eq(false);
        const newState = masterState_1.MasterStateReducer(initialState, action);
        chai_1.expect(newState.SaveTimetableDialogState.IsMainDialogOpen).to.eq(true);
    });
});
//# sourceMappingURL=_toggleIsOpenOfSaveDialog.test.js.map