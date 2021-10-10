import { expect } from "chai";
const isEqual = require("lodash.isequal");
import { IGroupedTimetable } from "../../model/groupedTimetable";
import { GetTestRawSlot1 } from "../../tests/testDataGenerator";
import { GoToNextSubTimetable } from "../actions/goToNextSubTimetable";
import { GoToNextTimetable } from "../actions/goToNextTimetable";
import { NewTimetableListState } from "../reducers/timetableListState";
import { GoToRandomTimetable } from "./../actions/goToRandomTimetable";
import {
  IMasterState,
  MasterStateReducer,
  NewMasterState,
} from "./../reducers/masterState";
import { NullGroupedTimetable } from "./_goToNextTimetable.test";

function getInitialState(timetables: IGroupedTimetable[]): IMasterState {
  const result = NewMasterState();
  result.TimetableListState = NewTimetableListState(
    timetables,
    GetTestRawSlot1()
  );
  return result;
}

describe("GoToRandomTimetable action", () => {
  it("'s typename should be 'go to random timetable'", () => {
    const action = new GoToRandomTimetable();
    expect(action.TypeName()).to.eq("go to random timetable");
  });

  it("should set the TimetableListState.CurrentIndex property to a random value and reset the CurrentSubIndex", () => {
    const action = new GoToRandomTimetable();
    const initialState = getInitialState([
      NullGroupedTimetable,
      NullGroupedTimetable,
      NullGroupedTimetable,
    ]);
    const newState = MasterStateReducer(initialState, action);
    expect(newState.TimetableListState.CurrentIndex).to.most(
      newState.TimetableListState.FiltrateTimetables.length - 1
    );
    expect(newState.TimetableListState.CurrentIndex).to.least(0);

    const newState2 = MasterStateReducer(newState, new GoToNextSubTimetable());
    expect(newState2.TimetableListState.CurrentSubIndex).to.eq(1);
    const newState3 = MasterStateReducer(newState2, new GoToRandomTimetable());
    expect(newState3.TimetableListState.CurrentSubIndex).to.eq(0);
  });

  it("should set the TimetableListState.CurrentIndex to a value that is different from previous TimetableListState.CurrentIndex", () => {
    const action = new GoToRandomTimetable();
    const initialState = getInitialState([
      NullGroupedTimetable,
      NullGroupedTimetable,
      NullGroupedTimetable,
    ]);
    const newState = MasterStateReducer(initialState, action);
    expect(newState.TimetableListState.CurrentIndex).to.not.eq(
      initialState.TimetableListState.CurrentIndex
    );
  });

  it("should not loop infinitely when there is only one timetable", () => {
    const action = new GoToRandomTimetable();
    const initialState = getInitialState([NullGroupedTimetable]);
    expect(() => {
      const newState = MasterStateReducer(initialState, action);
    }).to.not.throw();
  });
});
