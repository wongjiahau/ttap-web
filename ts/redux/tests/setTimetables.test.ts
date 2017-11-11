import {expect} from "chai";
import { SetTimetables } from "./../actions/setTimetables";
import { TimetableListState, TimetableListStateReducer } from "./../reducers/timetableListState";

describe("setSubjects action", () => {
    it("'s type name should be 'set timetables'", () => {
        const action = new SetTimetables(null);
        expect(action.TypeName())
            .to
            .eq("set timetables");
    });

    it("should set the property of FilteredTimetables", () => {
        const initialState = new TimetableListState();
        const newState = TimetableListStateReducer(initialState, new SetTimetables([null, null]).Action());
        expect(newState.FilteredTimetables.length).to.eq(2);
    });

    it("should set the property of AllTimetables", () => {
        const initialState = new TimetableListState();
        const newState = TimetableListStateReducer(initialState, new SetTimetables([null, null]).Action());
        expect(newState.AllTimetables.length).to.eq(2);
    });

});
