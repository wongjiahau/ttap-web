import {expect} from "chai";
import {isEqual} from "lodash";
import {ToggleIsOpenOfSlotsTable} from "./../actions/toggleIsOpenOfSlotsTable";
import {ITimetableCreatorState, TimetableCreatorState, TimetableCreatorStateReducer} from "./../reducers/timetableCreatorState";
describe("ToggleIsOpenOfSlotsTable action", () => {
    it("'s typename should be 'open slots table' when passed in true", () => {
        const action = new ToggleIsOpenOfSlotsTable(true);
        expect(action.TypeName()).to.eq("open slots table");
    });

    it("'s typename should be 'close slots table' when passed in false", () => {
        const action = new ToggleIsOpenOfSlotsTable(false);
        expect(action.TypeName()).to.eq("close slots table");
    });

    it("should set IsSlotsTableVisible property", () => {
        const action = new ToggleIsOpenOfSlotsTable(true).Action();
        const initialState = new TimetableCreatorState(null);
        expect(initialState.IsSlotsTableVisible).to.eq(false);
        const newState = TimetableCreatorStateReducer(initialState, action);
        expect(newState.IsSlotsTableVisible).to.eq(true);
    });
});
