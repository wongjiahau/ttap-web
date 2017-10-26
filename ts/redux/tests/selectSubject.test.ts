import {expect} from "chai";
import {isEqual} from "lodash";
import {GetTestSubjects1} from "../../tests/testDataGenerator";
import {SelectSubject} from "./../actions/selectSubject";
import {ISubjectListViewState, SubjectListViewReducer, SubjectListViewState} from "./../reducers/subjectListViewState";

describe("selectSubject action", () => {

    it("'s type name should be 'select subject'", () => {
        const action = new SelectSubject("");

    });

    it("should toggle selection on a subject based on its subject code", () => {
        const initialState = new SubjectListViewState(GetTestSubjects1());
        const newState = SubjectListViewReducer(initialState, new SelectSubject("MPU3113").Action());
        expect(newState.Subjects.filter((s) => s.Code === "MPU3113")[0].IsSelected)
            .to
            .eq(true);
    });

    it("should toggle selection on subject from true to false also", () => {
        const initialState = new SubjectListViewState(GetTestSubjects1());
        let newState = SubjectListViewReducer(initialState, new SelectSubject("MPU3113").Action());
        newState = SubjectListViewReducer(newState, new SelectSubject("MPU3113").Action());
        expect(newState.Subjects.filter((s) => s.Code === "MPU3113")[0].IsSelected)
            .to
            .eq(false);
    });

});
