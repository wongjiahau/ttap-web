import {
    expect
} from "chai";
import {
    State,
    StateKind
} from "../../model/states/state";
import {
    GetTestTimetables1
} from "../../tests/testDataGenerator";
import {
    FilterTimetable
} from "./../actions/filterTimetable";
import {
    UpdateTotalState
} from "./../actions/updateTotalState";
import {
    ITimetableListState,
    TimetableListState,
    TimetableListStateReducer
} from "./../reducers/timetableListState";

describe("UpdateTotalState action", () => {
    it("'s typename should be 'update total state'", () => {
        const action = new UpdateTotalState();
        expect(action.TypeName()).to.eq("update total state");
    });

    it("should set the TotalState property", () => {
        const action = new UpdateTotalState().Action();
        const initialState = new TimetableListState(GetTestTimetables1());
        expect(initialState.TotalState).to.eq(null);
        const newState = TimetableListStateReducer(initialState, action);
        expect(newState.TotalState).to.not.eq(null);
    });

    it("case 1", () => {
        // GIVEN Ali selected some subjects and got a set of timetables
        // WHEN Ali set some time constraint
        // AND Ali close the SetTimeConstraintView
        // Then when Ali open the SetTimeConstraintView again
        // Ali should sees that the view is the same as previous when he closes it
        const updateTotalState = new UpdateTotalState().Action();
        const initialState = new TimetableListState(GetTestTimetables1());
        const newState1 = TimetableListStateReducer(initialState, updateTotalState);
        const state = new State(StateKind.MaybeOccupied, 0, 16, 5);
        const newState2 = TimetableListStateReducer(newState1, new FilterTimetable(state).Action());
        const newState3 = TimetableListStateReducer(newState2, updateTotalState);
        expect(newState3.TotalState).to.deep.eq(newState2.TotalState);
    });

});
