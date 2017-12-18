import {
    expect
} from "chai";

const isEqual = require("lodash.isequal");
import {
    FindTimetableByConsideringWeekNumber
} from "../../permutator/findTimetable";
import { HENG_2017_APR, IndexOf } from "../../tests/testData/heng_2017_apr";
import { NotifyDataLoaded } from "../actions/notifyDataLoaded";
import {
    ToggleIsOpenOfSBCWDialog
} from "../actions/toggleIsOpenOfSBCWDialog";
import { ToggleSubjectSelection } from "../actions/toggleSubjectSelection";
import {
    TurnOnSBCW
} from "./../actions/turnOnSBCW";
import {
    IMasterState,
    MasterStateReducer,
    NewMasterState
} from "./../reducers/masterState";
describe("TurnOnSBCW action", () => {
    it("'s typename should be 'turn on search by considering week number'", () => {
        const action = new TurnOnSBCW();
        expect(action.TypeName()).to.eq("turn on search by considering week number");
    });

    it("should set SearchByConsideringWeekNumber to true ", () => {
        const initialState = NewMasterState();
        expect(initialState.SettingsState.SearchByConsideringWeekNumber).to.eq(false);
        const newState = MasterStateReducer(initialState, new TurnOnSBCW());
        expect(newState.SettingsState.SearchByConsideringWeekNumber).to.eq(true);
    });

    it("should set TimetableFinder to FindTimetableByConsideringWeekNumber", () => {
        const initialState = NewMasterState();
        expect(initialState.SettingsState.SearchByConsideringWeekNumber).to.eq(false);
        const newState = MasterStateReducer(initialState, new TurnOnSBCW());
        expect(newState.SettingsState.TimetableFinder.toString())
            .to.eq(FindTimetableByConsideringWeekNumber.toString());
    });

    it("should set IsOpen of SBCWDialog to false", () => {
        const initialState = NewMasterState();
        let newState = MasterStateReducer(initialState, new ToggleIsOpenOfSBCWDialog(true));
        expect(newState.SbcwDialogState.IsOpen).to.eq(true);
        newState = MasterStateReducer(newState, new TurnOnSBCW());
        expect(newState.SbcwDialogState.IsOpen).to.eq(false);
    });
});
