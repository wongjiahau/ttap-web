"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const isEqual = require("lodash.isequal");
const heng_2017_sept_1 = require("../../tests/testData/heng_2017_sept");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const toggleSelectionOnGroupOfSlots_1 = require("../actions/toggleSelectionOnGroupOfSlots");
const toggleSubjectSelection_1 = require("../actions/toggleSubjectSelection");
const updateSlotsTableState_1 = require("../actions/updateSlotsTableState");
const masterState_1 = require("./../reducers/masterState");
describe("ToggleSelectionOnGroupOfSlots action", () => {
    it("'s typename should be 'toggle selection on group of slots of ... '", () => {
        const action = new toggleSelectionOnGroupOfSlots_1.ToggleSelectionOnGroupOfSlots(heng_2017_sept_1.CodeOf.HE);
        chai_1.expect(action.TypeName()).to.eq("toggle selection on group of slots of (MPU3113)");
    });
    it("should set SlotStates property of SlotTables(1)", () => {
        // Given Ali selected subject Hubungan Etnik
        // When Ali toggle group slot selection on HE
        // Then Ali shall see that all slots of HE is deselected
        const initialState = testDataGenerator_1.GetMockInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.HE));
        newState = masterState_1.MasterStateReducer(newState, new updateSlotsTableState_1.UpdateSlotsTableState());
        chai_1.expect(newState.SlotTableState.SlotStates).to.deep.eq({
            1: true,
            2: true,
            3: true
        });
        newState = masterState_1.MasterStateReducer(newState, new toggleSelectionOnGroupOfSlots_1.ToggleSelectionOnGroupOfSlots(heng_2017_sept_1.CodeOf.HE));
        chai_1.expect(newState.SubjectListState.Subjects[heng_2017_sept_1.IndexOf.HE].SlotNumbers).to.deep.eq(["1", "2", "3"]);
        chai_1.expect(newState.SlotTableState.SlotStates).to.deep.eq({
            1: false,
            2: false,
            3: false
        });
    });
    it("should set SlotStates property of SlotTables(2)", () => {
        // Given Ali selected subject Hubungan Etnik
        // When Ali toggle group slot selection on HE
        // And Ali toggle group slot selection on HE again
        // Then Ali shall see that all slots of HE is selected
        const initialState = testDataGenerator_1.GetMockInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.HE));
        newState = masterState_1.MasterStateReducer(newState, new updateSlotsTableState_1.UpdateSlotsTableState());
        newState = masterState_1.MasterStateReducer(newState, new toggleSelectionOnGroupOfSlots_1.ToggleSelectionOnGroupOfSlots(heng_2017_sept_1.CodeOf.HE));
        chai_1.expect(newState.SlotTableState.SlotStates).to.deep.eq({
            1: false,
            2: false,
            3: false
        });
        newState = masterState_1.MasterStateReducer(newState, new toggleSelectionOnGroupOfSlots_1.ToggleSelectionOnGroupOfSlots(heng_2017_sept_1.CodeOf.HE));
        chai_1.expect(newState.SlotTableState.SlotStates).to.deep.eq({
            1: true,
            2: true,
            3: true
        });
    });
    it("should set SubjectStates property of SlotTables(1)", () => {
        // Given Ali selected subject Hubungan Etnik
        // When Ali toggle group slot selection on HE
        // Then Ali shall see that the checkbox of HE is unchecked
        const initialState = testDataGenerator_1.GetMockInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.HE));
        newState = masterState_1.MasterStateReducer(newState, new updateSlotsTableState_1.UpdateSlotsTableState());
        newState = masterState_1.MasterStateReducer(newState, new toggleSelectionOnGroupOfSlots_1.ToggleSelectionOnGroupOfSlots(heng_2017_sept_1.CodeOf.HE));
        chai_1.expect(newState.SlotTableState.SubjectStates[heng_2017_sept_1.CodeOf.HE]).to.eq("false");
    });
    it("should set SubjectStates property of SlotTables(2)", () => {
        // Given Ali selected subject Hubungan Etnik
        // When Ali toggle group slot selection on HE
        // And Ali toggle group slot selection on HE again
        // Then Ali shall see that the checkbox of HE is checked
        const initialState = testDataGenerator_1.GetMockInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.HE));
        newState = masterState_1.MasterStateReducer(newState, new updateSlotsTableState_1.UpdateSlotsTableState());
        newState = masterState_1.MasterStateReducer(newState, new toggleSelectionOnGroupOfSlots_1.ToggleSelectionOnGroupOfSlots(heng_2017_sept_1.CodeOf.HE));
        newState = masterState_1.MasterStateReducer(newState, new toggleSelectionOnGroupOfSlots_1.ToggleSelectionOnGroupOfSlots(heng_2017_sept_1.CodeOf.HE));
        chai_1.expect(newState.SlotTableState.SubjectStates[heng_2017_sept_1.CodeOf.HE]).to.eq("true");
    });
});
//# sourceMappingURL=_toggleSelectionOnGroupOfSlots.test.js.map