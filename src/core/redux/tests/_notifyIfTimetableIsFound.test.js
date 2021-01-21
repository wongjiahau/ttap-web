"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const heng_2017_sept_1 = require("../../tests/testData/heng_2017_sept");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const notifyDataLoaded_1 = require("../actions/notifyDataLoaded");
const notifyIfTimetableIsFound_1 = require("../actions/notifyIfTimetableIsFound");
const toggleSubjectSelection_1 = require("../actions/toggleSubjectSelection");
const masterState_1 = require("../reducers/masterState");
const subjectListState_1 = require("../reducers/subjectListState");
const timetableListState_1 = require("../reducers/timetableListState");
function getInitialState() {
    const result = masterState_1.NewMasterState();
    result.SubjectListState = subjectListState_1.NewSubjectListState(testDataGenerator_1.GetTestSubjects1());
    result.TimetableListState = timetableListState_1.NewTimetableListState(testDataGenerator_1.GetTestTimetables1(), testDataGenerator_1.GetTestRawSlot1());
    return result;
}
describe("NotifyIfTimetableIsFound action", () => {
    it("'s typename should be 'notify if timetable is found'", () => {
        const action = new notifyIfTimetableIsFound_1.NotifyIfTimetableIsFound();
        chai_1.expect(action.TypeName()).to.eq("notify if timetable is found");
    });
    it("should set IsSnackBarVisible to true if some subjects is selected", () => {
        const action = new notifyIfTimetableIsFound_1.NotifyIfTimetableIsFound();
        const initialState = getInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new notifyDataLoaded_1.NotifyDataLoaded(testDataGenerator_1.GetTestRawSlot1()));
        newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.HE));
        newState = masterState_1.MasterStateReducer(newState, action);
        chai_1.expect(newState.SnackbarState.IsOpen).to.eq(true);
    });
    it("should set IsSnackBarVisible to false if zero subject is selected", () => {
        const action = new notifyIfTimetableIsFound_1.NotifyIfTimetableIsFound();
        const initialState = getInitialState();
        const newState = masterState_1.MasterStateReducer(initialState, action);
        chai_1.expect(newState.SubjectListState.Subjects.every((s) => !s.IsSelected));
        chai_1.expect(newState.SnackbarState.IsOpen).to.eq(false);
    });
});
//# sourceMappingURL=_notifyIfTimetableIsFound.test.js.map