import {expect} from "chai";
const isEqual = require("lodash.isequal");
import {ToggleIsOpenOfSlotsTable} from "./../actions/toggleIsOpenOfSlotsTable";
import {IMasterState, MasterStateReducer, NewMasterState} from "./../reducers/masterState";
describe("ToggleIsOpenOfSlotsTable action", () => {
    it("'s typename should be 'open slots table' when passed in true", () => {
        const action = new ToggleIsOpenOfSlotsTable(true);
        expect(action.TypeName()).to.eq("open slots table");
    });

    it("'s typename should be 'close slots table' when passed in false", () => {
        const action = new ToggleIsOpenOfSlotsTable(false);
        expect(action.TypeName()).to.eq("close slots table");
    });

    it("should set IsOpen of SlotTableState property", () => {
        const action = new ToggleIsOpenOfSlotsTable(true);
        const initialState = NewMasterState();
        expect(initialState.SlotTableState.IsOpen).to.eq(false);
        const newState = MasterStateReducer(initialState, action);
        expect(newState.SlotTableState.IsOpen).to.eq(true);
    });
});
