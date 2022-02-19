import { expect } from "chai";
import { GetMockInitialState } from "./../../tests/testDataGenerator";

const isEqual = require("lodash.isequal");
import { IndexOf } from "../../tests/testData/heng_2017_sept";
import { GetTestSubjects1 } from "../../tests/testDataGenerator";
import {
  IMasterState,
  MasterStateReducer,
  NewMasterState,
} from "../reducers/masterState";
import { NewSubjectListState } from "../reducers/subjectListState";
import { ToggleSubjectListViewingOptions } from "./../actions/toggleSubjectListViewingOption";
import { ToggleSubjectSelection } from "./../actions/toggleSubjectSelection";

describe("ToggleSubjectListViewingOption", () => {
  it("the initial value of IsShowingSelectedSubject should be false", () => {
    const initialState = GetMockInitialState();
    expect(initialState.SubjectListState.IsShowingSelectedSubjectOnly).to.eq(
      false
    );
  });

  it("should toggle property IsShowingSelectedSubjectOnly from false to true", () => {
    const initialState = GetMockInitialState();
    const newState = MasterStateReducer(
      initialState,
      new ToggleSubjectListViewingOptions()
    );
    expect(newState.SubjectListState.IsShowingSelectedSubjectOnly).to.eq(true);
  });

  it("should toggle property IsShowingSelectedSubjectOnly from true to false", () => {
    const initialState = GetMockInitialState();
    const newState1 = MasterStateReducer(
      initialState,
      new ToggleSubjectListViewingOptions()
    );
    const newState2 = MasterStateReducer(
      initialState,
      new ToggleSubjectListViewingOptions()
    );
    expect(newState2.SubjectListState.IsShowingSelectedSubjectOnly).to.eq(true);
  });

  it("should make selected subject visible and deselected subject invisible when first toggled", () => {
    const initialState = GetMockInitialState();
    let newState = MasterStateReducer(
      initialState,
      new ToggleSubjectSelection(IndexOf.HE)
    );
    newState = MasterStateReducer(
      newState,
      new ToggleSubjectListViewingOptions()
    );
    expect(
      newState.SubjectListState.Subjects.filter((s) => s.IsVisible)
    ).to.have.lengthOf(1);
  });

  it("should make all subjects visible when toggled again", () => {
    const initialState = GetMockInitialState();
    let newState = MasterStateReducer(
      initialState,
      new ToggleSubjectSelection(IndexOf.HE)
    );
    newState = MasterStateReducer(
      newState,
      new ToggleSubjectListViewingOptions()
    );
    newState = MasterStateReducer(
      newState,
      new ToggleSubjectListViewingOptions()
    );
    expect(
      newState.SubjectListState.Subjects.filter((s) => s.IsVisible)
    ).to.have.lengthOf(newState.SubjectListState.Subjects.length);
  });
});
