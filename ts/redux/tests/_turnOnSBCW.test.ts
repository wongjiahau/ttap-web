import {
    expect
} from "chai";

const isEqual = require("lodash.isequal");
import {
    FindTimetableByConsideringWeekNumber
} from "../../permutator/findTimetable";
import { HENG_2017_APR, IndexOf } from "../../tests/testData/heng_2017_apr";
import { GetMockInitialState, GetTestRawSlot1 } from "../../tests/testDataGenerator";
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

describe("Turn on SBCW", () => {

    it("'s typename should be 'turn on search by considering week number'", () => {
        const action = new TurnOnSBCW();
        expect(action.TypeName()).to.eq("turn on search by considering week number");
    });

    it("should set SearchByConsideringWeekNumber to true ", () => {
        const initialState = GetMockInitialState();
        expect(initialState.SettingsState.SearchByConsideringWeekNumber).to.eq(false);
        const newState = MasterStateReducer(initialState, new TurnOnSBCW());
        expect(newState.SettingsState.SearchByConsideringWeekNumber).to.eq(true);
    });

    it("should set TimetableFinder to FindTimetableByConsideringWeekNumber", () => {
        const initialState = GetMockInitialState();
        expect(initialState.SettingsState.SearchByConsideringWeekNumber).to.eq(false);
        const newState = MasterStateReducer(initialState, new TurnOnSBCW());
        expect(newState.SettingsState.TimetableFinder.toString())
            .to.eq(FindTimetableByConsideringWeekNumber.toString());
    });

    it("should set IsOpen of SBCWDialog to false", () => {
        const initialState = GetMockInitialState();
        let newState = MasterStateReducer(initialState, new ToggleIsOpenOfSBCWDialog(true));
        expect(newState.SbcwDialogState.IsOpen).to.eq(true);
        newState = MasterStateReducer(newState, new TurnOnSBCW());
        expect(newState.SbcwDialogState.IsOpen).to.eq(false);
    });

    it("should set RawSlotDataRouter to route from 'ungeneralized' slot", () => {
        const initialState = GetMockInitialState();
        expect(initialState.DataState.RawSlotDataRouter.GetCurrentRoute()).to.eq("generalized");
        const newState = MasterStateReducer(initialState, new TurnOnSBCW());
        expect(newState.DataState.RawSlotDataRouter.GetCurrentRoute()).to.eq("ungeneralized");

    });
});
