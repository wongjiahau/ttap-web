import {expect} from "chai";
import {isEqual} from "lodash";
import {ToggleSetTimeConstraintView} from "./../actions/toggleSetTimeConstraintView";
import {ITimetableListState, TimetableListState, TimetableListStateReducer} from "./../reducers/timetableListState";

describe("OpenSetTimeConstraintView action", () => {
    it("'s typename should be 'open set time constraint view' if passed in true", () => {
        const action = new ToggleSetTimeConstraintView(true);
        expect(action.TypeName()).to.eq("open set time constraint view");
    });

    it("'s typename should be 'close set time constraint view' if passed in false", () => {
        const action = new ToggleSetTimeConstraintView(false);
        expect(action.TypeName()).to.eq("close set time constraint view");
    });

    it("should set IsOpen property of SetTimeConstraintState to true when passed in true", () => {
        const action = new ToggleSetTimeConstraintView(true).Action();
        const initialState = new TimetableListState();
        expect(initialState.IsSetTimeConstraintViewOpen).to.eq(false);
        const newState = TimetableListStateReducer(initialState, action);
        expect(newState.IsSetTimeConstraintViewOpen).to.eq(true);
    });

    it("should set IsOpen property of SetTimeConstraintState to true when passed in false", () => {
        const action = new ToggleSetTimeConstraintView(true).Action();
        const initialState = new TimetableListState();
        let newState = TimetableListStateReducer(initialState, action);
        expect(newState.IsSetTimeConstraintViewOpen).to.eq(true);
        newState = TimetableListStateReducer(initialState, new ToggleSetTimeConstraintView(false));
        expect(newState.IsSetTimeConstraintViewOpen).to.eq(false);
    });
});
