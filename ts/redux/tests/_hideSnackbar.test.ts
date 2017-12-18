import {
    expect
} from "chai";
const isEqual = require("lodash.isequal");
import {
    GetTestSubjects1
} from "../../tests/testDataGenerator";
import {
    HideSnackbar
} from "./../actions/hideSnackbar";
import {
    IMasterState,
    MasterStateReducer,
    NewMasterState
} from "./../reducers/masterState";

describe("HideSnackbar action", () => {
    it("'s typename should be 'hide snackbar'", () => {
        const action = new HideSnackbar();
        expect(action.TypeName()).to.eq("hide snackbar");
    });

    it("should set SnackbarState.IsOpento false", () => {
        const action = new HideSnackbar();
        const initialState = NewMasterState();
        initialState.SnackbarState.IsOpen = true;
        expect(initialState.SnackbarState.IsOpen).to.eq(true);
        const newState = MasterStateReducer(initialState, action);
        expect(newState.SnackbarState.IsOpen).to.eq(false);
    });
});
