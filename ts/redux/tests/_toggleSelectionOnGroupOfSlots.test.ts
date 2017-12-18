import {
    expect
} from "chai";
const isEqual = require("lodash.isequal");
import {
    RawSlot
} from "../../model/rawSlot";
import {
    CodeOf,
    GetTestSubjects1,
    IndexOf
} from "../../tests/testDataGenerator";
import {
    ToggleSelectionOnGroupOfSlots
} from "../actions/toggleSelectionOnGroupOfSlots";
import {
    ToggleSubjectSelection
} from "../actions/toggleSubjectSelection";
import {
    UpdateSlotsTableState
} from "../actions/updateSlotsTableState";
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

describe("ToggleSelectionOnGroupOfSlots action", () => {
    it("'s typename should be 'toggle selection on group of slots of ... '", () => {
        const action = new ToggleSelectionOnGroupOfSlots(CodeOf.HE);
        expect(action.TypeName()).to.eq("toggle selection on group of slots of (MPU3113)");
    });

    it("should set SlotStates property of SlotTables(1)", () => {
        // Given Ali selected subject Hubungan Etnik
        // When Ali toggle group slot selection on HE
        // Then Ali shall see that all slots of HE is deselected
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        newState = MasterStateReducer(newState, new UpdateSlotsTableState());
        expect(newState.SlotTableState.SlotStates).to.deep.eq({
            1: true,
            2: true,
            3: true
        });
        newState = MasterStateReducer(newState, new ToggleSelectionOnGroupOfSlots(CodeOf.HE));
        expect(newState.SubjectListState.Subjects[IndexOf.HE].SlotNumbers).to.deep.eq(["1", "2", "3"]);
        expect(newState.SlotTableState.SlotStates).to.deep.eq({
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
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        newState = MasterStateReducer(newState, new UpdateSlotsTableState());
        newState = MasterStateReducer(newState, new ToggleSelectionOnGroupOfSlots(CodeOf.HE));
        expect(newState.SlotTableState.SlotStates).to.deep.eq({
            1: false,
            2: false,
            3: false
        });
        newState = MasterStateReducer(newState, new ToggleSelectionOnGroupOfSlots(CodeOf.HE));
        expect(newState.SlotTableState.SlotStates).to.deep.eq({
            1: true,
            2: true,
            3: true
        });
    });

    it("should set SubjectStates property of SlotTables(1)", () => {
        // Given Ali selected subject Hubungan Etnik
        // When Ali toggle group slot selection on HE
        // Then Ali shall see that the checkbox of HE is unchecked
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        newState = MasterStateReducer(newState, new UpdateSlotsTableState());
        newState = MasterStateReducer(newState, new ToggleSelectionOnGroupOfSlots(CodeOf.HE));
        expect(newState.SlotTableState.SubjectStates[CodeOf.HE]).to.eq("false");
    });

    it("should set SubjectStates property of SlotTables(2)", () => {
        // Given Ali selected subject Hubungan Etnik
        // When Ali toggle group slot selection on HE
        // And Ali toggle group slot selection on HE again
        // Then Ali shall see that the checkbox of HE is checked
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        newState = MasterStateReducer(newState, new UpdateSlotsTableState());
        newState = MasterStateReducer(newState, new ToggleSelectionOnGroupOfSlots(CodeOf.HE));
        newState = MasterStateReducer(newState, new ToggleSelectionOnGroupOfSlots(CodeOf.HE));
        expect(newState.SlotTableState.SubjectStates[CodeOf.HE]).to.eq("true");
    });

});
