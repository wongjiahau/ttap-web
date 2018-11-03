import {
    expect
} from "chai";
import {
    BoxKind,
    STCBox
} from "../../model/matrix/stcBox";
import {
    GetTestRawSlot1, GetTestTimetables1
} from "../../tests/testDataGenerator";
import {
    FilterTimetable
} from "../actions/filterTimetable";
import {
    UpdateTotalMatrix
} from "../actions/updateTotalMatrix";
import {
    IMasterState,
    MasterStateReducer,
    NewMasterState
} from "../reducers/masterState";
import {
    NewTimetableListState
} from "../reducers/timetableListState";

function getInitialState(): IMasterState {
    return {
        ...NewMasterState(),
        TimetableListState: NewTimetableListState(GetTestTimetables1(), GetTestRawSlot1())
    };
}

describe("UpdateTotalState action", () => {
    it("'s typename should be 'update total state'", () => {
        const action = new UpdateTotalMatrix();
        expect(action.TypeName()).to.eq("update total state");
    });

    it("should set the TotalState property", () => {
        const action = new UpdateTotalMatrix();
        const initialState = getInitialState();
        expect(initialState.SetTimeConstraintState.TotalMatrix).to.deep.eq([]);
        const newState = MasterStateReducer(initialState, action);
        expect(newState.SetTimeConstraintState.TotalMatrix).to.not.eq(null);
    });

    it("should clear UidsOfClickedState", () => {
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new UpdateTotalMatrix());
        const stcBox = new STCBox(BoxKind.MaybeOccupied, 0, parseInt("1000000", 2), 5); // Monday 10-10.30 am
        newState = MasterStateReducer(newState, new FilterTimetable(stcBox));
        expect(newState.SetTimeConstraintState.UidsOfClickedBoxes).to.deep.eq(["05"]);
        newState = MasterStateReducer(newState, new UpdateTotalMatrix());
        expect(newState.SetTimeConstraintState.UidsOfClickedBoxes).to.have.lengthOf(0);
    });

    it("should reset ClickedTimeConstraint", () => {
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new UpdateTotalMatrix());
        const stcBox = new STCBox(BoxKind.MaybeOccupied, 0, parseInt("1000000", 2), 5); // Monday 10-10.30 am
        newState = MasterStateReducer(newState, new FilterTimetable(stcBox));
        expect(newState.SetTimeConstraintState.ClickedTimeConstraint).to.deep.eq([64, 0, 0, 0, 0, 0, 0]);
        newState = MasterStateReducer(newState, new UpdateTotalMatrix());
        expect(newState.SetTimeConstraintState.ClickedTimeConstraint).to.deep.eq([0, 0, 0, 0, 0, 0, 0]);
    });

});
