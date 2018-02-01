import {expect} from "chai";
import { RawSlot } from "./../../model/rawSlot";
import {GetTestTimetables1} from "./../../tests/testDataGenerator";
import {ToggleSubjectSelection} from "./../actions/toggleSubjectSelection";
const isEqual = require("lodash.isequal");
import ParseHtmlToRawSlot from "../../parser/parseHtmlToRawSlot";
import {ParseSlotToSubject} from "../../parser/parseSlotToSubject";
import TestManager, {FileName} from "../../tests/testManager";
import { NotifyDataLoaded } from "../actions/notifyDataLoaded";
import {NewSubjectListState} from "../reducers/subjectListState";
import {NewTimetableListState} from "../reducers/timetableListState";
import {SelectSlotChoice} from "./../actions/selectSlotChoice";
import {IMasterState, MasterStateReducer, NewMasterState} from "./../reducers/masterState";

function getInitialState() : IMasterState {
    const slots = ParseHtmlToRawSlot(new TestManager().GetDataFrom(FileName.cf_2017_nov));
    const state = MasterStateReducer(NewMasterState(), new NotifyDataLoaded(slots));
    return state;
}

describe("SelectSlotChoice action", () => {
    it("'s typename should be 'select slot choice'", () => {
        const action = new SelectSlotChoice(null, null);
        expect(action.TypeName())
            .to
            .eq("select slot choice");
    });

    it("case 1", () => {
        RawSlot.Reset();
        const initialState = getInitialState();
        const indexOfUEMK3233 = 4; // Bioprocess Engineering
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(indexOfUEMK3233));
        expect(newState.TimetableListState.SlotViewModelStore.GetOne(229)).to.deep.eq({
            Uid: 229,
            CurrentChoice: 0,
            SubjectCode: "UEMK3233",
            SubjectName: "BIOPROCESS ENGINEERING",
            Type: "T",
            Group: [
                "1", "2"
            ],
            Day: "Tue",
            TimePeriod: "02:00 PM - 03:00 PM",
            WeekNumber: [
                "3,5,7,9,11,13", "2,4,6,8,10,12"
            ],
            Room: ["KB326", "KB326"]
        });
        newState = MasterStateReducer(newState, new SelectSlotChoice(229, 1));
        expect(newState.TimetableListState.SlotViewModelStore.GetOne(229)).to.deep.eq({
            Uid: 229,
            CurrentChoice: 1,
            SubjectCode: "UEMK3233",
            SubjectName: "BIOPROCESS ENGINEERING",
            Type: "T",
            Group: [
                "1", "2"
            ],
            Day: "Tue",
            TimePeriod: "02:00 PM - 03:00 PM",
            WeekNumber: [
                "3,5,7,9,11,13", "2,4,6,8,10,12"
            ],
            Room: ["KB326", "KB326"]
        });
    });
});
