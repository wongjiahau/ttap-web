import {expect} from "chai";
import {isEqual} from "lodash";
import {SaveTimetableAsTextFile} from "./../actions/saveTimetableAsTextFile";
import {ITimetableListState, TimetableListState, TimetableListStateReducer} from "./../reducers/timetableListState";
describe("SaveTimetableAsTextFile action", () => {
    it("'s typename should be 'save timetable as text file'", () => {
        const action = new SaveTimetableAsTextFile();
        expect(action.TypeName()).to.eq("save timetable as text file");
    });

    it("should return the same state as previous", () => {
        const initialState = new TimetableListState();
        const newState = TimetableListStateReducer(initialState, new SaveTimetableAsTextFile().Action());
        expect(initialState).to.deep.eq(newState);
    });

});
