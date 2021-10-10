import { expect } from "chai";
import { IGroupedTimetable } from "../../model/groupedTimetable";
import { Timetable } from "../../model/timetable";
import { GetTestRawSlot1 } from "../../tests/testDataGenerator";
import { GoToPreviousSubTimetable } from "../actions/goToPreviousSubTimetable";
import { NewTimetableListState } from "../reducers/timetableListState";
import { GoToPrevTimetable } from "./../actions/goToPrevTimetable";
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

describe("goToPrevTimetable action", () => {
  it("'s name shold be 'go to previous timetable'", () => {
    expect(new GoToPrevTimetable().TypeName()).to.eq(
      "go to previous timetable"
    );
  });

  it("should decrement the CurrentIndex and reset SubCurrentIndex", () => {
    const initialState = getInitialState([
      NullGroupedTimetable,
      NullGroupedTimetable,
    ]);
    initialState.TimetableListState.CurrentIndex = 1;
    const newState = MasterStateReducer(initialState, new GoToPrevTimetable());
    expect(newState.TimetableListState.CurrentIndex).to.eq(0);
    const newState2 = MasterStateReducer(
      newState,
      new GoToPreviousSubTimetable()
    );
    expect(newState2.TimetableListState.CurrentSubIndex).to.eq(3); // Because NullGroupedTimetable.ListOfSlotUids has length of 4
    const newState3 = MasterStateReducer(newState2, new GoToPrevTimetable());
    expect(newState3.TimetableListState.CurrentSubIndex).to.eq(0); // Because NullGroupedTimetable.ListOfSlotUids has length of 4
  });

  it("decrement the CurrentIndex cyclically", () => {
    const initialState = getInitialState([
      NullGroupedTimetable,
      NullGroupedTimetable,
      NullGroupedTimetable,
    ]);
    const newState = MasterStateReducer(initialState, new GoToPrevTimetable());
    expect(newState.TimetableListState.CurrentIndex).to.eq(2);
  });
});
