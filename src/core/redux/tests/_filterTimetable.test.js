"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const timetableListState_1 = require("../reducers/timetableListState");
const stcBox_1 = require("./../../model/matrix/stcBox");
const testDataGenerator_1 = require("./../../tests/testDataGenerator");
const filterTimetable_1 = require("./../actions/filterTimetable");
const goToNextTimetable_1 = require("./../actions/goToNextTimetable");
const masterState_1 = require("./../reducers/masterState");
const state = new stcBox_1.STCBox(stcBox_1.BoxKind.MaybeOccupied, 0, parseInt("1000000", 2), 5);
function getInitialState() {
    const result = masterState_1.NewMasterState();
    result.TimetableListState = timetableListState_1.NewTimetableListState(testDataGenerator_1.GetTestTimetables1(), testDataGenerator_1.GetTestRawSlot1());
    return result;
}
describe("FilterTimetable action", () => {
    it("'s typename should be 'filter timetable at [YX]'", () => {
        const action = new filterTimetable_1.FilterTimetable(state);
        chai_1.expect(action.TypeName()).to.eq(`filter timetable at [${state.Uid}]`);
    });
    it("should set property of TimetableListState.FiltrateTimetables and TimetableListState.ResidueTimetables ", () => {
        const initialState = getInitialState();
        const newState = masterState_1.MasterStateReducer(initialState, new filterTimetable_1.FilterTimetable(state));
        chai_1.expect(newState.TimetableListState.FiltrateTimetables)
            .to.not.deep.eq(initialState.TimetableListState.FiltrateTimetables);
        chai_1.expect(newState.TimetableListState.ResidueTimetables)
            .to.not.deep.eq(initialState.TimetableListState.ResidueTimetables);
    });
    it("the resulting TimetableListState.FiltrateTimetables and TimetableListState.ResidueTimetables should equal to the original list of timetables when they concated", () => {
        const initialState = getInitialState();
        const newState = masterState_1.MasterStateReducer(initialState, new filterTimetable_1.FilterTimetable(state));
        chai_1.expect(newState.TimetableListState.FiltrateTimetables
            .concat(newState.TimetableListState.ResidueTimetables).length)
            .to.eq(initialState.TimetableListState.FiltrateTimetables.length);
    });
    it("should set property of SetTimeConstraintState.TotalState based on the filtered timetables", () => {
        const action = new filterTimetable_1.FilterTimetable(state);
        const initialState = getInitialState();
        chai_1.expect(initialState.SetTimeConstraintState.TotalMatrix).to.deep.eq([]);
        const newState = masterState_1.MasterStateReducer(initialState, action);
        chai_1.expect(newState.SetTimeConstraintState.TotalMatrix).to.not.deep.eq([]);
    });
    it("should set property of SetTimeConstraintState.UidsOfClickedState", () => {
        const action = new filterTimetable_1.FilterTimetable(state);
        const initialState = getInitialState();
        chai_1.expect(initialState.SetTimeConstraintState.UidsOfClickedBoxes.length).to.eq(0);
        const newState = masterState_1.MasterStateReducer(initialState, action);
        chai_1.expect(newState.SetTimeConstraintState.UidsOfClickedBoxes.length).to.eq(1);
        chai_1.expect(newState.SetTimeConstraintState.UidsOfClickedBoxes[0]).to.eq("05");
    });
    it("should set property of SetTimeConstraintState.ClickedTimeConstraint", () => {
        const action = new filterTimetable_1.FilterTimetable(state);
        const initialState = getInitialState();
        chai_1.expect(initialState.SetTimeConstraintState.ClickedTimeConstraint).to.deep.eq([0, 0, 0, 0, 0, 0, 0]);
        const newState = masterState_1.MasterStateReducer(initialState, action);
        chai_1.expect(newState.SetTimeConstraintState.ClickedTimeConstraint).to.deep.eq([parseInt("1000000", 2), 0, 0, 0, 0, 0, 0]);
    });
    it("should set property of CurrentIndex to 0", () => {
        const action = new filterTimetable_1.FilterTimetable(state);
        const initialState = getInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new goToNextTimetable_1.GoToNextTimetable());
        chai_1.expect(newState.TimetableListState.CurrentIndex).to.eq(1);
        newState = masterState_1.MasterStateReducer(newState, action);
        chai_1.expect(newState.TimetableListState.CurrentIndex).to.eq(0);
    });
});
//# sourceMappingURL=_filterTimetable.test.js.map