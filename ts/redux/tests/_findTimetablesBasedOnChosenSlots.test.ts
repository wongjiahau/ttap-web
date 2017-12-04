import {expect} from "chai";
import {isEqual} from "lodash";
import { RawSlot } from "../../model/rawSlot";
import { CodeOf, GetTestSubjects1, IndexOf } from "../../tests/testDataGenerator";
import { ToggleSelectionOnGroupOfSlots } from "../actions/toggleSelectionOnGroupOfSlots";
import { ToggleSelectionOnSpecificSlot } from "../actions/toggleSelectionOnSpecificSlot";
import { ToggleSubjectSelection } from "../actions/toggleSubjectSelection";
import { NewSubjectListState } from "../reducers/subjectListState";
import {FindTimetablesBasedOnChosenSlots} from "./../actions/findTimetablesBasedOnChosenSlots";
import {IMasterState, MasterStateReducer, NewMasterState} from "./../reducers/masterState";

function getInitialState(): IMasterState {
    RawSlot.Reset();
    return {
        ...NewMasterState(),
        SubjectListState: NewSubjectListState(GetTestSubjects1())
    };
}

describe("FindTimetablesBasedOnChosenSlots action", () => {
    it("'s typename should be 'find timetables based on chosen slots'", () => {
        const action = new FindTimetablesBasedOnChosenSlots();
        expect(action.TypeName()).to.eq("find timetables based on chosen slots");
    });

    it("should set property of FiltrateTimetables and ResidueTimetables", () => {
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        expect(newState.TimetableListState.FiltrateTimetables).to.have.lengthOf(3);
        newState = MasterStateReducer(newState, new ToggleSelectionOnSpecificSlot(0, true, CodeOf.HE));
        newState = MasterStateReducer(newState, new FindTimetablesBasedOnChosenSlots());
        expect(newState.TimetableListState.FiltrateTimetables).to.have.lengthOf(2);
        expect(newState.TimetableListState.ResidueTimetables).to.have.lengthOf(0);
    });

    it("should set ErrorMessages property of SlotsTableState if there are schema intolerance(1)", () => {
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.BKA));
        newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.HE));
        newState = MasterStateReducer(newState, new ToggleSelectionOnGroupOfSlots(CodeOf.BKA));
        newState = MasterStateReducer(newState, new FindTimetablesBasedOnChosenSlots());
        expect(newState.SlotTableState.ErrorMessages).to.deep.eq(["At least one LECTURE is needed for Bahasa Kebangsaan A"]);
    });

});
