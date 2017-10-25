import {expect} from "chai";
import {isEqual} from "lodash";
import {ToggleSubjectListViewingOptions} from "./../actions/toggleSubjectListViewingOption";
import {ISubjectListViewState, SubjectListViewReducer, SubjectListViewState} from "./../reducers/subjectListViewState";

describe("ToggleSubjectListViewingOption", () => {
    it("should toggle property IsShowingSelectedSubjectOnly from false to true", () => {
        const initialState = new SubjectListViewState();
        const newState = SubjectListViewReducer(initialState, new ToggleSubjectListViewingOptions().Action());
        const expectedState : ISubjectListViewState = {
            ...initialState,
            IsShowingSelectedSubjectOnly: true
        };
        expect(isEqual(newState, expectedState))
            .to
            .eq(true);
    });

    it("should toggle property IsShowingSelectedSubjectOnly from true to false", () => {
        const initialState = new SubjectListViewState();
        const newState1 = SubjectListViewReducer(initialState, new ToggleSubjectListViewingOptions().Action());
        const newState2 = SubjectListViewReducer(initialState, new ToggleSubjectListViewingOptions().Action());
        const expectedState : ISubjectListViewState = {
            ...initialState,
            IsShowingSelectedSubjectOnly: false
        };
        expect(isEqual(newState1, expectedState))
            .to
            .eq(false);
    });
});
