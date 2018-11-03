import {
    expect
} from "chai";
import { TimePeriod } from "../../att/timePeriod";
import {
    BoxKind,
    STCBox
} from "../../model/matrix/stcBox";
import {
    GetTestRawSlot1, GetTestTimetables1
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

const state0 = new STCBox(BoxKind.MaybeOccupied, 0, parseInt("10000", 2), 5); // Monday 10-10.30 am
const state1 = new STCBox(BoxKind.Clicked,       0, parseInt("10000", 2), 5); // Monday 10-10.30 am
const state2 = new STCBox(BoxKind.MaybeOccupied, 2, parseInt("10000", 2), 5); // Wednesday 10-10.30 am
const state3 = new STCBox(BoxKind.Clicked,       2, parseInt("10000", 2), 5); // Wednesday 10-10.30 am

function getInitialState(): IMasterState {
    const result = NewMasterState();
    result.TimetableListState = NewTimetableListState(GetTestTimetables1(), GetTestRawSlot1());
    return result;
}

describe("DefilterTimetable action", () => {
    beforeEach(() => {
        TimePeriod.SetMinTo8am();
    });

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
        const newState1 = MasterStateReducer(initialState, new UpdateTotalMatrix());
        const newState2 = MasterStateReducer(newState1, new FilterTimetable(state0));
        const newState3 = MasterStateReducer(newState2, new DefilterTimetable(state1));
        expect(newState3.SetTimeConstraintState.TotalMatrix)
            .to.deep.eq(newState1.SetTimeConstraintState.TotalMatrix);
    });

    it("should set property of UidsOfClickedState", () => {
        const initialState = getInitialState();
        const newState1 = MasterStateReducer(initialState, new FilterTimetable(state0));
        expect(newState1.SetTimeConstraintState.UidsOfClickedBoxes.length).to.eq(1);
        const newState2 = MasterStateReducer(newState1, new DefilterTimetable(state1));
        expect(newState2.SetTimeConstraintState.UidsOfClickedBoxes.length).to.eq(0);
    });

    it("should set property of ClickedTimeConstraint", () => {
        const initialState = getInitialState();
        const newState1 = MasterStateReducer(initialState, new FilterTimetable(state0));
        expect(newState1.SetTimeConstraintState.ClickedTimeConstraint).to.deep.eq([parseInt("10000", 2), 0, 0, 0, 0, 0, 0]);
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
        const newState1 = MasterStateReducer(initialState, new UpdateTotalMatrix());
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
