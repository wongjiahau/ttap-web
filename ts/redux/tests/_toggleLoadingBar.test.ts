import {expect} from "chai";
import {isEqual} from "lodash";
import {ToggleLoadingBar} from "./../actions/toggleLoadingBar";
import {IMasterState, MasterStateReducer, NewMasterState} from "./../reducers/masterState";
describe("ToggleLoadingBar action", () => {
    it("'s typename should be 'toggle loading bar'", () => {
        const action = new ToggleLoadingBar(false);
        expect(action.TypeName()).to.eq("toggle loading bar");
    });

    it("should set IsShowingLoadingBar property to true if passed in true", () => {
        const action = new ToggleLoadingBar(true);
        const initialState = NewMasterState();
        expect(initialState.SubjectListState.IsShowingLoadingBar).to.eq(false);
        const newState = MasterStateReducer(initialState, action);
        expect(newState.SubjectListState.IsShowingLoadingBar).to.eq(true);
    });

    it("should set IsShowingLoadingBar property to false if passed in false", () => {
        const initialState = NewMasterState();
        let newState = MasterStateReducer(initialState, new ToggleLoadingBar(true));
        expect(newState.SubjectListState.IsShowingLoadingBar).to.eq(true);
        newState = MasterStateReducer(initialState, new ToggleLoadingBar(false));
        expect(newState.SubjectListState.IsShowingLoadingBar).to.eq(false);
    });
});
