import {expect} from "chai";
import {isEqual} from "lodash";
import {ToggleIsOpenOfSaveDialog} from "./../actions/toggleIsOpenOfSaveDialog";
import {ISaveTimetableDialogState, SaveTimetableDialogState, SaveTimetableDialogStateReducer} from "./../reducers/saveTimetableDialogState";
describe("ToggleIsOpenOfSaveDialog action", () => {
    it("'s typename should be 'open save dialog' if passed in true", () => {
        const action = new ToggleIsOpenOfSaveDialog(true);
        expect(action.TypeName()).to.eq("open save dialog");
    });

    it("'s typename should be 'close save dialog' if passed in false", () => {
        const action = new ToggleIsOpenOfSaveDialog(false);
        expect(action.TypeName()).to.eq("close save dialog");
    });

    it("should set IsMainDialogOpen property", () => {
        const action = new ToggleIsOpenOfSaveDialog(true).Action();
        const initialState = new SaveTimetableDialogState();
        expect(initialState.IsMainDialogOpen).to.eq(false);
        const newState = SaveTimetableDialogStateReducer(initialState, action);
        expect(newState.IsMainDialogOpen).to.eq(true);
    });
});
