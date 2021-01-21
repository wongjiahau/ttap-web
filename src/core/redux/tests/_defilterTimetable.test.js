"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const timePeriod_1 = require("../../att/timePeriod");
const stcBox_1 = require("../../model/matrix/stcBox");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const defilterTimetable_1 = require("../actions/defilterTimetable");
const filterTimetable_1 = require("../actions/filterTimetable");
const goToNextTimetable_1 = require("../actions/goToNextTimetable");
const updateTotalMatrix_1 = require("../actions/updateTotalMatrix");
const masterState_1 = require("../reducers/masterState");
const timetableListState_1 = require("../reducers/timetableListState");
const state0 = new stcBox_1.STCBox(stcBox_1.BoxKind.MaybeOccupied, 0, parseInt("10000", 2), 5); // Monday 10-10.30 am
const state1 = new stcBox_1.STCBox(stcBox_1.BoxKind.Clicked, 0, parseInt("10000", 2), 5); // Monday 10-10.30 am
const state2 = new stcBox_1.STCBox(stcBox_1.BoxKind.MaybeOccupied, 2, parseInt("10000", 2), 5); // Wednesday 10-10.30 am
const state3 = new stcBox_1.STCBox(stcBox_1.BoxKind.Clicked, 2, parseInt("10000", 2), 5); // Wednesday 10-10.30 am
function getInitialState() {
    const result = masterState_1.NewMasterState();
    result.TimetableListState = timetableListState_1.NewTimetableListState(testDataGenerator_1.GetTestTimetables1(), testDataGenerator_1.GetTestRawSlot1());
    return result;
}
describe("DefilterTimetable action", () => {
    beforeEach(() => {
        timePeriod_1.TimePeriod.SetMinTo8am();
    });
    it("'s typename should be 'defilter timetable at [YX]'", () => {
        const action = new defilterTimetable_1.DefilterTimetable(state0);
        chai_1.expect(action.TypeName()).to.eq(`defilter timetable at [${state0.Uid}]`);
    });
    it("should set property of FiltrateTimetables and ResidueTimetables ", () => {
        const initialState = getInitialState();
        const newState1 = masterState_1.MasterStateReducer(initialState, new filterTimetable_1.FilterTimetable(state0));
        const newState2 = masterState_1.MasterStateReducer(newState1, new defilterTimetable_1.DefilterTimetable(state1));
        chai_1.expect(newState2.TimetableListState.FiltrateTimetables.length)
            .to.eq(initialState.TimetableListState.FiltrateTimetables.length);
        chai_1.expect(newState2.TimetableListState.ResidueTimetables.length).to.eq(0);
    });
    it("should set property of TotalState based on the filtered timetables", () => {
        const initialState = getInitialState();
        const newState1 = masterState_1.MasterStateReducer(initialState, new updateTotalMatrix_1.UpdateTotalMatrix());
        const newState2 = masterState_1.MasterStateReducer(newState1, new filterTimetable_1.FilterTimetable(state0));
        const newState3 = masterState_1.MasterStateReducer(newState2, new defilterTimetable_1.DefilterTimetable(state1));
        chai_1.expect(newState3.SetTimeConstraintState.TotalMatrix)
            .to.deep.eq(newState1.SetTimeConstraintState.TotalMatrix);
    });
    it("should set property of UidsOfClickedState", () => {
        const initialState = getInitialState();
        const newState1 = masterState_1.MasterStateReducer(initialState, new filterTimetable_1.FilterTimetable(state0));
        chai_1.expect(newState1.SetTimeConstraintState.UidsOfClickedBoxes.length).to.eq(1);
        const newState2 = masterState_1.MasterStateReducer(newState1, new defilterTimetable_1.DefilterTimetable(state1));
        chai_1.expect(newState2.SetTimeConstraintState.UidsOfClickedBoxes.length).to.eq(0);
    });
    it("should set property of ClickedTimeConstraint", () => {
        const initialState = getInitialState();
        const newState1 = masterState_1.MasterStateReducer(initialState, new filterTimetable_1.FilterTimetable(state0));
        chai_1.expect(newState1.SetTimeConstraintState.ClickedTimeConstraint).to.deep.eq([parseInt("10000", 2), 0, 0, 0, 0, 0, 0]);
        const newState2 = masterState_1.MasterStateReducer(newState1, new defilterTimetable_1.DefilterTimetable(state1));
        chai_1.expect(newState2.SetTimeConstraintState.ClickedTimeConstraint).to.deep.eq([0, 0, 0, 0, 0, 0, 0]);
    });
    it("should set property of CurrentIndex to 0", () => {
        const action = new defilterTimetable_1.DefilterTimetable(state0);
        const initialState = getInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new goToNextTimetable_1.GoToNextTimetable());
        chai_1.expect(newState.TimetableListState.CurrentIndex).to.eq(1);
        newState = masterState_1.MasterStateReducer(newState, action);
        chai_1.expect(newState.TimetableListState.CurrentIndex).to.eq(0);
    });
    it("case 1", () => {
        const initialState = getInitialState();
        const newState1 = masterState_1.MasterStateReducer(initialState, new updateTotalMatrix_1.UpdateTotalMatrix());
        const newState2 = masterState_1.MasterStateReducer(newState1, new filterTimetable_1.FilterTimetable(state0));
        chai_1.expect(newState2.TimetableListState.ResidueTimetables.length).to.eq(5);
        chai_1.expect(newState2.TimetableListState.FiltrateTimetables.length).to.eq(24);
        const newState3 = masterState_1.MasterStateReducer(newState2, new filterTimetable_1.FilterTimetable(state2));
        chai_1.expect(newState3.TimetableListState.ResidueTimetables.length).to.eq(13);
        chai_1.expect(newState3.TimetableListState.FiltrateTimetables.length).to.eq(16);
        const newState4 = masterState_1.MasterStateReducer(newState3, new defilterTimetable_1.DefilterTimetable(state1));
        // expect(newState4.ResidueTimetables.length).to.eq(9);
        chai_1.expect(newState4.TimetableListState.FiltrateTimetables.length).to.eq(20);
    });
});
//# sourceMappingURL=_defilterTimetable.test.js.map