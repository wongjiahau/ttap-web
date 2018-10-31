import { expect } from "chai";
import { FindTimetableWithoutConsideringWeekNumber } from "../../permutator/findTimetable";
import { GetMockInitialState, GetTestRawSlot1 } from "../../tests/testDataGenerator";
import { NotifyDataLoaded } from "../actions/notifyDataLoaded";
import { TurnOffSBCW } from "../actions/turnOffSBCW";
import { TurnOnSBCW } from "../actions/turnOnSBCW";
import { IMasterState, MasterStateReducer, NewMasterState } from "./../reducers/masterState";

describe("TurnOffSBCW action", () => {
    it("'s typename should be 'turn off search by considering week number'", () => {
        const action = new TurnOffSBCW();
        expect(action.TypeName()).to.eq("turn off search by considering week number");
    });

    it("should set SearchByConsideringWeekNumber to false ", () => {
        const initialState = GetMockInitialState();
        let newState = MasterStateReducer(initialState, new TurnOnSBCW());
        expect(newState.SettingsState.SearchByConsideringWeekNumber).to.eq(true);
        newState = MasterStateReducer(newState, new TurnOffSBCW());
        expect(newState.SettingsState.SearchByConsideringWeekNumber).to.eq(false);
    });

    it("should set TimetableFinder to FindTimetableByConsideringWeekNumber", () => {
        const initialState = GetMockInitialState();
        let newState = MasterStateReducer(initialState, new TurnOnSBCW());
        expect(newState.SettingsState.TimetableFinder.toString())
            .to.not.eq(FindTimetableWithoutConsideringWeekNumber.toString());
        newState = MasterStateReducer(newState, new TurnOffSBCW());
        expect(newState.SettingsState.TimetableFinder.toString())
            .to.eq(FindTimetableWithoutConsideringWeekNumber.toString());
    });

    it("should set RawSlotDataRouter to route from 'generalized' slot", () => {
        const initialState = GetMockInitialState();
        let newState = MasterStateReducer(initialState, new TurnOnSBCW());
        expect(newState.DataState.RawSlotDataRouter.GetCurrentRoute()).to.eq("ungeneralized");
        newState = MasterStateReducer(initialState, new TurnOffSBCW());
        expect(newState.DataState.RawSlotDataRouter.GetCurrentRoute()).to.eq("generalized");

    });
});
