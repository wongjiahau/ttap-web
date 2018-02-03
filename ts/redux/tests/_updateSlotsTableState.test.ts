import {expect} from "chai";

const isEqual = require("lodash.isequal");
const find = require("lodash.find");
import { CodeOf, IndexOf } from "../../tests/testData/heng_2017_sept";
import { GetMockInitialState, GetTestRawSlot1, GetTestSubjects1 } from "../../tests/testDataGenerator";
import { NotifyDataLoaded } from "../actions/notifyDataLoaded";
import { ToggleSubjectSelection } from "../actions/toggleSubjectSelection";
import { NewSubjectListState} from "../reducers/subjectListState";
import {GetSlotStates, GetSubjectStates, UpdateSlotsTableState} from "./../actions/updateSlotsTableState";
import {IMasterState, MasterStateReducer, NewMasterState} from "./../reducers/masterState";

describe("UpdateSlotsTableState action", () => {
    it("'s typename should be 'update slots table state'", () => {
        const action = new UpdateSlotsTableState();
        expect(action.TypeName()).to.eq("update slots table state");
    });

    it("should set SlotStates property of SlotTableState", () => {
        const initialState = GetMockInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        newState = MasterStateReducer(newState, new UpdateSlotsTableState());
        // Note: SlotNumbers of Hubungan Etnik is [1,2,3] as it is the first subject in the list
        const expected = {
            1: true,
            2: true,
            3: true
        };
        // HE have 6 slots, where each SlotNumber consist of 2 slots
        expect(newState.SlotTableState.SlotStates).to.deep.eq(expected);
    });

    it("should set SubjectStates property of SlotTableState", () => {
        const initialState = GetMockInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        newState = MasterStateReducer(newState, new UpdateSlotsTableState());
        expect(newState.SlotTableState.SubjectStates[CodeOf.HE]).to.eq("true");
    });

    it("should clear the error message property of SlotTableState", () => {
        const initialState = GetMockInitialState();
        initialState.SlotTableState.ErrorMessages = [];
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        newState = MasterStateReducer(newState, new UpdateSlotsTableState());
        expect(newState.SlotTableState.ErrorMessages).to.eq(null);
    });
});

describe("GetSlotStates", () => {
    it("case 1", () => {
        const subjects = GetTestSubjects1();
        const acp = find(subjects, {
            Code: CodeOf.ACP
        });
        const result = GetSlotStates([acp]);
        expect(acp.SlotNumbers).to.deep.eq(["10", "11"]);
        expect(result[10]).to.eq(true);
        expect(result[11]).to.eq(true);
    });

});

describe("GetSubjectStates", () => {
    it("case 1", () => {
        const subjects = GetTestSubjects1();
        const acp = find(subjects, {
            Code: CodeOf.ACP
        });
        const he = find(subjects, {
            Code: CodeOf.HE
        });
        const result = GetSubjectStates([acp, he]);
        expect(result[acp.Code]).to.eq("true");
        expect(result[he.Code]).to.eq("true");
    });

});
