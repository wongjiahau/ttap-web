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
    DefilterTimetable
} from "../actions/defilterTimetable";
import {
    FilterTimetable
} from "../actions/filterTimetable";
import {
    GoToNextTimetable
} from "../actions/goToNextTimetable";
import {
    UpdateTotalState
} from "../actions/updateTotalState";
import {
    IMasterState,
    MasterStateReducer,
    NewMasterState
} from "../reducers/masterState";
import {
    NewTimetableListState
} from "../reducers/timetableListState";

const state0 = new STCBox(StateKind.MaybeOccupied, 0, parseInt("1000000", 2), 5); // Monday 10-10.30 am
const state1 = new STCBox(StateKind.Clicked, 0, parseInt("1000000", 2), 5); // Monday 10-10.30 am
const state2 = new STCBox(StateKind.MaybeOccupied, 2, parseInt("1000000", 2), 5); // Wednesday 10-10.30 am
const state3 = new STCBox(StateKind.Clicked, 2, parseInt("1000000", 2), 5); // Wednesday 10-10.30 am

function getInitialState(): IMasterState {
    const result = NewMasterState();
    result.TimetableListState = NewTimetableListState(GetTestTimetables1());
    return result;
}

describe("DefilterTimetable action", () => {
    it("'s typename should be 'defilter timetable at [YX]'", () => {
        const action = new DefilterTimetable(state0);
        expect(action.TypeName()).to.eq(`defilter timetable at [${state0.Uid}]`);
    });

    it("should set property of FiltrateTimetables and ResidueTimetables ", () => {
        const initialState = getInitialState();
        const newState1 = MasterStateReducer(initialState, new FilterTimetable(state0));
        const newState2 = MasterStateReducer(newState1, new DefilterTimetable(state1));
        expect(newState2.TimetableListState.FiltrateTimetables.length)
            .to.eq(initialState.TimetableListState.FiltrateTimetables.length);
        expect(newState2.TimetableListState.ResidueTimetables.length).to.eq(0);
    });

    it("should set property of TotalState based on the filtered timetables", () => {
        const initialState = getInitialState();
        const newState1 = MasterStateReducer(initialState, new UpdateTotalState());
        const newState2 = MasterStateReducer(newState1, new FilterTimetable(state0));
        const newState3 = MasterStateReducer(newState2, new DefilterTimetable(state1));
        expect(newState3.SetTimeConstraintState.TotalState)
            .to.deep.eq(newState1.SetTimeConstraintState.TotalState);
    });

    it("should set property of UidsOfClickedState", () => {
        const initialState = getInitialState();
        const newState1 = MasterStateReducer(initialState, new FilterTimetable(state0));
        expect(newState1.SetTimeConstraintState.UidsOfClickedState.length).to.eq(1);
        const newState2 = MasterStateReducer(newState1, new DefilterTimetable(state1));
        expect(newState2.SetTimeConstraintState.UidsOfClickedState.length).to.eq(0);
    });

    it("should set property of ClickedTimeConstraint", () => {
        const initialState = getInitialState();
        const newState1 = MasterStateReducer(initialState, new FilterTimetable(state0));
        expect(newState1.SetTimeConstraintState.ClickedTimeConstraint).to.deep.eq([parseInt("1000000", 2), 0, 0, 0, 0, 0, 0]);
        const newState2 = MasterStateReducer(newState1, new DefilterTimetable(state1));
        expect(newState2.SetTimeConstraintState.ClickedTimeConstraint).to.deep.eq([0, 0, 0, 0, 0, 0, 0]);
    });

    it("should set property of CurrentIndex to 0", () => {
        const action = new DefilterTimetable(state0);
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new GoToNextTimetable());
        expect(newState.TimetableListState.CurrentIndex).to.eq(1);
        newState = MasterStateReducer(newState, action);
        expect(newState.TimetableListState.CurrentIndex).to.eq(0);
    });

    it("case 1", () => {
        const initialState = getInitialState();
        const newState1 = MasterStateReducer(initialState, new UpdateTotalState());
        const newState2 = MasterStateReducer(newState1, new FilterTimetable(state0));
        expect(newState2.TimetableListState.ResidueTimetables.length).to.eq(5);
        expect(newState2.TimetableListState.FiltrateTimetables.length).to.eq(24);
        const newState3 = MasterStateReducer(newState2, new FilterTimetable(state2));
        expect(newState3.TimetableListState.ResidueTimetables.length).to.eq(13);
        expect(newState3.TimetableListState.FiltrateTimetables.length).to.eq(16);
        const newState4 = MasterStateReducer(newState3, new DefilterTimetable(state1));
        // expect(newState4.ResidueTimetables.length).to.eq(9);
        expect(newState4.TimetableListState.FiltrateTimetables.length).to.eq(20);
    });
});
