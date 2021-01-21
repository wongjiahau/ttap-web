"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const isEqual = require("lodash.isequal");
const find = require("lodash.find");
const heng_2017_sept_1 = require("../../tests/testData/heng_2017_sept");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const toggleSubjectSelection_1 = require("../actions/toggleSubjectSelection");
const updateSlotsTableState_1 = require("./../actions/updateSlotsTableState");
const masterState_1 = require("./../reducers/masterState");
describe("UpdateSlotsTableState action", () => {
    it("'s typename should be 'update slots table state'", () => {
        const action = new updateSlotsTableState_1.UpdateSlotsTableState();
        chai_1.expect(action.TypeName()).to.eq("update slots table state");
    });
    it("should set SlotStates property of SlotTableState", () => {
        const initialState = testDataGenerator_1.GetMockInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.HE));
        newState = masterState_1.MasterStateReducer(newState, new updateSlotsTableState_1.UpdateSlotsTableState());
        // Note: SlotNumbers of Hubungan Etnik is [1,2,3] as it is the first subject in the list
        const expected = {
            1: true,
            2: true,
            3: true
        };
        // HE have 6 slots, where each SlotNumber consist of 2 slots
        chai_1.expect(newState.SlotTableState.SlotStates).to.deep.eq(expected);
    });
    it("should set SubjectStates property of SlotTableState", () => {
        const initialState = testDataGenerator_1.GetMockInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.HE));
        newState = masterState_1.MasterStateReducer(newState, new updateSlotsTableState_1.UpdateSlotsTableState());
        chai_1.expect(newState.SlotTableState.SubjectStates[heng_2017_sept_1.CodeOf.HE]).to.eq("true");
    });
    it("should clear the error message property of SlotTableState", () => {
        const initialState = testDataGenerator_1.GetMockInitialState();
        initialState.SlotTableState.ErrorMessages = [];
        let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.HE));
        newState = masterState_1.MasterStateReducer(newState, new updateSlotsTableState_1.UpdateSlotsTableState());
        chai_1.expect(newState.SlotTableState.ErrorMessages).to.eq(null);
    });
});
describe("GetSlotStates", () => {
    it("case 1", () => {
        const subjects = testDataGenerator_1.GetTestSubjects1();
        const acp = find(subjects, {
            Code: heng_2017_sept_1.CodeOf.ACP
        });
        const result = updateSlotsTableState_1.GetSlotStates([acp]);
        chai_1.expect(acp.SlotNumbers).to.deep.eq(["10", "11"]);
        chai_1.expect(result[10]).to.eq(true);
        chai_1.expect(result[11]).to.eq(true);
    });
});
describe("GetSubjectStates", () => {
    it("case 1", () => {
        const subjects = testDataGenerator_1.GetTestSubjects1();
        const acp = find(subjects, {
            Code: heng_2017_sept_1.CodeOf.ACP
        });
        const he = find(subjects, {
            Code: heng_2017_sept_1.CodeOf.HE
        });
        const result = updateSlotsTableState_1.GetSubjectStates([acp, he]);
        chai_1.expect(result[acp.Code]).to.eq("true");
        chai_1.expect(result[he.Code]).to.eq("true");
    });
});
//# sourceMappingURL=_updateSlotsTableState.test.js.map