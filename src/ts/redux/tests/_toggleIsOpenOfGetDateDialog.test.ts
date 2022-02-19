import { expect } from "chai";
const isEqual = require("lodash.isequal");
import { ToggleIsOpenOfGetDateDialog } from "./../actions/toggleIsOpenOfGetDateDialog";
import {
  IMasterState,
  MasterStateReducer,
  NewMasterState,
} from "./../reducers/masterState";
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
    const action = new ToggleIsOpenOfGetDateDialog(true);
    const initialState = NewMasterState();
    expect(initialState.SaveTimetableDialogState.IsGetDateDialogOpen).to.eq(
      false
    );
    const newState = MasterStateReducer(initialState, action);
    expect(newState.SaveTimetableDialogState.IsGetDateDialogOpen).to.eq(true);
  });
});
