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
    ToggleSubjectSelection
} from "../actions/toggleSubjectSelection";
import {
    NewSubjectListState
} from "../reducers/subjectListState";
import {
    ReformTimetablesBasedOnGroupOfSlots
} from "./../actions/reformTimetablesBasedOnGroupOfSlots";
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

describe("ReformTimetablesBasedOnGroupOfSlots action", () => {
    it("'s typename should be 'reform timetables based on group of slots of ... '", () => {
        const action = new ReformTimetablesBasedOnGroupOfSlots(CodeOf.HE);
        expect(action.TypeName()).to.eq("reform timetables based on group of slots of (MPU3113)");
    });

    it("should set SlotStates property of SlotTables(1)", () => {
        // Given Ali selected subject Hubungan Etnik
        // When Ali toggle group slot selection on HE
        // Then Ali shall see that all slots of HE is deselected
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        newState = MasterStateReducer(newState, new ReformTimetablesBasedOnGroupOfSlots(CodeOf.HE));
        expect(newState.SubjectListState.Subjects[IndexOf.HE].SlotIds).to.deep.eq([0, 1, 2, 3, 4, 5]);
        expect(newState.SlotTableState.SlotStates).to.deep.eq([false, false, false, false, false, false]);
    });

    it("should set SlotStates property of SlotTables(2)", () => {
        // Given Ali selected subject Hubungan Etnik
        // When Ali toggle group slot selection on HE
        // And Ali toggle group slot selection on HE again
        // Then Ali shall see that all slots of HE is selected
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        newState = MasterStateReducer(newState, new ReformTimetablesBasedOnGroupOfSlots(CodeOf.HE));
        newState = MasterStateReducer(newState, new ReformTimetablesBasedOnGroupOfSlots(CodeOf.HE));
        expect(newState.SlotTableState.SlotStates).to.deep.eq([true, true, true, true, true, true]);
    });

    it("should set SubjectStates property of SlotTables(1)", () => {
        // Given Ali selected subject Hubungan Etnik
        // When Ali toggle group slot selection on HE
        // Then Ali shall see that the checkbox of HE is unchecked
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        newState = MasterStateReducer(newState, new ReformTimetablesBasedOnGroupOfSlots(CodeOf.HE));
        expect(newState.SlotTableState.SubjectStates[CodeOf.HE]).to.eq("false");
    });

    it("should set SubjectStates property of SlotTables(2)", () => {
        // Given Ali selected subject Hubungan Etnik
        // When Ali toggle group slot selection on HE
        // And Ali toggle group slot selection on HE again
        // Then Ali shall see that the checkbox of HE is checked
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        newState = MasterStateReducer(newState, new ReformTimetablesBasedOnGroupOfSlots(CodeOf.HE));
        newState = MasterStateReducer(newState, new ReformTimetablesBasedOnGroupOfSlots(CodeOf.HE));
        expect(newState.SlotTableState.SubjectStates[CodeOf.HE]).to.eq("true");
    });

    it("should set FiltrateTimetables and ResidueTimetables property of TimetableListState(1)", () => {
        // Given Ali selected subject Hubungan Etnik
        // When Ali toggle group slot selection on HE
        // Then Ali shall see that no more timetable is left
        const initialState = getInitialState();
        const newState1 = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        const newState2 = MasterStateReducer(newState1, new ReformTimetablesBasedOnGroupOfSlots(CodeOf.HE));
        expect(newState2.TimetableListState.FiltrateTimetables).to.deep.eq([]);
        expect(newState2.TimetableListState.ResidueTimetables)
            .to.deep.eq(newState1.TimetableListState.FiltrateTimetables);
    });

    it("should set FiltrateTimetables and ResidueTimetables property of TimetableListState(2)", () => {
        // Given Ali selected subject Hubungan Etnik
        // When Ali toggle group slot selection on HE
        // And Ali toggle group slot selection on HE again
        // Then Ali shall see that all timetables is back
        const initialState = getInitialState();
        const newState1 = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        const newState2 = MasterStateReducer(newState1, new ReformTimetablesBasedOnGroupOfSlots(CodeOf.HE));
        const newState3 = MasterStateReducer(newState2, new ReformTimetablesBasedOnGroupOfSlots(CodeOf.HE));
        expect(newState3.TimetableListState.ResidueTimetables).to.deep.eq([]);
        expect(newState3.TimetableListState.FiltrateTimetables)
            .to.deep.eq(newState1.TimetableListState.FiltrateTimetables);
    });
});
