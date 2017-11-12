import {
    expect
} from "chai";
import {
    isEqual
} from "lodash";
import {
    State,
    StateKind
} from "../../model/states/state";
import {
    GetTestTimetables1
} from "../../tests/testDataGenerator";
import {
    FilterTimetable
} from "../actions/filterTimetable";
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

const state0 = new State(StateKind.MaybeOccupied, 0, 16, 5);
const state1 = new State(StateKind.Clicked, 0, 16, 5);

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
});
