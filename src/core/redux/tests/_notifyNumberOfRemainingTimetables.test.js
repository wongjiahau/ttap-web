"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const isEqual = require("lodash.isequal");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const timetableListState_1 = require("../reducers/timetableListState");
const notifyNumberOfRemainingTimetables_1 = require("./../actions/notifyNumberOfRemainingTimetables");
const masterState_1 = require("./../reducers/masterState");
function getInitialState() {
    return Object.assign({}, masterState_1.NewMasterState(), { TimetableListState: timetableListState_1.NewTimetableListState(testDataGenerator_1.GetTestTimetables1(), testDataGenerator_1.GetTestRawSlot1()) });
}
describe("NotifyNumberOfRemainingTimetables action", () => {
    it("'s typename should be 'notify number of remaining timetables'", () => {
        const action = new notifyNumberOfRemainingTimetables_1.NotifyNumberOfRemainingTimetables();
        chai_1.expect(action.TypeName()).to.eq("notify number of remaining timetables");
    });
    it("should set IsSnackbarVisible to true", () => {
        const action = new notifyNumberOfRemainingTimetables_1.NotifyNumberOfRemainingTimetables();
        const initialState = getInitialState();
        chai_1.expect(initialState.SnackbarState.IsOpen).to.eq(false);
        const newState = masterState_1.MasterStateReducer(initialState, action);
        chai_1.expect(newState.SnackbarState.IsOpen).to.eq(true);
    });
    it("should set SnackbarMessage", () => {
        const action = new notifyNumberOfRemainingTimetables_1.NotifyNumberOfRemainingTimetables();
        const initialState = getInitialState();
        const newState = masterState_1.MasterStateReducer(initialState, action);
        chai_1.expect(newState.SnackbarState.Message).to.eq("29 timetables remaining.");
    });
});
//# sourceMappingURL=_notifyNumberOfRemainingTimetables.test.js.map