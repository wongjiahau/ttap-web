import {expect} from "chai";
import {isEqual} from "lodash";
import {GetTestSubjects1} from "../../tests/testDataGenerator";
import {SearchSubjectList} from "./../actions/searchSubjectList";
import {ISubjectListState, SubjectListViewReducer, SubjectListViewState} from "./../reducers/subjectListState";
describe("searchSubjectList action", () => {
    it("should render all subject to be visible if searched text is empty", () => {
        const initialState = new SubjectListViewState(GetTestSubjects1());
        const newState = SubjectListViewReducer(initialState, new SearchSubjectList("").Action());
        expect(newState.Subjects.every((s) => s.IsVisible))
            .to
            .eq(true);
    });

    it("should make some subject invisible based on if the searched text match only some subejcts", () => {
        const initialState = new SubjectListViewState(GetTestSubjects1());
        const newState = SubjectListViewReducer(initialState, new SearchSubjectList("hubungan etnik").Action());
        expect(newState.Subjects.filter((s) => s.IsVisible).length)
            .to
            .eq(1);
    });

    it("should toggle IsShowSelectedSubjectsOnly to false when dispatched", () => {
        const initialState = new SubjectListViewState(GetTestSubjects1());
        initialState.IsShowingSelectedSubjectOnly = true;
        const newState = SubjectListViewReducer(initialState, new SearchSubjectList("lol random stuff").Action());
        expect(newState.IsShowingSelectedSubjectOnly)
            .to
            .eq(false);
    });

    it("should make all subject visible when the searched string is empty again", () => {
        const initialState = new SubjectListViewState(GetTestSubjects1());
        let newState = SubjectListViewReducer(initialState, new SearchSubjectList("hubungan etnik").Action());
        newState = SubjectListViewReducer(newState, new SearchSubjectList("").Action());
        expect(newState.Subjects.filter((s) => s.IsVisible).length)
            .to
            .eq(newState.Subjects.length);
    });
});
