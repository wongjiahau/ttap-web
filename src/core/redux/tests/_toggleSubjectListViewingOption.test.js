"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const testDataGenerator_1 = require("./../../tests/testDataGenerator");
const isEqual = require("lodash.isequal");
const heng_2017_sept_1 = require("../../tests/testData/heng_2017_sept");
const masterState_1 = require("../reducers/masterState");
const toggleSubjectListViewingOption_1 = require("./../actions/toggleSubjectListViewingOption");
const toggleSubjectSelection_1 = require("./../actions/toggleSubjectSelection");
describe("ToggleSubjectListViewingOption", () => {
    it("the initial value of IsShowingSelectedSubject should be false", () => {
        const initialState = testDataGenerator_1.GetMockInitialState();
        chai_1.expect(initialState.SubjectListState.IsShowingSelectedSubjectOnly).to.eq(false);
    });
    it("should toggle property IsShowingSelectedSubjectOnly from false to true", () => {
        const initialState = testDataGenerator_1.GetMockInitialState();
        const newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectListViewingOption_1.ToggleSubjectListViewingOptions());
        chai_1.expect(newState.SubjectListState.IsShowingSelectedSubjectOnly)
            .to
            .eq(true);
    });
    it("should toggle property IsShowingSelectedSubjectOnly from true to false", () => {
        const initialState = testDataGenerator_1.GetMockInitialState();
        const newState1 = masterState_1.MasterStateReducer(initialState, new toggleSubjectListViewingOption_1.ToggleSubjectListViewingOptions());
        const newState2 = masterState_1.MasterStateReducer(initialState, new toggleSubjectListViewingOption_1.ToggleSubjectListViewingOptions());
        chai_1.expect(newState2.SubjectListState.IsShowingSelectedSubjectOnly)
            .to
            .eq(true);
    });
    it("should make selected subject visible and deselected subject invisible when first toggled", () => {
        const initialState = testDataGenerator_1.GetMockInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.HE));
        newState = masterState_1.MasterStateReducer(newState, new toggleSubjectListViewingOption_1.ToggleSubjectListViewingOptions());
        chai_1.expect(newState.SubjectListState.Subjects.filter((s) => s.IsVisible)).to.have.lengthOf(1);
    });
    it("should make all subjects visible when toggled again", () => {
        const initialState = testDataGenerator_1.GetMockInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.HE));
        newState = masterState_1.MasterStateReducer(newState, new toggleSubjectListViewingOption_1.ToggleSubjectListViewingOptions());
        newState = masterState_1.MasterStateReducer(newState, new toggleSubjectListViewingOption_1.ToggleSubjectListViewingOptions());
        chai_1.expect(newState.SubjectListState.Subjects.filter((s) => s.IsVisible)).
            to.have.lengthOf(newState.SubjectListState.Subjects.length);
    });
});
//# sourceMappingURL=_toggleSubjectListViewingOption.test.js.map