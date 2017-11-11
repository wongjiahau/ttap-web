import {
    expect
} from "chai";
import {
    State,
    StateKind
} from "./../../model/states/state";
import {
    GetTestTimetables1
} from "./../../tests/testDataGenerator";
import {
    FilterTimetable
} from "./../actions/filterTimetable";
import {
    ITimetableListState,
    TimetableListState,
    TimetableListStateReducer
} from "./../reducers/timetableListState";

const state = new State(StateKind.MaybeOccupied, 0, 16, null);

describe("FilterTimetable action", () => {
    it("'s typename should be 'filter timetable'", () => {
        const action = new FilterTimetable(null);
        expect(action.TypeName()).to.eq("filter timetable");
    });

    it("should set property of FileteredTimetable", () => {
        const initialState = new TimetableListState(GetTestTimetables1());
        expect(initialState.AllTimetables).to.deep.eq(initialState.FilteredTimetables);
        expect(initialState.TotalState).to.eq(null);
        const newState = TimetableListStateReducer(initialState, new FilterTimetable(state).Action());
        expect(newState.AllTimetables).to.not.deep.eq(newState.FilteredTimetables);
    });

    it("should set property of TotalState based on the filtered timetables", () => {
        const action = new FilterTimetable(state).Action();
        const initialState = new TimetableListState(GetTestTimetables1());
        expect(initialState.TotalState).to.eq(null);
        const newState = TimetableListStateReducer(initialState, action);
        expect(newState.TotalState).to.not.eq(null);
    });
});
