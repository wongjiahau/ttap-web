import {
    expect
} from "chai";
import {
    isEqual
} from "lodash";
import {
    GoToRandomTimetable
} from "./../actions/goToRandomTimetable";
import {
    ITimetableListState,
    TimetableListState,
    TimetableListStateReducer
} from "./../reducers/timetableListState";
describe("GoToRandomTimetable action", () => {
    it("'s typename should be 'go to random timetable'", () => {
        const action = new GoToRandomTimetable();
        expect(action.TypeName()).to.eq("go to random timetable");
    });

    it("should set the CurrentIndex property to a random value", () => {
        const action = new GoToRandomTimetable().Action();
        const initialState = new TimetableListState();
        const newState = TimetableListStateReducer(initialState, action);
        expect(newState.CurrentIndex).to.most(newState.FiltrateTimetables.length - 1);
        expect(newState.CurrentIndex).to.least(0);
    });

    it("should set the CurrentIndex to a value that is different from previous CurrentIndex", () => {
        const action = new GoToRandomTimetable().Action();
        const initialState = new TimetableListState();
        const newState = TimetableListStateReducer(initialState, action);
        expect(newState.CurrentIndex).to.not.eq(initialState.CurrentIndex);
    });

    it("should not loop infinitely when there is only one timetable", () => {
        const action = new GoToRandomTimetable().Action();
        const initialState = new TimetableListState([null]);
        expect(() => {
            const newState = TimetableListStateReducer(initialState, action);
        }).to.not.throw();
    });
});
