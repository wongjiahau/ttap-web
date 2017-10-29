import {expect} from "chai";
import { SetTimetables } from "./../actions/setTimetables";
import { TimetableListState, TimetableListReducer } from "./../reducers/timetableListState";

describe("setSubjects action", () => {
    it("'s type name should be 'set timetables'", () => {
        const action = new SetTimetables(null);
        expect(action.TypeName())
            .to
            .eq("set timetables");
    });

    it("should set the subjects of ISubjectListState", () => {
        const initialState = new TimetableListState();
        const newState = TimetableListReducer(initialState, new SetTimetables([null, null]).Action());
        expect(newState.Timetables.length).to.eq(2);
    });

});
