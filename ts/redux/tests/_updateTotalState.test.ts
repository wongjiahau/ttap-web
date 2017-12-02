import {
    expect
} from "chai";
import {
    StateKind,
    STCBox
} from "../../model/states/stcBox";
import {
    GetTestTimetables1
} from "../../tests/testDataGenerator";
import {
    NewTimetableListState
} from "../reducers/timetableListState";
import {
    FilterTimetable
} from "./../actions/filterTimetable";
import {
    UpdateTotalState
} from "./../actions/updateTotalState";
import {
    IMasterState,
    MasterStateReducer,
    NewMasterState
} from "./../reducers/masterState";

function getInitialState(): IMasterState {
    return {
        ...NewMasterState(),
        TimetableListState: NewTimetableListState(GetTestTimetables1())
    };
}

describe("UpdateTotalState action", () => {
    it("'s typename should be 'update total state'", () => {
        const action = new UpdateTotalState();
        expect(action.TypeName()).to.eq("update total state");
    });

    it("should set the TotalState property", () => {
        const action = new UpdateTotalState();
        const initialState = getInitialState();
        expect(initialState.SetTimeConstraintState.TotalState).to.eq(null);
        const newState = MasterStateReducer(initialState, action);
        expect(newState.SetTimeConstraintState.TotalState).to.not.eq(null);
    });

    it("case 1", () => {
        // GIVEN Ali selected some subjects and got a set of timetables
        // WHEN Ali set some time constraint
        // AND Ali close the SetTimeConstraintView
        // Then when Ali open the SetTimeConstraintView again
        // Ali should sees that the view is the same as previous when he closes it
        const updateTotalState = new UpdateTotalState();
        const initialState = getInitialState();
        const newState1 = MasterStateReducer(initialState, updateTotalState);
        const state = new STCBox(StateKind.MaybeOccupied, 0, 16, 5);
        const newState2 = MasterStateReducer(newState1, new FilterTimetable(state));
        const newState3 = MasterStateReducer(newState2, updateTotalState);
        expect(newState3.SetTimeConstraintState.TotalState)
            .to.deep.eq(newState2.SetTimeConstraintState.TotalState);
    });

});
