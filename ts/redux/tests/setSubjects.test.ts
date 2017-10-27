import {expect} from "chai";
import {SetSubjects} from "./../actions/setSubjects";
import {SubjectListReducer, SubjectListState} from "./../reducers/subjectListState";

describe("setSubjects action", () => {
    it("'s type name should be set subjects", () => {
        const action = new SetSubjects(null);
        expect(action.TypeName())
            .to
            .eq("set subjects");
    });

    it("should set the subjects of ISubjectListState", () => {
        const initialState = new SubjectListState();
        const newState = SubjectListReducer(initialState, new SetSubjects([null, null]).Action());
        expect(newState.Subjects.length).to.eq(2);
    });

});
