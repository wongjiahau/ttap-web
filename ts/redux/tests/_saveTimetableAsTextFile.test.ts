import {expect} from "chai";
import {isEqual} from "lodash";
import { OpenSaveDialog } from "./../actions/openSaveDialog";
import {SaveTimetableAsTextFile} from "./../actions/saveTimetableAsTextFile";
import {ITimetableListState, TimetableListState, TimetableListStateReducer} from "./../reducers/timetableListState";
describe("SaveTimetableAsTextFile action", () => {
    it("'s typename should be 'save timetable as - text file'", () => {
        const action = new SaveTimetableAsTextFile();
        expect(action.TypeName()).to.eq("save timetable as - text file");
    });

    it("should set IsSaveDialogOpen property to false", () => {
        const initialState = new TimetableListState();
        let newState = TimetableListStateReducer(initialState, new OpenSaveDialog().Action());
        expect(newState.IsSaveDialogOpen).to.eq(true);
        newState = TimetableListStateReducer(newState, new SaveTimetableAsTextFile().Action());
        expect(newState.IsSaveDialogOpen).to.eq(false);
    });

});
