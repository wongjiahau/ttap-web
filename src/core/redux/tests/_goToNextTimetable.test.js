"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const goToNextSubTimetable_1 = require("../actions/goToNextSubTimetable");
const timetableListState_1 = require("../reducers/timetableListState");
const goToNextTimetable_1 = require("./../actions/goToNextTimetable");
const masterState_1 = require("./../reducers/masterState");
function getInitialState(timetables) {
    const result = masterState_1.NewMasterState();
    result.TimetableListState = timetableListState_1.NewTimetableListState(timetables, testDataGenerator_1.GetTestRawSlot1());
    return result;
}
describe("goToNextTimetable action", () => {
    it("'s name shold be 'go to next timetable'", () => {
        chai_1.expect(new goToNextTimetable_1.GoToNextTimetable().TypeName()).to.eq("go to next timetable");
    });
    it("should increment the CurrentIndex and reset the SubCurrentIndex", () => {
        const initialState = getInitialState([exports.NullGroupedTimetable, exports.NullGroupedTimetable]);
        const newState = masterState_1.MasterStateReducer(initialState, new goToNextTimetable_1.GoToNextTimetable());
        chai_1.expect(newState.TimetableListState.CurrentIndex).to.eq(1);
        chai_1.expect(newState.TimetableListState.CurrentSubIndex).to.eq(0);
        const newState2 = masterState_1.MasterStateReducer(newState, new goToNextSubTimetable_1.GoToNextSubTimetable());
        chai_1.expect(newState2.TimetableListState.CurrentSubIndex).to.eq(1);
        const newState3 = masterState_1.MasterStateReducer(newState2, new goToNextTimetable_1.GoToNextTimetable());
        chai_1.expect(newState3.TimetableListState.CurrentSubIndex).to.eq(0);
    });
    it("should increment the current index cyclically", () => {
        const initialState = getInitialState([exports.NullGroupedTimetable, exports.NullGroupedTimetable, exports.NullGroupedTimetable]);
        initialState.TimetableListState.CurrentIndex = 2;
        const newState = masterState_1.MasterStateReducer(initialState, new goToNextTimetable_1.GoToNextTimetable());
        chai_1.expect(newState.TimetableListState.CurrentIndex).to.eq(0);
    });
});
exports.NullGroupedTimetable = {
    DayTimeMatrix: [],
    ListOfSlotUids: [[], [], [], []]
};
//# sourceMappingURL=_goToNextTimetable.test.js.map