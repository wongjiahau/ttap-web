import {
    expect
} from "chai";
import {
    GetTestTimetables1
} from "../../tests/testDataGenerator";
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
});
