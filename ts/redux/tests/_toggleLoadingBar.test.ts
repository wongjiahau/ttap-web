import {expect} from "chai";
import {isEqual} from "lodash";
import {ToggleLoadingBar} from "./../actions/toggleLoadingBar";
import {ISubjectListState, SubjectListState, SubjectListStateReducer} from "./../reducers/subjectListState";
describe("ToggleLoadingBar action", () => {
    it("'s typename should be 'toggle loading bar'", () => {
        const action = new ToggleLoadingBar(false);
        expect(action.TypeName()).to.eq("toggle loading bar");
    });

    it("should set IsShowingLoadingBar property to true if passed in true", () => {
        const action = new ToggleLoadingBar(true).Action();
        const initialState = new SubjectListState(null);
        expect(initialState.IsShowingLoadingBar).to.eq(false);
        const newState = SubjectListStateReducer(initialState, action);
        expect(newState.IsShowingLoadingBar).to.eq(true);
    });

    it("should set IsShowingLoadingBar property to false if passed in false", () => {
        const initialState = new SubjectListState(null);
        let newState = SubjectListStateReducer(initialState, new ToggleLoadingBar(true).Action());
        expect(newState.IsShowingLoadingBar).to.eq(true);
        newState = SubjectListStateReducer(initialState, new ToggleLoadingBar(false).Action());
        expect(newState.IsShowingLoadingBar).to.eq(false);
    });
});
