"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const isEqual = require("lodash.isequal");
const toggleIsOpenOfSummary_1 = require("./../actions/toggleIsOpenOfSummary");
const masterState_1 = require("./../reducers/masterState");
describe("ToggleIsOpenOfSummary action", () => {
    it("'s typename should be 'toggle is open of summary'", () => {
        const action = new toggleIsOpenOfSummary_1.ToggleIsOpenOfSummary();
        chai_1.expect(action.TypeName()).to.eq("toggle is open of summary");
    });
    it("should set IsSummaryOpen to true if it is intially false", () => {
        const initialState = masterState_1.NewMasterState(false);
        chai_1.expect(initialState.TimetableListState.IsSummaryOpen).to.eq(false);
        const newState = masterState_1.MasterStateReducer(initialState, new toggleIsOpenOfSummary_1.ToggleIsOpenOfSummary());
        chai_1.expect(newState.TimetableListState.IsSummaryOpen).to.eq(true);
    });
    it("should set IsSummaryOpen to false if it is intially true", () => {
        const initialState = masterState_1.NewMasterState(false);
        let newState = masterState_1.MasterStateReducer(initialState, new toggleIsOpenOfSummary_1.ToggleIsOpenOfSummary());
        chai_1.expect(newState.TimetableListState.IsSummaryOpen).to.eq(true);
        newState = masterState_1.MasterStateReducer(newState, new toggleIsOpenOfSummary_1.ToggleIsOpenOfSummary());
        chai_1.expect(newState.TimetableListState.IsSummaryOpen).to.eq(false);
    });
    it("should set IsSummaryOpen based on passed in argument (1)", () => {
        const initialState = masterState_1.NewMasterState(false);
        chai_1.expect(initialState.TimetableListState.IsSummaryOpen).to.eq(false);
        const newState = masterState_1.MasterStateReducer(initialState, new toggleIsOpenOfSummary_1.ToggleIsOpenOfSummary(true));
        chai_1.expect(newState.TimetableListState.IsSummaryOpen).to.eq(true);
    });
    it("should set IsSummaryOpen based on passed in argument (2)", () => {
        const initialState = masterState_1.NewMasterState(false);
        let newState = masterState_1.MasterStateReducer(initialState, new toggleIsOpenOfSummary_1.ToggleIsOpenOfSummary());
        chai_1.expect(newState.TimetableListState.IsSummaryOpen).to.eq(true);
        newState = masterState_1.MasterStateReducer(newState, new toggleIsOpenOfSummary_1.ToggleIsOpenOfSummary(false));
        chai_1.expect(newState.TimetableListState.IsSummaryOpen).to.eq(false);
    });
});
//# sourceMappingURL=_toggleIsOpenOfSummary.test.js.map