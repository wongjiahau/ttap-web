"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const goToPreviousSubTimetable_1 = require("../actions/goToPreviousSubTimetable");
const timetableListState_1 = require("../reducers/timetableListState");
const goToPrevTimetable_1 = require("./../actions/goToPrevTimetable");
const masterState_1 = require("./../reducers/masterState");
const _goToNextTimetable_test_1 = require("./_goToNextTimetable.test");
function getInitialState(timetables) {
    const result = masterState_1.NewMasterState();
    result.TimetableListState = timetableListState_1.NewTimetableListState(timetables, testDataGenerator_1.GetTestRawSlot1());
    return result;
}
describe("goToPrevTimetable action", () => {
    it("'s name shold be 'go to previous timetable'", () => {
        chai_1.expect(new goToPrevTimetable_1.GoToPrevTimetable().TypeName()).to.eq("go to previous timetable");
    });
    it("should decrement the CurrentIndex and reset SubCurrentIndex", () => {
        const initialState = getInitialState([_goToNextTimetable_test_1.NullGroupedTimetable, _goToNextTimetable_test_1.NullGroupedTimetable]);
        initialState.TimetableListState.CurrentIndex = 1;
        const newState = masterState_1.MasterStateReducer(initialState, new goToPrevTimetable_1.GoToPrevTimetable());
        chai_1.expect(newState.TimetableListState.CurrentIndex).to.eq(0);
        const newState2 = masterState_1.MasterStateReducer(newState, new goToPreviousSubTimetable_1.GoToPreviousSubTimetable());
        chai_1.expect(newState2.TimetableListState.CurrentSubIndex).to.eq(3); // Because NullGroupedTimetable.ListOfSlotUids has length of 4
        const newState3 = masterState_1.MasterStateReducer(newState2, new goToPrevTimetable_1.GoToPrevTimetable());
        chai_1.expect(newState3.TimetableListState.CurrentSubIndex).to.eq(0); // Because NullGroupedTimetable.ListOfSlotUids has length of 4
    });
    it("decrement the CurrentIndex cyclically", () => {
        const initialState = getInitialState([_goToNextTimetable_test_1.NullGroupedTimetable, _goToNextTimetable_test_1.NullGroupedTimetable, _goToNextTimetable_test_1.NullGroupedTimetable]);
        const newState = masterState_1.MasterStateReducer(initialState, new goToPrevTimetable_1.GoToPrevTimetable());
        chai_1.expect(newState.TimetableListState.CurrentIndex).to.eq(2);
    });
});
//# sourceMappingURL=_goToPrevTimetable.test.js.map