"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const isEqual = require("lodash.isequal");
const toggleIsOpenOfSubjectListView_1 = require("../actions/toggleIsOpenOfSubjectListView");
const masterState_1 = require("../reducers/masterState");
describe("toggle visiblity of subject list view action", () => {
    it("'s typeName should be 'open subject list view' when passed in true", () => {
        const action = new toggleIsOpenOfSubjectListView_1.ToggleIsOpenOfSubjectListView(true);
        chai_1.expect(action.TypeName()).to.eq("open subject list view");
    });
    it("'s typeName should be 'close subject list view' when passed in false", () => {
        const action = new toggleIsOpenOfSubjectListView_1.ToggleIsOpenOfSubjectListView(false);
        chai_1.expect(action.TypeName()).to.eq("close subject list view");
    });
    it("should toggle property IsOpen of SubjectListState to true when passed in true", () => {
        const initialState = masterState_1.NewMasterState();
        chai_1.expect(initialState.SubjectListState.IsOpen).to.eq(false);
        const newState = masterState_1.MasterStateReducer(initialState, new toggleIsOpenOfSubjectListView_1.ToggleIsOpenOfSubjectListView(true));
        chai_1.expect(newState.SubjectListState.IsOpen).to.eq(true);
    });
    it("should toggle property IsOpen of SubjectListState to false when passed in false", () => {
        const initialState = masterState_1.NewMasterState();
        let newState = masterState_1.MasterStateReducer(initialState, new toggleIsOpenOfSubjectListView_1.ToggleIsOpenOfSubjectListView(true));
        newState = masterState_1.MasterStateReducer(newState, new toggleIsOpenOfSubjectListView_1.ToggleIsOpenOfSubjectListView(false));
        chai_1.expect(newState.SubjectListState.IsOpen).to.eq(false);
    });
});
//# sourceMappingURL=_toggleIsOpenOfSubjectListView.test.js.map