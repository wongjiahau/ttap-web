import {expect} from "chai";
import {isEqual} from "lodash";
import {GetTestSubjects1} from "../../tests/testDataGenerator";
import {SelectSubject} from "./../actions/selectSubject";
import {ToggleSubjectListViewingOptions} from "./../actions/toggleSubjectListViewingOption";
import {ISubjectListState, SubjectListReducer, SubjectListState} from "./../reducers/subjectListState";

describe("ToggleSubjectListViewingOption", () => {

    it("the initial value of IsShowingSelectedSubject should be false", () => {
        const initialState = new SubjectListState();
        expect(initialState.IsShowingSelectedSubjectOnly).to.eq(false);
    });

    it("should toggle property IsShowingSelectedSubjectOnly from false to true", () => {
        const initialState = new SubjectListState();
        const newState = SubjectListReducer(initialState, new ToggleSubjectListViewingOptions().Action());
        expect(newState.IsShowingSelectedSubjectOnly)
            .to
            .eq(true);
    });

    it("should toggle property IsShowingSelectedSubjectOnly from true to false", () => {
        const initialState = new SubjectListState();
        const newState1 = SubjectListReducer(initialState, new ToggleSubjectListViewingOptions().Action());
        const newState2 = SubjectListReducer(initialState, new ToggleSubjectListViewingOptions().Action());
        expect(newState2.IsShowingSelectedSubjectOnly)
            .to
            .eq(true);
    });

    it("should make selected subject visible and deselected subject invisible when first toggled", () => {
        const initialState = new SubjectListState(GetTestSubjects1());
        let newState = SubjectListReducer(initialState, new SelectSubject("MPU3113").Action());
        newState = SubjectListReducer(newState, new ToggleSubjectListViewingOptions().Action());
        expect(newState.Subjects.filter((s) => s.IsVisible)).to.have.lengthOf(1);
    });

    it("should make all subjects visible when toggled again", () => {
        const initialState = new SubjectListState(GetTestSubjects1());
        let newState = SubjectListReducer(initialState, new SelectSubject("MPU3113").Action());
        newState = SubjectListReducer(newState, new ToggleSubjectListViewingOptions().Action());
        newState = SubjectListReducer(newState, new ToggleSubjectListViewingOptions().Action());
        expect(newState.Subjects.filter((s) => s.IsVisible)).to.have.lengthOf(newState.Subjects.length);
    });

});
