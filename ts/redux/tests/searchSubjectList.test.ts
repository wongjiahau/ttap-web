import {expect} from "chai";
import {isEqual} from "lodash";
import {GetTestSubjects1} from "../../tests/testDataGenerator";
import {SearchSubjectList} from "./../actions/searchSubjectList";
import {ISubjectListState, SubjectListReducer, SubjectListState} from "./../reducers/subjectListState";
describe("searchSubjectList action", () => {
    it("should render all subject to be visible if searched text is empty", () => {
        const initialState = new SubjectListState(GetTestSubjects1());
        const newState = SubjectListReducer(initialState, new SearchSubjectList("").Action());
        expect(newState.Subjects.every((s) => s.IsVisible))
            .to
            .eq(true);
    });

    it("should make some subject invisible based on if the searched text match only some subejcts", () => {
        const initialState = new SubjectListState(GetTestSubjects1());
        const newState = SubjectListReducer(initialState, new SearchSubjectList("hubungan etnik").Action());
        expect(newState.Subjects.filter((s) => s.IsVisible).length)
            .to
            .eq(1);
    });

    it("should toggle IsShowSelectedSubjectsOnly to false when dispatched", () => {
        const initialState = new SubjectListState(GetTestSubjects1());
        initialState.IsShowingSelectedSubjectOnly = true;
        const newState = SubjectListReducer(initialState, new SearchSubjectList("lol random stuff").Action());
        expect(newState.IsShowingSelectedSubjectOnly)
            .to
            .eq(false);
    });

    it("should make all subject visible when the searched string is empty again", () => {
        const initialState = new SubjectListState(GetTestSubjects1());
        let newState = SubjectListReducer(initialState, new SearchSubjectList("hubungan etnik").Action());
        newState = SubjectListReducer(newState, new SearchSubjectList("").Action());
        expect(newState.Subjects.filter((s) => s.IsVisible).length)
            .to
            .eq(newState.Subjects.length);
    });

    it("should set the SearchedText based on input", () => {
        const initialState = new SubjectListState(GetTestSubjects1());
        const newState = SubjectListReducer(initialState, new SearchSubjectList("spongebob").Action());
        expect(newState.SearchedText).to.eq("spongebob");
    });

    it("should allow user to search using subjects initial", () => {
        const initialState = new SubjectListState(GetTestSubjects1());
        const searchText = "acp"; // acp stands for Arts & Cultural Performance
        const newState = SubjectListReducer(initialState, new SearchSubjectList(searchText).Action());
        expect(newState.Subjects.filter((s) => s.IsVisible).length)
            .to
            .eq(1);
    });

});
