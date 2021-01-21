"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const isEqual = require("lodash.isequal");
const hideSnackbar_1 = require("./../actions/hideSnackbar");
const masterState_1 = require("./../reducers/masterState");
describe("HideSnackbar action", () => {
    it("'s typename should be 'hide snackbar'", () => {
        const action = new hideSnackbar_1.HideSnackbar();
        chai_1.expect(action.TypeName()).to.eq("hide snackbar");
    });
    it("should set SnackbarState.IsOpento false", () => {
        const action = new hideSnackbar_1.HideSnackbar();
        const initialState = masterState_1.NewMasterState();
        initialState.SnackbarState.IsOpen = true;
        chai_1.expect(initialState.SnackbarState.IsOpen).to.eq(true);
        const newState = masterState_1.MasterStateReducer(initialState, action);
        chai_1.expect(newState.SnackbarState.IsOpen).to.eq(false);
    });
});
//# sourceMappingURL=_hideSnackbar.test.js.map