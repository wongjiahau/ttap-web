import {
    expect
} from "chai";
import {
    isEqual
} from "lodash";
import {
    StateKind,
    STCBox
} from "../../model/states/stcBox";
import {
    GetTestTimetables1
} from "../../tests/testDataGenerator";
import {
    FilterTimetable
} from "../actions/filterTimetable";
import {
    GoToNextTimetable
} from "../actions/goToNextTimetable";
import {
    DefilterTimetable
} from "./../actions/defilterTimetable";
import {
    UpdateTotalState
} from "./../actions/updateTotalState";
import {
    ITimetableListState,
    TimetableListState,
    TimetableListStateReducer
} from "./../reducers/timetableListState";

const state0 = new STCBox(StateKind.MaybeOccupied, 0, parseInt("1000000", 2), 5); // Monday 10-10.30 am
const state1 = new STCBox(StateKind.Clicked, 0, parseInt("1000000", 2), 5); // Monday 10-10.30 am
const state2 = new STCBox(StateKind.MaybeOccupied, 2, parseInt("1000000", 2), 5); // Wednesday 10-10.30 am
const state3 = new STCBox(StateKind.Clicked, 2, parseInt("1000000", 2), 5); // Wednesday 10-10.30 am

describe("DefilterTimetable action", () => {
    it("'s typename should be 'defilter timetable at [YX]'", () => {
        const action = new DefilterTimetable(state0);
        expect(action.TypeName()).to.eq(`defilter timetable at [${state0.Uid}]`);
    });

    it("should set property of FiltrateTimetables and ResidueTimetables ", () => {
        const initialState = new TimetableListState(GetTestTimetables1());
        const newState1 = TimetableListStateReducer(initialState, new FilterTimetable(state0).Action());
        const newState2 = TimetableListStateReducer(newState1, new DefilterTimetable(state1).Action());
        expect(newState2.FiltrateTimetables.length).to.eq(initialState.FiltrateTimetables.length);
        expect(newState2.ResidueTimetables.length).to.eq(0);
    });

    it("should set property of TotalState based on the filtered timetables", () => {
        const initialState = new TimetableListState(GetTestTimetables1());
        const newState1 = TimetableListStateReducer(initialState, new UpdateTotalState().Action());
        const newState2 = TimetableListStateReducer(newState1, new FilterTimetable(state0).Action());
        const newState3 = TimetableListStateReducer(newState2, new DefilterTimetable(state1).Action());
        expect(newState3.TotalState).to.deep.eq(newState1.TotalState);
    });

    it("should set property of UidsOfClickedState", () => {
        const initialState = new TimetableListState(GetTestTimetables1());
        const newState1 = TimetableListStateReducer(initialState, new FilterTimetable(state0).Action());
        expect(newState1.UidsOfClickedState.length).to.eq(1);
        const newState2 = TimetableListStateReducer(newState1, new DefilterTimetable(state1).Action());
        expect(newState2.UidsOfClickedState.length).to.eq(0);
    });

    it("should set property of ClickedTimeConstraint", () => {
        const initialState = new TimetableListState(GetTestTimetables1());
        const newState1 = TimetableListStateReducer(initialState, new FilterTimetable(state0).Action());
        expect(newState1.ClickedTimeConstraint).to.deep.eq([parseInt("1000000", 2), 0, 0, 0, 0, 0, 0]);
        const newState2 = TimetableListStateReducer(newState1, new DefilterTimetable(state1).Action());
        expect(newState2.ClickedTimeConstraint).to.deep.eq([0, 0, 0, 0, 0, 0, 0]);
    });

    it("should set property of CurrentIndex to 0", () => {
        const action = new DefilterTimetable(state0).Action();
        const initialState = new TimetableListState(GetTestTimetables1());
        let newState = TimetableListStateReducer(initialState, new GoToNextTimetable().Action());
        expect(newState.CurrentIndex).to.eq(1);
        newState = TimetableListStateReducer(newState, action);
        expect(newState.CurrentIndex).to.eq(0);
    });

    it("case 1", () => {
        const initialState = new TimetableListState(GetTestTimetables1());
        const newState1 = TimetableListStateReducer(initialState, new UpdateTotalState().Action());
        const newState2 = TimetableListStateReducer(newState1, new FilterTimetable(state0).Action());
        expect(newState2.ResidueTimetables.length).to.eq(5);
        expect(newState2.FiltrateTimetables.length).to.eq(24);
        const newState3 = TimetableListStateReducer(newState2, new FilterTimetable(state2).Action());
        expect(newState3.ResidueTimetables.length).to.eq(13);
        expect(newState3.FiltrateTimetables.length).to.eq(16);
        const newState4 = TimetableListStateReducer(newState3, new DefilterTimetable(state1).Action());
        // expect(newState4.ResidueTimetables.length).to.eq(9);
        expect(newState4.FiltrateTimetables.length).to.eq(20);
    });
});
