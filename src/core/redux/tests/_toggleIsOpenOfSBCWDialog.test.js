"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const isEqual = require("lodash.isequal");
const toggleIsOpenOfSBCWDialog_1 = require("./../actions/toggleIsOpenOfSBCWDialog");
const masterState_1 = require("./../reducers/masterState");
describe("ToggleIsOpenOfSBCWDialog action", () => {
    it("'s typename should be 'turn on SBCWDialog' when passed in true", () => {
        const action = new toggleIsOpenOfSBCWDialog_1.ToggleIsOpenOfSBCWDialog(true);
        chai_1.expect(action.TypeName()).to.eq("turn on SBCWDialog");
    });
    it("'s typename should be 'turn off SBCWDialog' when passed in false", () => {
        const action = new toggleIsOpenOfSBCWDialog_1.ToggleIsOpenOfSBCWDialog(false);
        chai_1.expect(action.TypeName()).to.eq("turn off SBCWDialog");
    });
    it("should set IsOpen of SBCWDialog", () => {
        const initialState = masterState_1.NewMasterState();
        chai_1.expect(initialState.SbcwDialogState.IsOpen).to.eq(false);
        const newState = masterState_1.MasterStateReducer(initialState, new toggleIsOpenOfSBCWDialog_1.ToggleIsOpenOfSBCWDialog(true));
        chai_1.expect(newState.SbcwDialogState.IsOpen).to.eq(true);
    });
});
//# sourceMappingURL=_toggleIsOpenOfSBCWDialog.test.js.map