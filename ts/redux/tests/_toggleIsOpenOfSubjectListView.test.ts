import { expect } from "chai";
const isEqual = require("lodash.isequal");
import { ToggleIsOpenOfSubjectListView } from "../actions/toggleIsOpenOfSubjectListView";
import { MasterStateReducer, NewMasterState } from "../reducers/masterState";

describe("toggle visiblity of subject list view action", () => {
  it("'s typeName should be 'open subject list view' when passed in true", () => {
    const action = new ToggleIsOpenOfSubjectListView(true);
    expect(action.TypeName()).to.eq("open subject list view");
  });

  it("'s typeName should be 'close subject list view' when passed in false", () => {
    const action = new ToggleIsOpenOfSubjectListView(false);
    expect(action.TypeName()).to.eq("close subject list view");
  });

  it("should toggle property IsOpen of SubjectListState to true when passed in true", () => {
    const initialState = NewMasterState();
    expect(initialState.SubjectListState.IsOpen).to.eq(false);
    const newState = MasterStateReducer(
      initialState,
      new ToggleIsOpenOfSubjectListView(true)
    );
    expect(newState.SubjectListState.IsOpen).to.eq(true);
  });

  it("should toggle property IsOpen of SubjectListState to false when passed in false", () => {
    const initialState = NewMasterState();
    let newState = MasterStateReducer(
      initialState,
      new ToggleIsOpenOfSubjectListView(true)
    );
    newState = MasterStateReducer(
      newState,
      new ToggleIsOpenOfSubjectListView(false)
    );
    expect(newState.SubjectListState.IsOpen).to.eq(false);
  });
});
