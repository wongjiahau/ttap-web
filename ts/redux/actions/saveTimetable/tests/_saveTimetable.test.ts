const isEqual = require("lodash.isequal");
import {expect} from "chai";
import { GetTestRawSlot1, GetTestTimetables1 } from "../../../../tests/testDataGenerator";
import { NewTimetableListState } from "../../../reducers/timetableListState";
import { ToggleIsOpenOfGetDateDialog } from "../../toggleIsOpenOfGetDateDialog";
import {ToggleIsOpenOfSaveDialog} from "../../toggleIsOpenOfSaveDialog";
import {IMasterState, MasterStateReducer, NewMasterState} from "./../../../reducers/masterState";
import {MockSaveTimetable} from "./../saveTimetable";

function getInitialState() : IMasterState {
    return {
        ...NewMasterState(),
        TimetableListState: NewTimetableListState(GetTestTimetables1(), GetTestRawSlot1())
    };
}

describe("SaveTimetable action", () => {
    it("should set IsMainDialogOpen property to false", () => {
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleIsOpenOfSaveDialog(true));
        expect(newState.SaveTimetableDialogState.IsMainDialogOpen).to.eq(true);
        newState = MasterStateReducer(newState, new MockSaveTimetable());
        expect(newState.SaveTimetableDialogState.IsMainDialogOpen).to.eq(false);
    });

    it("should set IsGetDateDialogOpen property to false", () => {
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleIsOpenOfGetDateDialog(true));
        expect(newState.SaveTimetableDialogState.IsGetDateDialogOpen).to.eq(true);
        newState = MasterStateReducer(newState, new MockSaveTimetable());
        expect(newState.SaveTimetableDialogState.IsGetDateDialogOpen).to.eq(false);
    });
});
