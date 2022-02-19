import { expect } from "chai";
import { IGroupedTimetable } from "../../model/groupedTimetable";
import { Timetable } from "../../model/timetable";
import { GetTestRawSlot1 } from "../../tests/testDataGenerator";
import { GoToNextSubTimetable } from "../actions/goToNextSubTimetable";
import { NewTimetableListState } from "../reducers/timetableListState";
import { GoToNextTimetable } from "./../actions/goToNextTimetable";
import {
  IMasterState,
  MasterStateReducer,
  NewMasterState,
} from "./../reducers/masterState";

function getInitialState(timetables: IGroupedTimetable[]): IMasterState {
  const result = NewMasterState();
  result.TimetableListState = NewTimetableListState(
    timetables,
    GetTestRawSlot1()
  );
  return result;
}

describe("goToNextTimetable action", () => {
  it("'s name shold be 'go to next timetable'", () => {
    expect(new GoToNextTimetable().TypeName()).to.eq("go to next timetable");
  });

  it("should increment the CurrentIndex and reset the SubCurrentIndex", () => {
    const initialState = getInitialState([
      NullGroupedTimetable,
      NullGroupedTimetable,
    ]);
    const newState = MasterStateReducer(initialState, new GoToNextTimetable());
    expect(newState.TimetableListState.CurrentIndex).to.eq(1);
    expect(newState.TimetableListState.CurrentSubIndex).to.eq(0);
    const newState2 = MasterStateReducer(newState, new GoToNextSubTimetable());
    expect(newState2.TimetableListState.CurrentSubIndex).to.eq(1);
    const newState3 = MasterStateReducer(newState2, new GoToNextTimetable());
    expect(newState3.TimetableListState.CurrentSubIndex).to.eq(0);
  });

  it("should increment the current index cyclically", () => {
    const initialState = getInitialState([
      NullGroupedTimetable,
      NullGroupedTimetable,
      NullGroupedTimetable,
    ]);
    initialState.TimetableListState.CurrentIndex = 2;
    const newState = MasterStateReducer(initialState, new GoToNextTimetable());
    expect(newState.TimetableListState.CurrentIndex).to.eq(0);
  });
});

export const NullGroupedTimetable: IGroupedTimetable = {
  DayTimeMatrix: [],
  ListOfSlotUids: [[], [], [], []],
};
