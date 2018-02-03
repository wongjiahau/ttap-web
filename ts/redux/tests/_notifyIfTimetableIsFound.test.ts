import { expect } from "chai";
import { GetTestRawSlot1, GetTestSubjects1, GetTestTimetables1, IndexOf } from "../../tests/testDataGenerator";
import { NotifyDataLoaded } from "../actions/notifyDataLoaded";
import { NotifyIfTimetableIsFound } from "../actions/notifyIfTimetableIsFound";
import { ToggleSubjectSelection } from "../actions/toggleSubjectSelection";
import { IMasterState, MasterStateReducer, NewMasterState } from "../reducers/masterState";
import { NewSubjectListState } from "../reducers/subjectListState";
import { NewTimetableListState } from "../reducers/timetableListState";

function getInitialState(): IMasterState {
    const result = NewMasterState();
    result.SubjectListState = NewSubjectListState(GetTestSubjects1());
    result.TimetableListState = NewTimetableListState(GetTestTimetables1(), GetTestRawSlot1());
    return result;
}

describe("NotifyIfTimetableIsFound action", () => {
    it("'s typename should be 'notify if timetable is found'", () => {
        const action = new NotifyIfTimetableIsFound();
        expect(action.TypeName()).to.eq("notify if timetable is found");
    });

    it("should set IsSnackBarVisible to true if some subjects is selected", () => {
        const action = new NotifyIfTimetableIsFound();
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new NotifyDataLoaded(GetTestRawSlot1()));
        newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.HE));
        newState = MasterStateReducer(newState, action);
        expect(newState.SnackbarState.IsOpen).to.eq(true);
    });

    it("should set IsSnackBarVisible to false if zero subject is selected", () => {
        const action = new NotifyIfTimetableIsFound();
        const initialState = getInitialState();
        const newState = MasterStateReducer(initialState, action);
        expect(newState.SubjectListState.Subjects.every((s) => !s.IsSelected));
        expect(newState.SnackbarState.IsOpen).to.eq(false);
    });
});
