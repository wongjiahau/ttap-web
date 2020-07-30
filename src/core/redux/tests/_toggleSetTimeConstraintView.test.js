"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const isEqual = require("lodash.isequal");
const toggleSetTimeConstraintView_1 = require("./../actions/toggleSetTimeConstraintView");
const masterState_1 = require("./../reducers/masterState");
describe("OpenSetTimeConstraintView action", () => {
    it("'s typename should be 'open set time constraint view' if passed in true", () => {
        const action = new toggleSetTimeConstraintView_1.ToggleSetTimeConstraintView(true);
        chai_1.expect(action.TypeName()).to.eq("open set time constraint view");
    });
    it("'s typename should be 'close set time constraint view' if passed in false", () => {
        const action = new toggleSetTimeConstraintView_1.ToggleSetTimeConstraintView(false);
        chai_1.expect(action.TypeName()).to.eq("close set time constraint view");
    });
    it("should set IsOpen property of SetTimeConstraintState to true when passed in true", () => {
        const action = new toggleSetTimeConstraintView_1.ToggleSetTimeConstraintView(true);
        const initialState = masterState_1.NewMasterState();
        chai_1.expect(initialState.SetTimeConstraintState.IsOpen).to.eq(false);
        const newState = masterState_1.MasterStateReducer(initialState, action);
        chai_1.expect(newState.SetTimeConstraintState.IsOpen).to.eq(true);
    });
    it("should set IsOpen property of SetTimeConstraintState to true when passed in false", () => {
        const action = new toggleSetTimeConstraintView_1.ToggleSetTimeConstraintView(true);
        const initialState = masterState_1.NewMasterState();
        let newState = masterState_1.MasterStateReducer(initialState, action);
        chai_1.expect(newState.SetTimeConstraintState.IsOpen).to.eq(true);
        newState = masterState_1.MasterStateReducer(initialState, new toggleSetTimeConstraintView_1.ToggleSetTimeConstraintView(false));
        chai_1.expect(newState.SetTimeConstraintState.IsOpen).to.eq(false);
    });
});
//# sourceMappingURL=_toggleSetTimeConstraintView.test.js.map