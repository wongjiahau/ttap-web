import {
    expect
} from "chai";
import {
    NewTimetableListState
} from "../reducers/timetableListState";
import {
    StateKind,
    STCBox
} from "./../../model/states/stcBox";
import {
    GetTestTimetables1
} from "./../../tests/testDataGenerator";
import {
    FilterTimetable
} from "./../actions/filterTimetable";
import {
    GoToNextTimetable
} from "./../actions/goToNextTimetable";
import {
    IMasterState,
    MasterStateReducer,
    NewMasterState
} from "./../reducers/masterState";

const state = new STCBox(StateKind.MaybeOccupied, 0, parseInt("1000000", 2), 5);

function getInitialState(): IMasterState {
    const result = NewMasterState();
    result.TimetableListState = NewTimetableListState(GetTestTimetables1());
    return result;
}

describe("FilterTimetable action", () => {
    it("'s typename should be 'filter timetable at [YX]'", () => {
        const action = new FilterTimetable(state);
        expect(action.TypeName()).to.eq(`filter timetable at [${state.Uid}]`);
    });

    it("should set property of TimetableListState.FiltrateTimetables and TimetableListState.ResidueTimetables ", () => {
        const initialState = getInitialState();
        const newState = MasterStateReducer(initialState, new FilterTimetable(state));
        expect(newState.TimetableListState.FiltrateTimetables)
            .to.not.deep.eq(initialState.TimetableListState.FiltrateTimetables);
        expect(newState.TimetableListState.ResidueTimetables)
            .to.not.deep.eq(initialState.TimetableListState.ResidueTimetables);
    });

    it("the resulting TimetableListState.FiltrateTimetables and TimetableListState.ResidueTimetables should equal to the original list of timetables when they concated", () => {
        const initialState = getInitialState();
        const newState = MasterStateReducer(initialState, new FilterTimetable(state));
        expect(newState.TimetableListState.FiltrateTimetables
                .concat(newState.TimetableListState.ResidueTimetables).length)
            .to.eq(initialState.TimetableListState.FiltrateTimetables.length);
    });

    it("should set property of SetTimeConstraintState.TotalState based on the filtered timetables", () => {
        const action = new FilterTimetable(state);
        const initialState = getInitialState();
        expect(initialState.SetTimeConstraintState.TotalState).to.eq(null);
        const newState = MasterStateReducer(initialState, action);
        expect(newState.SetTimeConstraintState.TotalState).to.not.eq(null);
    });

    it("should set property of SetTimeConstraintState.UidsOfClickedState", () => {
        const action = new FilterTimetable(state);
        const initialState = getInitialState();
        expect(initialState.SetTimeConstraintState.UidsOfClickedState.length).to.eq(0);
        const newState = MasterStateReducer(initialState, action);
        expect(newState.SetTimeConstraintState.UidsOfClickedState.length).to.eq(1);
        expect(newState.SetTimeConstraintState.UidsOfClickedState[0]).to.eq("05");
    });

    it("should set property of SetTimeConstraintState.ClickedTimeConstraint", () => {
        const action = new FilterTimetable(state);
        const initialState = getInitialState();
        expect(initialState.SetTimeConstraintState.ClickedTimeConstraint).to.deep.eq([0, 0, 0, 0, 0, 0, 0]);
        const newState = MasterStateReducer(initialState, action);
        expect(newState.SetTimeConstraintState.ClickedTimeConstraint).to.deep.eq([parseInt("1000000", 2), 0, 0, 0, 0, 0, 0]);
    });

    it("should set property of CurrentIndex to 0", () => {
        const action = new FilterTimetable(state);
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new GoToNextTimetable());
        expect(newState.TimetableListState.CurrentIndex).to.eq(1);
        newState = MasterStateReducer(newState, action);
        expect(newState.TimetableListState.CurrentIndex).to.eq(0);
    });
});
