import {expect} from "chai";
import { GoToNextTimetable } from "./../actions/goToNextTimetable";
import {TimetableListState, TimetableListReducer} from "./../reducers/timetableListState";

describe("goToNextTimetable action", () => {

    it("'s name shold be 'go to next timetable'", () => {
        expect(new GoToNextTimetable().TypeName())
            .to
            .eq("go to next timetable");
    });

    it("increment the current index", () => {
        const initialState = new TimetableListState([null, null]);
        const newState = TimetableListReducer(initialState, new GoToNextTimetable().Action());
        expect(newState.CurrentIndex)
            .to
            .eq(1);
    });

    it("increment the current index cyclically", () => {
        const initialState = new TimetableListState([null, null, null]);
        initialState.CurrentIndex = 2;
        const newState = TimetableListReducer(initialState, new GoToNextTimetable().Action());
        expect(newState.CurrentIndex)
            .to
            .eq(0);
    });

    it("should set the CurrentTimetable property", () => {
        const initialState = new TimetableListState([undefined, null]);
        const newState = TimetableListReducer(initialState, new GoToNextTimetable().Action());
        expect(initialState.CurrentTimetable)
            .to
            .eq(undefined);
        expect(newState.CurrentTimetable)
            .to
            .eq(null);
    });

});
