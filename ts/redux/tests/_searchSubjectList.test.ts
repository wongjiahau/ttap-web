import {expect} from "chai";
import {isEqual} from "lodash";
import {GetTestSubjects1} from "../../tests/testDataGenerator";
import { NewSubjectListState } from "../reducers/subjectListState";
import {SearchSubjectList} from "./../actions/searchSubjectList";
import {IMasterState, MasterStateReducer, NewMasterState} from "./../reducers/masterState";

function getInitialState() : IMasterState {
    return {
        ...NewMasterState(),
        SubjectListState: NewSubjectListState(GetTestSubjects1())
    };
}

describe("searchSubjectList action", () => {
    it("should render all subject to be visible if searched text is empty", () => {
        const initialState = getInitialState();
        const newState = MasterStateReducer(initialState, new SearchSubjectList(""));
        expect(newState.SubjectListState.Subjects.every((s) => s.IsVisible))
            .to
            .eq(true);
    });

    it("should make some subject invisible based on if the searched text match only some subejcts", () => {
        const initialState = getInitialState();
        const newState = MasterStateReducer(initialState, new SearchSubjectList("hubungan etnik"));
        expect(newState.SubjectListState.Subjects.filter((s) => s.IsVisible).length)
            .to
            .eq(1);
    });

    it("should allow searching using uppercase letter", () => {
        const initialState = getInitialState();
        const newState = MasterStateReducer(initialState, new SearchSubjectList("Hubungan etnik"));
        expect(newState.SubjectListState.Subjects.filter((s) => s.IsVisible).length)
            .to
            .eq(1);
    });

    it("should toggle IsShowSelectedSubjectsOnly to false when dispatched", () => {
        const initialState = getInitialState();
        initialState.SubjectListState.IsShowingSelectedSubjectOnly = true;
        const newState = MasterStateReducer(initialState, new SearchSubjectList("lol random stuff"));
        expect(newState.SubjectListState.IsShowingSelectedSubjectOnly)
            .to
            .eq(false);
    });

    it("should make all subject visible when the searched string is empty again", () => {
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new SearchSubjectList("hubungan etnik"));
        newState = MasterStateReducer(newState, new SearchSubjectList(""));
        expect(newState.SubjectListState.Subjects.filter((s) => s.IsVisible).length)
            .to
            .eq(newState.SubjectListState.Subjects.length);
    });

    it("should set the SearchedText based on input", () => {
        const initialState = getInitialState();
        const newState = MasterStateReducer(initialState, new SearchSubjectList("spongebob"));
        expect(newState.SubjectListState.SearchedText).to.eq("spongebob");
    });

    it("should allow user to search using subjects initial", () => {
        const initialState = getInitialState();
        const searchText = "acp"; // acp stands for Arts & Cultural Performance
        const newState = MasterStateReducer(initialState, new SearchSubjectList(searchText));
        expect(newState.SubjectListState.Subjects.filter((s) => s.IsVisible).length)
            .to
            .eq(1);
    });

});
