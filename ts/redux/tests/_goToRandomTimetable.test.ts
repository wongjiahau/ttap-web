import { expect } from "chai";
const isEqual = require("lodash.isequal");
import { Timetable } from "../../model/timetable";
import { GetTestRawSlot1 } from "../../tests/testDataGenerator";
import { NewTimetableListState } from "../reducers/timetableListState";
import { GoToRandomTimetable } from "./../actions/goToRandomTimetable";
import { IMasterState, MasterStateReducer, NewMasterState } from "./../reducers/masterState";

function getInitialState(timetables: Timetable[]): IMasterState {
    const result = NewMasterState();
    result.TimetableListState = NewTimetableListState(timetables, GetTestRawSlot1());
    return result;
}

describe("GoToRandomTimetable action", () => {
    it("'s typename should be 'go to random timetable'", () => {
        const action = new GoToRandomTimetable();
        expect(action.TypeName()).to.eq("go to random timetable");
    });

    it("should set the TimetableListState.CurrentIndex property to a random value", () => {
        const action = new GoToRandomTimetable();
        const initialState = getInitialState([null, null, null]);
        const newState = MasterStateReducer(initialState, action);
        expect(newState.TimetableListState.CurrentIndex)
            .to.most(newState.TimetableListState.FiltrateTimetables.length - 1);
        expect(newState.TimetableListState.CurrentIndex).to.least(0);
    });

    it("should set the TimetableListState.CurrentIndex to a value that is different from previous TimetableListState.CurrentIndex", () => {
        const action = new GoToRandomTimetable();
        const initialState = getInitialState([null, null, null]);
        const newState = MasterStateReducer(initialState, action);
        expect(newState.TimetableListState.CurrentIndex).to.not.eq(initialState.TimetableListState.CurrentIndex);
    });

    it("should not loop infinitely when there is only one timetable", () => {
        const action = new GoToRandomTimetable();
        const initialState = getInitialState([null]);
        expect(() => {
            const newState = MasterStateReducer(initialState, action);
        }).to.not.throw();
    });
});
