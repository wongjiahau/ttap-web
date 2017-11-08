import {expect} from "chai";
import {isEqual} from "lodash";
import {GetTestSubjects1} from "../../tests/testDataGenerator";
import {SelectSubject} from "./../actions/selectSubject";
import { ToggleSubjectListViewingOptions } from "./../actions/toggleSubjectListViewingOption";
import {ISubjectListState, SubjectListState, SubjectListStateReducer} from "./../reducers/subjectListState";

describe("selectSubject action", () => {

    it("'s type name should be 'select subject'", () => {
        const action = new SelectSubject("");
        expect(action.TypeName()).to.eq("select subject");

    });

    it("should toggle selection on a subject based on its subject code", () => {
        const initialState = new SubjectListState(GetTestSubjects1());
        const newState = SubjectListStateReducer(initialState, new SelectSubject("MPU3113").Action());
        expect(newState.Subjects.filter((s) => s.Code === "MPU3113")[0].IsSelected)
            .to
            .eq(true);
    });

    it("should toggle selection on subject from true to false also", () => {
        const initialState = new SubjectListState(GetTestSubjects1());
        let newState = SubjectListStateReducer(initialState, new SelectSubject("MPU3113").Action());
        newState = SubjectListStateReducer(newState, new SelectSubject("MPU3113").Action());
        expect(newState.Subjects.filter((s) => s.Code === "MPU3113")[0].IsSelected)
            .to
            .eq(false);
    });

    it("should show all subjects when user deselected all subjects", () => {
        const initialState = new SubjectListState(GetTestSubjects1());
        let newState = SubjectListStateReducer(initialState, new SelectSubject("MPU3113").Action());
        newState = SubjectListStateReducer(newState, new ToggleSubjectListViewingOptions().Action());
        expect(newState.IsShowingSelectedSubjectOnly).to.eq(true);
        newState = SubjectListStateReducer(newState,  new SelectSubject("MPU3113").Action());
        expect(newState.IsShowingSelectedSubjectOnly).to.eq(false);
        expect(newState.Subjects.every((x) => x.IsVisible)).to.eq(true);
    });

});
