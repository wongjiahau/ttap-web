import { expect } from "chai";
import { RawSlot } from "../../model/rawSlot";
import { CodeOf, IndexOf } from "../../tests/testData/heng_2017_sept";
import { GetMockInitialState, GetTestRawSlot1, GetTestSubjects1 } from "../../tests/testDataGenerator";
import { NotifyDataLoaded } from "../actions/notifyDataLoaded";
import { ToggleSelectionOnSpecificSlot } from "../actions/toggleSelectionOnSpecificSlot";
import { ToggleSubjectSelection } from "../actions/toggleSubjectSelection";
import { IMasterState, MasterStateReducer, NewMasterState } from "../reducers/masterState";
import { NewSubjectListState } from "../reducers/subjectListState";

describe("toggle selection on specific slot", () => {
    it("'s typename should be 'seleting slot [ 1 ]' when passed in true", () => {
        GetMockInitialState();
        const action = new ToggleSelectionOnSpecificSlot("1", true, "");
        expect(action.TypeName()).to.eq("selecting slot [ 1 ]");
    });

    it("'s typename should be 'deseleting slot [ 1 ]' when passed in false", () => {
        GetMockInitialState();
        const action = new ToggleSelectionOnSpecificSlot("1", false, "");
        expect(action.TypeName()).to.eq("deselecting slot [ 1 ]");
    });

    it("should set property of SlotStates(1)", () => {
        // Given Ali selected subject HE
        // When Ali deselected a slot of HE with Uid of 0
        // He shall see that the checkbox of slot is dechecked
        const initialState = GetMockInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        const slotNumberOfFirstSlotOfHubunganEtnik = "1";
        newState = MasterStateReducer(newState,
            new ToggleSelectionOnSpecificSlot(slotNumberOfFirstSlotOfHubunganEtnik, true, CodeOf.HE));
        expect(newState.SlotTableState.SlotStates[slotNumberOfFirstSlotOfHubunganEtnik]).to.eq(false);
    });

    it("should set property of SlotStates(2)", () => {
        // Given Ali selected subject HE
        // When Ali deselected a slot of HE with Uid of 0
        // And then Ali selected back the same slot
        // He shall see that the checkbox of slot is checked again
        const initialState = GetMockInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        const slotNumberOfFirstSlotOfHubunganEtnik = "1";
        newState = MasterStateReducer(newState,
            new ToggleSelectionOnSpecificSlot(slotNumberOfFirstSlotOfHubunganEtnik, true, CodeOf.HE));
        newState = MasterStateReducer(newState,
            new ToggleSelectionOnSpecificSlot(slotNumberOfFirstSlotOfHubunganEtnik, false, CodeOf.HE));
        expect(newState.SlotTableState.SlotStates[slotNumberOfFirstSlotOfHubunganEtnik]).to.eq(true);
    });

});
