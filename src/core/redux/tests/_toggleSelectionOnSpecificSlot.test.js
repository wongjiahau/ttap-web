"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const heng_2017_sept_1 = require("../../tests/testData/heng_2017_sept");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const toggleSelectionOnSpecificSlot_1 = require("../actions/toggleSelectionOnSpecificSlot");
const toggleSubjectSelection_1 = require("../actions/toggleSubjectSelection");
const masterState_1 = require("../reducers/masterState");
describe("toggle selection on specific slot", () => {
    it("'s typename should be 'seleting slot [ 1 ]' when passed in true", () => {
        testDataGenerator_1.GetMockInitialState();
        const action = new toggleSelectionOnSpecificSlot_1.ToggleSelectionOnSpecificSlot("1", true, "");
        chai_1.expect(action.TypeName()).to.eq("selecting slot [ 1 ]");
    });
    it("'s typename should be 'deseleting slot [ 1 ]' when passed in false", () => {
        testDataGenerator_1.GetMockInitialState();
        const action = new toggleSelectionOnSpecificSlot_1.ToggleSelectionOnSpecificSlot("1", false, "");
        chai_1.expect(action.TypeName()).to.eq("deselecting slot [ 1 ]");
    });
    it("should set property of SlotStates(1)", () => {
        // Given Ali selected subject HE
        // When Ali deselected a slot of HE with Uid of 0
        // He shall see that the checkbox of slot is dechecked
        const initialState = testDataGenerator_1.GetMockInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.HE));
        const slotNumberOfFirstSlotOfHubunganEtnik = "1";
        newState = masterState_1.MasterStateReducer(newState, new toggleSelectionOnSpecificSlot_1.ToggleSelectionOnSpecificSlot(slotNumberOfFirstSlotOfHubunganEtnik, true, heng_2017_sept_1.CodeOf.HE));
        chai_1.expect(newState.SlotTableState.SlotStates[slotNumberOfFirstSlotOfHubunganEtnik]).to.eq(false);
    });
    it("should set property of SlotStates(2)", () => {
        // Given Ali selected subject HE
        // When Ali deselected a slot of HE with Uid of 0
        // And then Ali selected back the same slot
        // He shall see that the checkbox of slot is checked again
        const initialState = testDataGenerator_1.GetMockInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.HE));
        const slotNumberOfFirstSlotOfHubunganEtnik = "1";
        newState = masterState_1.MasterStateReducer(newState, new toggleSelectionOnSpecificSlot_1.ToggleSelectionOnSpecificSlot(slotNumberOfFirstSlotOfHubunganEtnik, true, heng_2017_sept_1.CodeOf.HE));
        newState = masterState_1.MasterStateReducer(newState, new toggleSelectionOnSpecificSlot_1.ToggleSelectionOnSpecificSlot(slotNumberOfFirstSlotOfHubunganEtnik, false, heng_2017_sept_1.CodeOf.HE));
        chai_1.expect(newState.SlotTableState.SlotStates[slotNumberOfFirstSlotOfHubunganEtnik]).to.eq(true);
    });
});
//# sourceMappingURL=_toggleSelectionOnSpecificSlot.test.js.map