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
    DiffReport
} from "../../model/subjectSchema";
import {
    CodeOf,
    GetTestSubjects1,
    IndexOf
} from "../../tests/testDataGenerator";
import {
    ToggleSelectionOnGroupOfSlots
} from "../actions/toggleSelectionOnGroupOfSlots";
import {
    ToggleSelectionOnSpecificSlot
} from "../actions/toggleSelectionOnSpecificSlot";
import {
    ToggleSubjectSelection
} from "../actions/toggleSubjectSelection";
import {
    NewSubjectListState
} from "../reducers/subjectListState";
import {
    FindTimetablesBasedOnChosenSlots
} from "./../actions/findTimetablesBasedOnChosenSlots";
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

describe("FindTimetablesBasedOnChosenSlots action", () => {
    it("'s typename should be 'find timetables based on chosen slots'", () => {
        const action = new FindTimetablesBasedOnChosenSlots();
        expect(action.TypeName()).to.eq("find timetables based on chosen slots");
    });

    it("should set property of FiltrateTimetables and ResidueTimetables if there are no error", () => {
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        expect(newState.TimetableListState.FiltrateTimetables).to.have.lengthOf(3);
        newState = MasterStateReducer(newState, new ToggleSelectionOnSpecificSlot("1", true, CodeOf.HE));
        newState = MasterStateReducer(newState, new FindTimetablesBasedOnChosenSlots());
        expect(newState.SlotTableState.ErrorMessages).to.deep.eq(null);
        expect(newState.TimetableListState.FiltrateTimetables).to.have.lengthOf(2);
        expect(newState.TimetableListState.ResidueTimetables).to.have.lengthOf(0);
    });

    it("should set ErrorMessages property of SlotsTableState if there are schema intolerance(1)", () => {
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.BKA));
        newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.HE));
        newState = MasterStateReducer(newState, new ToggleSelectionOnGroupOfSlots(CodeOf.BKA));
        newState = MasterStateReducer(newState, new FindTimetablesBasedOnChosenSlots());
        expect(newState.SlotTableState.ErrorMessages).to.deep.eq([new DiffReport(CodeOf.BKA, "L")]);
    });

    it("should set ErrorMessages of SlotsTableState if there are schema intolerance(2)", () => {
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.BEAM));
        newState = MasterStateReducer(newState, new ToggleSelectionOnGroupOfSlots(CodeOf.BEAM));
        newState = MasterStateReducer(newState, new FindTimetablesBasedOnChosenSlots());
        expect(newState.SlotTableState.ErrorMessages).to.deep.eq(
            [new DiffReport(CodeOf.BEAM, "L"), new DiffReport(CodeOf.BEAM, "T")]
        );
    });

    it("should set ErrorMessages of SlotsTableState if there are schema intolerance(3)", () => {
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.BKA));
        newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.SA1));
        newState = MasterStateReducer(newState, new ToggleSelectionOnGroupOfSlots(CodeOf.BKA));
        // 48 is the slot number for L-1 of Structural Analysis
        newState = MasterStateReducer(newState, new ToggleSelectionOnSpecificSlot("48", true, CodeOf.SA1));
        newState = MasterStateReducer(newState, new FindTimetablesBasedOnChosenSlots());
        expect(newState.SlotTableState.ErrorMessages).to.deep.eq(
            [new DiffReport(CodeOf.BKA, "L"), new DiffReport(CodeOf.SA1, "L")]
        );
    });

    it("should set ErrorMessages SlotsTableState if no possible timetable is found even thought the schema is tolerated", () => {
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.ACP));
        newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.BMK2));
        newState = MasterStateReducer(newState, new ToggleSelectionOnSpecificSlot("10", true, CodeOf.ACP));
        newState = MasterStateReducer(newState, new FindTimetablesBasedOnChosenSlots());
        expect(newState.SlotTableState.ErrorMessages).to.deep.eq([new DiffReport("", "no possible timetables found")]);
    });
});
