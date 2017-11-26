import {
    expect
} from "chai";
import {
    isEqual
} from "lodash";
import {
    GetTestSubjects1
} from "../../tests/testDataGenerator";
import {
    HideSnackbar
} from "./../actions/hideSnackbar";
import {
    ITimetableCreatorState,
    TimetableCreatorState,
    TimetableCreatorStateReducer
} from "./../reducers/timetableCreatorState";

describe("HideSnackbar action", () => {
    it("'s typename should be 'hide snackbar'", () => {
        const action = new HideSnackbar();
        expect(action.TypeName()).to.eq("hide snackbar");
    });

    it("should set IsSnackbarVisible to false", () => {
        const action = new HideSnackbar().Action();
        const initialState = new TimetableCreatorState(GetTestSubjects1());
        initialState.IsSnackbarVisible = true;
        expect(initialState.IsSnackbarVisible).to.eq(true);
        const newState = TimetableCreatorStateReducer(initialState, action);
        expect(newState.IsSnackbarVisible).to.eq(false);
    });
});
