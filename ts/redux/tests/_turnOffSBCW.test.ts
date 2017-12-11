import {
    expect
} from "chai";
import {
    isEqual
} from "lodash";
import {
    FindTimetableWithoutConsideringWeekNumber
} from "../../permutator/findTimetable";
import {
    HENG_2017_APR,
    IndexOf
} from "../../tests/testData/heng_2017_apr";
import {
    NotifyDataLoaded
} from "../actions/notifyDataLoaded";
import {
    ToggleIsOpenOfSBCWDialog
} from "../actions/toggleIsOpenOfSBCWDialog";
import {
    ToggleSubjectSelection
} from "../actions/toggleSubjectSelection";
import {
    TurnOffSBCW
} from "../actions/turnOffSBCW";
import {
    TurnOnSBCW
} from "../actions/turnOnSBCW";
import {
    IMasterState,
    MasterStateReducer,
    NewMasterState
} from "./../reducers/masterState";

describe("TurnOffSBCW action", () => {
    it("'s typename should be 'turn off search by considering week number'", () => {
        const action = new TurnOffSBCW();
        expect(action.TypeName()).to.eq("turn off search by considering week number");
    });

    it("should set SearchByConsideringWeekNumber to false ", () => {
        const initialState = NewMasterState();
        let newState = MasterStateReducer(initialState, new TurnOnSBCW());
        expect(newState.SettingsState.SearchByConsideringWeekNumber).to.eq(true);
        newState = MasterStateReducer(newState, new TurnOffSBCW());
        expect(newState.SettingsState.SearchByConsideringWeekNumber).to.eq(false);
    });

    it("should set TimetableFinder to FindTimetableByConsideringWeekNumber", () => {
        const initialState = NewMasterState();
        let newState = MasterStateReducer(initialState, new TurnOnSBCW());
        expect(newState.SettingsState.TimetableFinder.toString())
            .to.not.eq(FindTimetableWithoutConsideringWeekNumber.toString());
        newState = MasterStateReducer(newState, new TurnOffSBCW());
        expect(newState.SettingsState.TimetableFinder.toString())
            .to.eq(FindTimetableWithoutConsideringWeekNumber.toString());
    });

    it("should set timetables to new timetables found using the new timetablefinder", () => {
        const initialState = NewMasterState();
        let newState = MasterStateReducer(initialState, new NotifyDataLoaded(HENG_2017_APR()));
        newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.FM2));
        newState = MasterStateReducer(newState, new TurnOnSBCW());
        expect(newState.TimetableListState.FiltrateTimetables).to.have.lengthOf(420);
        newState = MasterStateReducer(newState, new TurnOffSBCW());
        expect(newState.TimetableListState.FiltrateTimetables).to.have.lengthOf(392);
    });

});
