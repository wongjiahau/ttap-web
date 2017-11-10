import {expect} from "chai";
import {isEqual} from "lodash";
import { OpenSaveDialog } from "../../../actions/openSaveDialog";
import {ITimetableListState, TimetableListState, TimetableListStateReducer} from "./../../../reducers/timetableListState";
import { MockSaveTimetable } from "./../saveTimetable";

describe("SaveTimetable action", () => {
    it("should set IsSaveDialogOpen property to false", () => {
        const initialState = new TimetableListState();
        let newState = TimetableListStateReducer(initialState, new OpenSaveDialog().Action());
        expect(newState.IsSaveDialogOpen).to.eq(true);
        newState = TimetableListStateReducer(newState, new MockSaveTimetable().Action());
        expect(newState.IsSaveDialogOpen).to.eq(false);
    });
});
