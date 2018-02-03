import {
    expect
} from "chai";
import {
    StateKind,
    STCBox
} from "../../model/states/stcBox";
import {
    GetTestRawSlot1, GetTestTimetables1
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
        TimetableListState: NewTimetableListState(GetTestTimetables1(), GetTestRawSlot1())
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

    it("should clear UidsOfClickedState", () => {
        const action = new UpdateTotalState();
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, action);
        const stcBox = new STCBox(StateKind.MaybeOccupied, 0, parseInt("1000000", 2), 5); // Monday 10-10.30 am
        newState = MasterStateReducer(newState, new FilterTimetable(stcBox));
        expect(newState.SetTimeConstraintState.UidsOfClickedState).to.deep.eq(["05"]);
    });

});
