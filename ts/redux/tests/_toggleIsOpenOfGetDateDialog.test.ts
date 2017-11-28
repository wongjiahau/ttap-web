import {expect} from "chai";
import {isEqual} from "lodash";
import {ToggleIsOpenOfGetDateDialog} from "./../actions/toggleIsOpenOfGetDateDialog";
import {ISaveTimetableDialogState, SaveTimetableDialogState, SaveTimetableDialogStateReducer} from "./../reducers/saveTimetableDialogState";
describe("ToggleIsOpenOfGetDateDialog action", () => {
    it("'s typename should be 'open get date dialog' when passed in true", () => {
        const action = new ToggleIsOpenOfGetDateDialog(true);
        expect(action.TypeName()).to.eq("open get date dialog");
    });

    it("'s typename should be 'open get date dialog' when passed in false", () => {
        const action = new ToggleIsOpenOfGetDateDialog(false);
        expect(action.TypeName()).to.eq("close get date dialog");
    });

    it("should set IsGetDateDialogOpen property", () => {
        const action = new ToggleIsOpenOfGetDateDialog(true).Action();
        const initialState = new SaveTimetableDialogState();
        expect(initialState.IsGetDateDialogOpen).to.eq(false);
        const newState = SaveTimetableDialogStateReducer(initialState, action);
        expect(newState.IsGetDateDialogOpen).to.eq(true);
    });
});
