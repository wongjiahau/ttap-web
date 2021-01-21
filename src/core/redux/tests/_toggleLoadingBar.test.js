"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const isEqual = require("lodash.isequal");
const toggleLoadingBar_1 = require("./../actions/toggleLoadingBar");
const masterState_1 = require("./../reducers/masterState");
describe("ToggleLoadingBar action", () => {
    it("'s typename should be 'toggle loading bar'", () => {
        const action = new toggleLoadingBar_1.ToggleLoadingBar(false);
        chai_1.expect(action.TypeName()).to.eq("toggle loading bar");
    });
    it("should set IsShowingLoadingBar property to true if passed in true", () => {
        const action = new toggleLoadingBar_1.ToggleLoadingBar(true);
        const initialState = masterState_1.NewMasterState();
        chai_1.expect(initialState.SubjectListState.IsShowingLoadingBar).to.eq(false);
        const newState = masterState_1.MasterStateReducer(initialState, action);
        chai_1.expect(newState.SubjectListState.IsShowingLoadingBar).to.eq(true);
    });
    it("should set IsShowingLoadingBar property to false if passed in false", () => {
        const initialState = masterState_1.NewMasterState();
        let newState = masterState_1.MasterStateReducer(initialState, new toggleLoadingBar_1.ToggleLoadingBar(true));
        chai_1.expect(newState.SubjectListState.IsShowingLoadingBar).to.eq(true);
        newState = masterState_1.MasterStateReducer(initialState, new toggleLoadingBar_1.ToggleLoadingBar(false));
        chai_1.expect(newState.SubjectListState.IsShowingLoadingBar).to.eq(false);
    });
});
//# sourceMappingURL=_toggleLoadingBar.test.js.map