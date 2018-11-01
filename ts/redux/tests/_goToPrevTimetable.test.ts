import { expect } from "chai";
import { Timetable } from "../../model/timetable";
import { GetTestRawSlot1 } from "../../tests/testDataGenerator";
import { NewTimetableListState } from "../reducers/timetableListState";
import { GoToPrevTimetable } from "./../actions/goToPrevTimetable";
import { IMasterState, MasterStateReducer, NewMasterState } from "./../reducers/masterState";
import { NullTimetable } from "./_goToNextTimetable.test";

function getInitialState(timetables: Timetable[]): IMasterState {
    const result = NewMasterState();
    result.TimetableListState = NewTimetableListState(timetables, GetTestRawSlot1());
    return result;
}

describe("goToPrevTimetable action", () => {

    it("'s name shold be 'go to previous timetable'", () => {
        expect(new GoToPrevTimetable().TypeName()).to.eq("go to previous timetable");
    });

    it("should decrement the current index", () => {
        const initialState = getInitialState([NullTimetable, NullTimetable]);
        initialState.TimetableListState.CurrentIndex = 1;
        const newState = MasterStateReducer(initialState, new GoToPrevTimetable());
        expect(newState.TimetableListState.CurrentIndex).to.eq(0);
    });

    it("decrement the current index cyclically", () => {
        const initialState = getInitialState([NullTimetable,NullTimetable,NullTimetable]);
        const newState = MasterStateReducer(initialState, new GoToPrevTimetable());
        expect(newState.TimetableListState.CurrentIndex).to.eq(2);
    });

});
