import {expect} from "chai";
import {isEqual} from "lodash";
import { ToggleIsOpenOfGetDateDialog } from "../../toggleIsOpenOfGetDateDialog";
import {ToggleIsOpenOfSaveDialog} from "../../toggleIsOpenOfSaveDialog";
import {UpdateSaveTimetableDialogState} from "../../updateSaveTimetableDialogState";
import {ITimetableCreatorState, TimetableCreatorState, TimetableCreatorStateReducer} from "./../../../reducers/timetableCreatorState";
import {MockSaveTimetable} from "./../saveTimetable";

describe("SaveTimetable action", () => {
    it("should set IsMainDialogOpen property to false", () => {
        const initialState = new TimetableCreatorState(null);
        let newState = TimetableCreatorStateReducer(initialState,
            new UpdateSaveTimetableDialogState(new ToggleIsOpenOfSaveDialog(true)).Action());
        expect(newState.SaveTimetableDialogState.IsMainDialogOpen).to.eq(true);
        newState = TimetableCreatorStateReducer(newState, new MockSaveTimetable().Action());
        expect(newState.SaveTimetableDialogState.IsMainDialogOpen).to.eq(false);
    });

    it("should set IsGetDateDialogOpen property to false", () => {
        const initialState = new TimetableCreatorState(null);
        let newState = TimetableCreatorStateReducer(initialState,
            new UpdateSaveTimetableDialogState(new ToggleIsOpenOfGetDateDialog(true)).Action());
        expect(newState.SaveTimetableDialogState.IsGetDateDialogOpen).to.eq(true);
        newState = TimetableCreatorStateReducer(newState, new MockSaveTimetable().Action());
        expect(newState.SaveTimetableDialogState.IsGetDateDialogOpen).to.eq(false);
    });
});
