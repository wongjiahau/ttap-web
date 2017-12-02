import {expect} from "chai";
import {isEqual} from "lodash";
import {ToggleSetTimeConstraintView} from "./../actions/toggleSetTimeConstraintView";
import {IMasterState, MasterStateReducer, NewMasterState} from "./../reducers/masterState";

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
        const action = new ToggleSetTimeConstraintView(true);
        const initialState = NewMasterState();
        expect(initialState.SetTimeConstraintState.IsOpen).to.eq(false);
        const newState = MasterStateReducer(initialState, action);
        expect(newState.SetTimeConstraintState.IsOpen).to.eq(true);
    });

    it("should set IsOpen property of SetTimeConstraintState to true when passed in false", () => {
        const action = new ToggleSetTimeConstraintView(true);
        const initialState = NewMasterState();
        let newState = MasterStateReducer(initialState, action);
        expect(newState.SetTimeConstraintState.IsOpen).to.eq(true);
        newState = MasterStateReducer(initialState, new ToggleSetTimeConstraintView(false));
        expect(newState.SetTimeConstraintState.IsOpen).to.eq(false);
    });
});
