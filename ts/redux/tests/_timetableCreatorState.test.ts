import {expect} from "chai";
import {isEqual} from "lodash";
import {HideSnackbar} from "./../actions/HideSnackbar";
import {ITimetableCreatorState, TimetableCreatorStateReducer, TimetableCreatorState} from "./../reducers/timetableCreatorState";
describe("HideSnackbar action", () => {
    it("'s typename should be hide snackbar", () => {
        const action = new HideSnackbar();
        expect(action.TypeName()).to.eq("hide snackbar");
    });
});
