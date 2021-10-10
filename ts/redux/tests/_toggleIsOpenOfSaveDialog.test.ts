import { expect } from "chai";
const isEqual = require("lodash.isequal");
import { ToggleIsOpenOfSaveDialog } from "./../actions/toggleIsOpenOfSaveDialog";
import {
  IMasterState,
  MasterStateReducer,
  NewMasterState,
} from "./../reducers/masterState";

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
    const action = new ToggleIsOpenOfSaveDialog(true);
    const initialState = NewMasterState();
    expect(initialState.SaveTimetableDialogState.IsMainDialogOpen).to.eq(false);
    const newState = MasterStateReducer(initialState, action);
    expect(newState.SaveTimetableDialogState.IsMainDialogOpen).to.eq(true);
  });
});
