"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const isEqual = require("lodash.isequal");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const goToNextSubTimetable_1 = require("../actions/goToNextSubTimetable");
const timetableListState_1 = require("../reducers/timetableListState");
const goToRandomTimetable_1 = require("./../actions/goToRandomTimetable");
const masterState_1 = require("./../reducers/masterState");
const _goToNextTimetable_test_1 = require("./_goToNextTimetable.test");
function getInitialState(timetables) {
    const result = masterState_1.NewMasterState();
    result.TimetableListState = timetableListState_1.NewTimetableListState(timetables, testDataGenerator_1.GetTestRawSlot1());
    return result;
}
describe("GoToRandomTimetable action", () => {
    it("'s typename should be 'go to random timetable'", () => {
        const action = new goToRandomTimetable_1.GoToRandomTimetable();
        chai_1.expect(action.TypeName()).to.eq("go to random timetable");
    });
    it("should set the TimetableListState.CurrentIndex property to a random value and reset the CurrentSubIndex", () => {
        const action = new goToRandomTimetable_1.GoToRandomTimetable();
        const initialState = getInitialState([_goToNextTimetable_test_1.NullGroupedTimetable, _goToNextTimetable_test_1.NullGroupedTimetable, _goToNextTimetable_test_1.NullGroupedTimetable]);
        const newState = masterState_1.MasterStateReducer(initialState, action);
        chai_1.expect(newState.TimetableListState.CurrentIndex)
            .to.most(newState.TimetableListState.FiltrateTimetables.length - 1);
        chai_1.expect(newState.TimetableListState.CurrentIndex).to.least(0);
        const newState2 = masterState_1.MasterStateReducer(newState, new goToNextSubTimetable_1.GoToNextSubTimetable());
        chai_1.expect(newState2.TimetableListState.CurrentSubIndex).to.eq(1);
        const newState3 = masterState_1.MasterStateReducer(newState2, new goToRandomTimetable_1.GoToRandomTimetable());
        chai_1.expect(newState3.TimetableListState.CurrentSubIndex).to.eq(0);
    });
    it("should set the TimetableListState.CurrentIndex to a value that is different from previous TimetableListState.CurrentIndex", () => {
        const action = new goToRandomTimetable_1.GoToRandomTimetable();
        const initialState = getInitialState([_goToNextTimetable_test_1.NullGroupedTimetable, _goToNextTimetable_test_1.NullGroupedTimetable, _goToNextTimetable_test_1.NullGroupedTimetable]);
        const newState = masterState_1.MasterStateReducer(initialState, action);
        chai_1.expect(newState.TimetableListState.CurrentIndex).to.not.eq(initialState.TimetableListState.CurrentIndex);
    });
    it("should not loop infinitely when there is only one timetable", () => {
        const action = new goToRandomTimetable_1.GoToRandomTimetable();
        const initialState = getInitialState([_goToNextTimetable_test_1.NullGroupedTimetable]);
        chai_1.expect(() => {
            const newState = masterState_1.MasterStateReducer(initialState, action);
        }).to.not.throw();
    });
});
//# sourceMappingURL=_goToRandomTimetable.test.js.map