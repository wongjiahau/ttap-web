import {expect} from "chai";
import {isEqual} from "lodash";
import {ToggleSubjectListViewingOptions} from "./../actions/toggleSubjectListViewingOption";
import {ISubjectListViewState, SubjectListViewReducer, SubjectListViewState} from "./../reducers/subjectListViewState";

describe("subjectListViewState reducer", () => {
    it("should handle ToggleSubjectListViewingOption", () => {
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
});
