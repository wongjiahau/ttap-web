"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const isEqual = require("lodash.isequal");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const subjectListState_1 = require("../reducers/subjectListState");
const searchSubjectList_1 = require("./../actions/searchSubjectList");
const masterState_1 = require("./../reducers/masterState");
function getInitialState() {
    return Object.assign({}, masterState_1.NewMasterState(), { SubjectListState: subjectListState_1.NewSubjectListState(testDataGenerator_1.GetTestSubjects1()) });
}
describe("searchSubjectList action", () => {
    it("should render all subject to be visible if searched text is empty", () => {
        const initialState = getInitialState();
        const newState = masterState_1.MasterStateReducer(initialState, new searchSubjectList_1.SearchSubjectList(""));
        chai_1.expect(newState.SubjectListState.Subjects.every((s) => s.IsVisible))
            .to
            .eq(true);
    });
    it("should make some subject invisible based on if the searched text match only some subejcts", () => {
        const initialState = getInitialState();
        const newState = masterState_1.MasterStateReducer(initialState, new searchSubjectList_1.SearchSubjectList("hubungan etnik"));
        chai_1.expect(newState.SubjectListState.Subjects.filter((s) => s.IsVisible).length)
            .to
            .eq(1);
    });
    it("should allow searching using uppercase letter", () => {
        const initialState = getInitialState();
        const newState = masterState_1.MasterStateReducer(initialState, new searchSubjectList_1.SearchSubjectList("Hubungan etnik"));
        chai_1.expect(newState.SubjectListState.Subjects.filter((s) => s.IsVisible).length)
            .to
            .eq(1);
    });
    it("should toggle IsShowSelectedSubjectsOnly to false when dispatched", () => {
        const initialState = getInitialState();
        initialState.SubjectListState.IsShowingSelectedSubjectOnly = true;
        const newState = masterState_1.MasterStateReducer(initialState, new searchSubjectList_1.SearchSubjectList("lol random stuff"));
        chai_1.expect(newState.SubjectListState.IsShowingSelectedSubjectOnly)
            .to
            .eq(false);
    });
    it("should make all subject visible when the searched string is empty again", () => {
        const initialState = getInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new searchSubjectList_1.SearchSubjectList("hubungan etnik"));
        newState = masterState_1.MasterStateReducer(newState, new searchSubjectList_1.SearchSubjectList(""));
        chai_1.expect(newState.SubjectListState.Subjects.filter((s) => s.IsVisible).length)
            .to
            .eq(newState.SubjectListState.Subjects.length);
    });
    it("should set the SearchedText based on input", () => {
        const initialState = getInitialState();
        const newState = masterState_1.MasterStateReducer(initialState, new searchSubjectList_1.SearchSubjectList("spongebob"));
        chai_1.expect(newState.SubjectListState.SearchedText).to.eq("spongebob");
    });
    it("should allow user to search using subjects initial", () => {
        const initialState = getInitialState();
        const searchText = "acp"; // acp stands for Arts & Cultural Performance
        const newState = masterState_1.MasterStateReducer(initialState, new searchSubjectList_1.SearchSubjectList(searchText));
        chai_1.expect(newState.SubjectListState.Subjects.filter((s) => s.IsVisible).length)
            .to
            .eq(1);
    });
});
//# sourceMappingURL=_searchSubjectList.test.js.map