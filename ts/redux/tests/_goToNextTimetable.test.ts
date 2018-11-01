import {expect} from "chai";
import { Timetable } from "../../model/timetable";
import { GetTestRawSlot1 } from "../../tests/testDataGenerator";
import { NewTimetableListState } from "../reducers/timetableListState";
import { GoToNextTimetable } from "./../actions/goToNextTimetable";
import {IMasterState, MasterStateReducer, NewMasterState} from "./../reducers/masterState";

function getInitialState(timetables: Timetable[]): IMasterState {
    const result = NewMasterState();
    result.TimetableListState = NewTimetableListState(timetables, GetTestRawSlot1());
    return result;
}

describe("goToNextTimetable action", () => {
    it("'s name shold be 'go to next timetable'", () => {
        expect(new GoToNextTimetable().TypeName()).to.eq("go to next timetable");
    });

    it("should increment the current index", () => {
        const initialState = getInitialState([NullTimetable, NullTimetable]);
        const newState = MasterStateReducer(initialState, new GoToNextTimetable());
        expect(newState.TimetableListState.CurrentIndex).to.eq(1);
    });

    it("should increment the current index cyclically", () => {
        const initialState = getInitialState([NullTimetable, NullTimetable, NullTimetable]);
        initialState.TimetableListState.CurrentIndex = 2;
        const newState = MasterStateReducer(initialState, new GoToNextTimetable());
        expect(newState.TimetableListState.CurrentIndex).to.eq(0);
    });
});

export const NullTimetable: Timetable = {
    State: [],
    Uids: [0]
}