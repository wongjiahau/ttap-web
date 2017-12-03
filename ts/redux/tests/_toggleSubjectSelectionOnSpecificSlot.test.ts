import {
    expect
} from "chai";
import {
    isEqual
} from "lodash";
import {
    RawSlot
} from "../../model/rawSlot";
import {
    CodeOf,
    GetTestSubjects1,
    IndexOf
} from "../../tests/testDataGenerator";
import {
    ToggleSelectionOnSpecificSlot
} from "../actions/toggleSelectionOnSpecificSlot";
import {
    Ternary,
    ToggleSubjectSelection
} from "../actions/toggleSubjectSelection";
import {
    NewSubjectListState
} from "../reducers/subjectListState";
import {
    IMasterState,
    MasterStateReducer,
    NewMasterState
} from "./../reducers/masterState";

function getInitialState(): IMasterState {
    RawSlot.Reset();
    return {
        ...NewMasterState(),
        SubjectListState: NewSubjectListState(GetTestSubjects1())
    };
}

describe("ReformTimetablesBasedOnSpecificSlot action", () => {
    it("'s typename should be 'seleting slot (0, 1)' when passed in true", () => {
        getInitialState();
        const action = new ToggleSelectionOnSpecificSlot(0, true, null);
        expect(action.TypeName()).to.eq("selecting slot (0,1)");
    });

    it("'s typename should be 'deselecting slot (0, 1)' when passed in false", () => {
        getInitialState();
        const action = new ToggleSelectionOnSpecificSlot(0, false, null);
        expect(action.TypeName()).to.eq("deselecting slot (0,1)");
    });

    it("should set property of SlotStates(1)", () => {
        // Given Ali selected subject HE
        // When Ali deselected a slot of HE with hashId of 0
        // He shall see that the checkbox of slot is dechecked
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        const hashIdOfFirstSlotOfHubunganEtnik = 0;
        newState = MasterStateReducer(newState,
            new ToggleSelectionOnSpecificSlot(hashIdOfFirstSlotOfHubunganEtnik, true, CodeOf.HE));
        expect(newState.SlotTableState.SlotStates[hashIdOfFirstSlotOfHubunganEtnik]).to.eq(false);
    });

    it("should set property of SlotStates(2)", () => {
        // Given Ali selected subject HE
        // When Ali deselected a slot of HE with hashId of 0
        // And then Ali selected back the same slot
        // He shall see that the checkbox of slot is checked
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        const hashIdOfFirstSlotOfHubunganEtnik = 0;
        newState = MasterStateReducer(newState,
            new ToggleSelectionOnSpecificSlot(hashIdOfFirstSlotOfHubunganEtnik, true, CodeOf.HE));
        newState = MasterStateReducer(newState,
            new ToggleSelectionOnSpecificSlot(hashIdOfFirstSlotOfHubunganEtnik, false, CodeOf.HE));
        expect(newState.SlotTableState.SlotStates[hashIdOfFirstSlotOfHubunganEtnik]).to.eq(true);
    });

    it("should set property of SlotStates(3)", () => {
        // Given Ali selected subject HE
        // When Ali deselected a slot of HE with hashId of 0
        // He shall see that related slots is dechecked as well
        // For example, HE's lecture-1 has 2 slots,
        //      so deselecting one of them will result in both being deselected
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        const hashIdOfFirstSlotOfHubunganEtnik = 0;
        newState = MasterStateReducer(newState,
            new ToggleSelectionOnSpecificSlot(hashIdOfFirstSlotOfHubunganEtnik, true, CodeOf.HE));
        // Note: slot 0 and slot 1 are both HE's Lecture-1
        expect(newState.SlotTableState.SlotStates[0]).to.eq(false);
        expect(newState.SlotTableState.SlotStates[1]).to.eq(false);
    });

    it("should set property of SlotStates(4)", () => {
        // Given Ali selected subject HE
        // When Ali deselected a slot of HE with hashId of 0
        // And when Ali selected back the same slot
        // He shall see that related slots that is deselected just now will be selected again
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        const hashIdOfFirstSlotOfHubunganEtnik = 0;
        newState = MasterStateReducer(newState,
            new ToggleSelectionOnSpecificSlot(hashIdOfFirstSlotOfHubunganEtnik, true, CodeOf.HE));
        newState = MasterStateReducer(newState,
            new ToggleSelectionOnSpecificSlot(hashIdOfFirstSlotOfHubunganEtnik, false, CodeOf.HE));
        // Note: slot 0 and slot 1 are both HE's Lecture-1
        expect(newState.SlotTableState.SlotStates[0]).to.eq(true);
        expect(newState.SlotTableState.SlotStates[1]).to.eq(true);
    });

    it("shold set property of SubjectStates(1)", () => {
        // Given Ali selected subject HE
        // When Ali deselected a slot of HE with hashId of 0
        // He shall see that the checkbox of HE is in intermediate state
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        const hashIdOfFirstSlotOfHubunganEtnik = 0;
        newState = MasterStateReducer(newState,
            new ToggleSelectionOnSpecificSlot(hashIdOfFirstSlotOfHubunganEtnik, true, CodeOf.HE));
        expect(newState.SlotTableState.SubjectStates[CodeOf.HE]).to.eq("intermediate");
    });

    it("shold set property of SubjectStates(2)", () => {
        // Given Ali selected subject HE
        // When Ali deselected a slot of HE with hashId of 0
        // When Ali selected back the same slot
        // He shall see that the checkbox of HE is back into Checked state
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        const hashIdOfFirstSlotOfHubunganEtnik = 0;
        newState = MasterStateReducer(newState,
            new ToggleSelectionOnSpecificSlot(hashIdOfFirstSlotOfHubunganEtnik, true, CodeOf.HE));
        newState = MasterStateReducer(newState,
            new ToggleSelectionOnSpecificSlot(hashIdOfFirstSlotOfHubunganEtnik, false, CodeOf.HE));
        expect(newState.SlotTableState.SubjectStates[CodeOf.HE]).to.eq("true");
    });

});
