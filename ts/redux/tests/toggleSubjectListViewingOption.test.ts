import {expect} from "chai";
import {isEqual} from "lodash";
import {GetTestSubjects1} from "../../tests/testDataGenerator";
import {SelectSubject} from "./../actions/selectSubject";
import {ToggleSubjectListViewingOptions} from "./../actions/toggleSubjectListViewingOption";
import {ISubjectListState, SubjectListViewReducer, SubjectListViewState} from "./../reducers/subjectListState";

describe("ToggleSubjectListViewingOption", () => {
    it("should toggle property IsShowingSelectedSubjectOnly from false to true", () => {
        const initialState = new SubjectListViewState();
        const newState = SubjectListViewReducer(initialState, new ToggleSubjectListViewingOptions().Action());
        const expectedState : ISubjectListState = {
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
        const expectedState : ISubjectListState = {
            ...initialState,
            IsShowingSelectedSubjectOnly: false
        };
        expect(isEqual(newState1, expectedState))
            .to
            .eq(false);
    });

    it("should make selected subject visible and deselected subject invisible when first toggled", () => {
        const initialState = new SubjectListViewState(GetTestSubjects1());
        let newState = SubjectListViewReducer(initialState, new SelectSubject("MPU3113").Action());
        newState = SubjectListViewReducer(newState, new ToggleSubjectListViewingOptions().Action());
        expect(newState.Subjects.filter((s) => s.IsVisible)).to.have.lengthOf(1);
    });

    it("should make all subjects visible when toggled again", () => {
        const initialState = new SubjectListViewState(GetTestSubjects1());
        let newState = SubjectListViewReducer(initialState, new SelectSubject("MPU3113").Action());
        newState = SubjectListViewReducer(newState, new ToggleSubjectListViewingOptions().Action());
        newState = SubjectListViewReducer(newState, new ToggleSubjectListViewingOptions().Action());
        expect(newState.Subjects.filter((s) => s.IsVisible)).to.have.lengthOf(newState.Subjects.length);
    });

});
