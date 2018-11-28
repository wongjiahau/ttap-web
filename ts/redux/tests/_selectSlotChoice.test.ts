import {expect} from "chai";
import { RawSlot } from "./../../model/rawSlot";
import {GetTestTimetables1} from "./../../tests/testDataGenerator";
import {ToggleSubjectSelection} from "./../actions/toggleSubjectSelection";
const isEqual = require("lodash.isequal");
import ParseStudentHtmlToRawSlot from "../../parser/parseStudentHtmlToRawSlot";
import {ParseRawSlotToSubject} from "../../parser/parseRawSlotToSubject";
import TestManager, {FileName} from "../../tests/testManager";
import { NotifyDataLoaded } from "../actions/notifyDataLoaded";
import {NewSubjectListState} from "../reducers/subjectListState";
import {NewTimetableListState} from "../reducers/timetableListState";
import {SelectSlotChoice} from "./../actions/selectSlotChoice";
import {IMasterState, MasterStateReducer, NewMasterState} from "./../reducers/masterState";

function getInitialState() : IMasterState {
    const slots = ParseStudentHtmlToRawSlot(new TestManager().GetDataFrom(FileName.cf_2017_nov));
    const state = MasterStateReducer(NewMasterState(), new NotifyDataLoaded(slots));
    return state;
}

describe("SelectSlotChoice action", () => {
    it("'s typename should be 'select slot choice'", () => {
        const action = new SelectSlotChoice(0, 0);
        expect(action.TypeName()).to.eq("select slot choice");
    });

    it("case 1", () => {
        const initialState = getInitialState();
        const indexOfUEMK3233 = 4; // Bioprocess Engineering
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(indexOfUEMK3233));
        expect(newState.TimetableListState.SlotViewModelStore.GetOne(229).CurrentChoice).to.eq(0);
        newState = MasterStateReducer(newState, new SelectSlotChoice(229, 1));
        expect(newState.TimetableListState.SlotViewModelStore.GetOne(229).CurrentChoice).to.eq(1);
    });
});
