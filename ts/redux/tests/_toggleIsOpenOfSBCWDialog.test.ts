import {expect} from "chai";
const isEqual = require("lodash.isequal");
import {ToggleIsOpenOfSBCWDialog} from "./../actions/toggleIsOpenOfSBCWDialog";
import {IMasterState, MasterStateReducer, NewMasterState} from "./../reducers/masterState";
describe("ToggleIsOpenOfSBCWDialog action", () => {
    it("'s typename should be 'turn on SBCWDialog' when passed in true", () => {
        const action = new ToggleIsOpenOfSBCWDialog(true);
        expect(action.TypeName()).to.eq("turn on SBCWDialog");
    });

    it("'s typename should be 'turn off SBCWDialog' when passed in false", () => {
        const action = new ToggleIsOpenOfSBCWDialog(false);
        expect(action.TypeName()).to.eq("turn off SBCWDialog");
    });

    it("should set IsOpen of SBCWDialog", () => {
        const initialState = NewMasterState();
        expect(initialState.SbcwDialogState.IsOpen).to.eq(false);
        const newState = MasterStateReducer(initialState, new ToggleIsOpenOfSBCWDialog(true));
        expect(newState.SbcwDialogState.IsOpen).to.eq(true);
    });
});
