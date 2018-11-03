import {expect} from "chai";
import { MasterStateReducer, NewMasterState } from "../reducers/masterState";
import { SetTimetables } from "./../actions/setTimetables";
import { NullGroupedTimetable } from "./_goToNextTimetable.test";

describe("setSubjects action", () => {
    it("'s type name should be 'set timetables'", () => {
        const action = new SetTimetables([]);
        expect(action.TypeName())
            .to
            .eq("set timetables");
    });

    it("should set the property of FilteredTimetables", () => {
        const initialState = NewMasterState();
        const newState = MasterStateReducer(initialState, new SetTimetables([NullGroupedTimetable, NullGroupedTimetable]));
        expect(newState.TimetableListState.FiltrateTimetables.length).to.eq(2);
    });

    it("should set the property of AllTimetables", () => {
        const initialState = NewMasterState();
        const newState = MasterStateReducer(initialState, new SetTimetables([NullGroupedTimetable, NullGroupedTimetable]));
        expect(newState.TimetableListState.ResidueTimetables.length).to.eq(2);
    });

});
