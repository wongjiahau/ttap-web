import {expect} from "chai";
import {isEqual} from "lodash";
import {CloseSaveDialog} from "./../actions/closeSaveDialog";
import { OpenSaveDialog } from "./../actions/openSaveDialog";
import {ITimetableListState, TimetableListState, TimetableListStateReducer} from "./../reducers/timetableListState";
describe("CloseSaveDialog action", () => {
    it("'s typename should be 'close save dialog'", () => {
        const action = new CloseSaveDialog();
        expect(action.TypeName()).to.eq("close save dialog");
    });

    it("should set IsSaveDialogOpen property to false", () => {
        const initialState = new TimetableListState();
        let newState = TimetableListStateReducer(initialState, new OpenSaveDialog().Action());
        expect(newState.IsSaveDialogOpen).to.eq(true);
        const action = new CloseSaveDialog().Action();
        newState = TimetableListStateReducer(initialState, action);
        expect(newState.IsSaveDialogOpen).to.eq(false);
    });
});
