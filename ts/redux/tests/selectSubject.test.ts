import {expect} from "chai";
import {isEqual} from "lodash";
import {GetTestSubjects1} from "../../tests/testDataGenerator";
import {SelectSubject} from "./../actions/selectSubject";
import {ISubjectListState, SubjectListReducer, SubjectListViewState} from "./../reducers/subjectListState";

describe("selectSubject action", () => {

    it("'s type name should be 'select subject'", () => {
        const action = new SelectSubject("");

    });

    it("should toggle selection on a subject based on its subject code", () => {
        const initialState = new SubjectListViewState(GetTestSubjects1());
        const newState = SubjectListReducer(initialState, new SelectSubject("MPU3113").Action());
        expect(newState.Subjects.filter((s) => s.Code === "MPU3113")[0].IsSelected)
            .to
            .eq(true);
    });

    it("should toggle selection on subject from true to false also", () => {
        const initialState = new SubjectListViewState(GetTestSubjects1());
        let newState = SubjectListReducer(initialState, new SelectSubject("MPU3113").Action());
        newState = SubjectListReducer(newState, new SelectSubject("MPU3113").Action());
        expect(newState.Subjects.filter((s) => s.Code === "MPU3113")[0].IsSelected)
            .to
            .eq(false);
    });

});
