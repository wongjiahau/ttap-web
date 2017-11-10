import {expect} from "chai";
import {isEqual} from "lodash";
import { OpenSaveDialog } from "../actions/openSaveDialog";
import {SaveTimetableAsImage} from "./../actions/saveTimetableAsImage";
import {ITimetableListState, TimetableListState, TimetableListStateReducer} from "./../reducers/timetableListState";
describe("SaveTimetableAsImage action", () => {
    it("'s typename should be 'save timetable as - image'", () => {
        const action = new SaveTimetableAsImage();
        expect(action.TypeName()).to.eq("save timetable as - image");
    });

    it("should set IsSaveDialogOpen property to false", () => {
        const initialState = new TimetableListState();
        let newState = TimetableListStateReducer(initialState, new OpenSaveDialog().Action());
        expect(newState.IsSaveDialogOpen).to.eq(true);
        newState = TimetableListStateReducer(newState, new SaveTimetableAsImage().Action());
        expect(newState.IsSaveDialogOpen).to.eq(false);
    });
});
