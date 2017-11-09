import {expect} from "chai";
import {isEqual} from "lodash";
import {OpenSaveDialog} from "./../actions/openSaveDialog";
import {ITimetableListState, TimetableListState, TimetableListStateReducer} from "./../reducers/timetableListState";
describe("OpenSaveDialog action", () => {
    it("'s typename should be 'open save dialog'", () => {
        const action = new OpenSaveDialog();
        expect(action.TypeName()).to.eq("open save dialog");
    });

    it("should set IsSaveDialogOpen property to true", () => {
        const action = new OpenSaveDialog().Action();
        const initialState = new TimetableListState();
        expect(initialState.IsSaveDialogOpen).to.eq(false);
        const newState = TimetableListStateReducer(initialState, action);
        expect(newState.IsSaveDialogOpen).to.eq(true);
    });
});
