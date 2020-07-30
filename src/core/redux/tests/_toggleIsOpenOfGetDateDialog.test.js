"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const isEqual = require("lodash.isequal");
const toggleIsOpenOfGetDateDialog_1 = require("./../actions/toggleIsOpenOfGetDateDialog");
const masterState_1 = require("./../reducers/masterState");
describe("ToggleIsOpenOfGetDateDialog action", () => {
    it("'s typename should be 'open get date dialog' when passed in true", () => {
        const action = new toggleIsOpenOfGetDateDialog_1.ToggleIsOpenOfGetDateDialog(true);
        chai_1.expect(action.TypeName()).to.eq("open get date dialog");
    });
    it("'s typename should be 'open get date dialog' when passed in false", () => {
        const action = new toggleIsOpenOfGetDateDialog_1.ToggleIsOpenOfGetDateDialog(false);
        chai_1.expect(action.TypeName()).to.eq("close get date dialog");
    });
    it("should set IsGetDateDialogOpen property", () => {
        const action = new toggleIsOpenOfGetDateDialog_1.ToggleIsOpenOfGetDateDialog(true);
        const initialState = masterState_1.NewMasterState();
        chai_1.expect(initialState.SaveTimetableDialogState.IsGetDateDialogOpen).to.eq(false);
        const newState = masterState_1.MasterStateReducer(initialState, action);
        chai_1.expect(newState.SaveTimetableDialogState.IsGetDateDialogOpen).to.eq(true);
    });
});
//# sourceMappingURL=_toggleIsOpenOfGetDateDialog.test.js.map