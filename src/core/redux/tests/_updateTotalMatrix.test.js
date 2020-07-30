"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const stcBox_1 = require("../../model/matrix/stcBox");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const filterTimetable_1 = require("../actions/filterTimetable");
const updateTotalMatrix_1 = require("../actions/updateTotalMatrix");
const masterState_1 = require("../reducers/masterState");
const timetableListState_1 = require("../reducers/timetableListState");
function getInitialState() {
    return Object.assign({}, masterState_1.NewMasterState(), { TimetableListState: timetableListState_1.NewTimetableListState(testDataGenerator_1.GetTestTimetables1(), testDataGenerator_1.GetTestRawSlot1()) });
}
describe("UpdateTotalState action", () => {
    it("'s typename should be 'update total state'", () => {
        const action = new updateTotalMatrix_1.UpdateTotalMatrix();
        chai_1.expect(action.TypeName()).to.eq("update total state");
    });
    it("should set the TotalState property", () => {
        const action = new updateTotalMatrix_1.UpdateTotalMatrix();
        const initialState = getInitialState();
        chai_1.expect(initialState.SetTimeConstraintState.TotalMatrix).to.deep.eq([]);
        const newState = masterState_1.MasterStateReducer(initialState, action);
        chai_1.expect(newState.SetTimeConstraintState.TotalMatrix).to.not.eq(null);
    });
    it("should clear UidsOfClickedState", () => {
        const initialState = getInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new updateTotalMatrix_1.UpdateTotalMatrix());
        const stcBox = new stcBox_1.STCBox(stcBox_1.BoxKind.MaybeOccupied, 0, parseInt("1000000", 2), 5); // Monday 10-10.30 am
        newState = masterState_1.MasterStateReducer(newState, new filterTimetable_1.FilterTimetable(stcBox));
        chai_1.expect(newState.SetTimeConstraintState.UidsOfClickedBoxes).to.deep.eq(["05"]);
        newState = masterState_1.MasterStateReducer(newState, new updateTotalMatrix_1.UpdateTotalMatrix());
        chai_1.expect(newState.SetTimeConstraintState.UidsOfClickedBoxes).to.have.lengthOf(0);
    });
    it("should reset ClickedTimeConstraint", () => {
        const initialState = getInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new updateTotalMatrix_1.UpdateTotalMatrix());
        const stcBox = new stcBox_1.STCBox(stcBox_1.BoxKind.MaybeOccupied, 0, parseInt("1000000", 2), 5); // Monday 10-10.30 am
        newState = masterState_1.MasterStateReducer(newState, new filterTimetable_1.FilterTimetable(stcBox));
        chai_1.expect(newState.SetTimeConstraintState.ClickedTimeConstraint).to.deep.eq([64, 0, 0, 0, 0, 0, 0]);
        newState = masterState_1.MasterStateReducer(newState, new updateTotalMatrix_1.UpdateTotalMatrix());
        chai_1.expect(newState.SetTimeConstraintState.ClickedTimeConstraint).to.deep.eq([0, 0, 0, 0, 0, 0, 0]);
    });
});
//# sourceMappingURL=_updateTotalMatrix.test.js.map