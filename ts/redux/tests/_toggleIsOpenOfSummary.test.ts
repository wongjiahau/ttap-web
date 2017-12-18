import {expect} from "chai";
const isEqual = require("lodash.isequal");
import {ToggleIsOpenOfSummary} from "./../actions/toggleIsOpenOfSummary";
import {IMasterState, MasterStateReducer, NewMasterState} from "./../reducers/masterState";
describe("ToggleIsOpenOfSummary action", () => {
    it("'s typename should be 'toggle is open of summary'", () => {
        const action = new ToggleIsOpenOfSummary();
        expect(action.TypeName()).to.eq("toggle is open of summary");
    });

    it("should set IsSummaryOpen to true if it is intially false", () => {
        const initialState = NewMasterState();
        expect(initialState.TimetableListState.IsSummaryOpen).to.eq(false);
        const newState = MasterStateReducer(initialState, new ToggleIsOpenOfSummary());
        expect(newState.TimetableListState.IsSummaryOpen).to.eq(true);
    });

    it("should set IsSummaryOpen to false if it is intially true", () => {
        const initialState = NewMasterState();
        let newState = MasterStateReducer(initialState, new ToggleIsOpenOfSummary());
        expect(newState.TimetableListState.IsSummaryOpen).to.eq(true);
        newState = MasterStateReducer(newState, new ToggleIsOpenOfSummary());
        expect(newState.TimetableListState.IsSummaryOpen).to.eq(false);
    });

    it("should set IsSummaryOpen based on passed in argument (1)", () => {
        const initialState = NewMasterState();
        expect(initialState.TimetableListState.IsSummaryOpen).to.eq(false);
        const newState = MasterStateReducer(initialState, new ToggleIsOpenOfSummary(true));
        expect(newState.TimetableListState.IsSummaryOpen).to.eq(true);
    });

    it("should set IsSummaryOpen based on passed in argument (2)", () => {
        const initialState = NewMasterState();
        let newState = MasterStateReducer(initialState, new ToggleIsOpenOfSummary());
        expect(newState.TimetableListState.IsSummaryOpen).to.eq(true);
        newState = MasterStateReducer(newState, new ToggleIsOpenOfSummary(false));
        expect(newState.TimetableListState.IsSummaryOpen).to.eq(false);
    });

});
