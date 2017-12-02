import {
    expect
} from "chai";
import {
    isEqual
} from "lodash";
import {
    GetTestSubjects1
} from "../../tests/testDataGenerator";
import {
    NewSubjectListState
} from "../reducers/subjectListState";
import {
    IndexOf
} from "./../../tests/testDataGenerator";
import {
    ToggleSubjectListViewingOptions
} from "./../actions/toggleSubjectListViewingOption";
import {
    ToggleSubjectSelection
} from "./../actions/toggleSubjectSelection";
import {
    IMasterState,
    MasterStateReducer,
    NewMasterState
} from "./../reducers/masterState";

function getInitialState(): IMasterState {
    return {
        ...NewMasterState(),
        SubjectListState: NewSubjectListState(GetTestSubjects1())
    };
}

describe("ToggleSubjectListViewingOption", () => {

    it("the initial value of IsShowingSelectedSubject should be false", () => {
        const initialState = getInitialState();
        expect(initialState.SubjectListState.IsShowingSelectedSubjectOnly).to.eq(false);
    });

    it("should toggle property IsShowingSelectedSubjectOnly from false to true", () => {
        const initialState = getInitialState();
        const newState = MasterStateReducer(initialState, new ToggleSubjectListViewingOptions().Action());
        expect(newState.SubjectListState.IsShowingSelectedSubjectOnly)
            .to
            .eq(true);
    });

    it("should toggle property IsShowingSelectedSubjectOnly from true to false", () => {
        const initialState = getInitialState();
        const newState1 = MasterStateReducer(initialState, new ToggleSubjectListViewingOptions().Action());
        const newState2 = MasterStateReducer(initialState, new ToggleSubjectListViewingOptions().Action());
        expect(newState2.SubjectListState.IsShowingSelectedSubjectOnly)
            .to
            .eq(true);
    });

    it("should make selected subject visible and deselected subject invisible when first toggled", () => {
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE).Action());
        newState = MasterStateReducer(newState, new ToggleSubjectListViewingOptions().Action());
        expect(newState.SubjectListState.Subjects.filter((s) => s.IsVisible)).to.have.lengthOf(1);
    });

    it("should make all subjects visible when toggled again", () => {
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE).Action());
        newState = MasterStateReducer(newState, new ToggleSubjectListViewingOptions().Action());
        newState = MasterStateReducer(newState, new ToggleSubjectListViewingOptions().Action());
        expect(newState.SubjectListState.Subjects.filter((s) => s.IsVisible)).
        to.have.lengthOf(newState.SubjectListState.Subjects.length);
    });

});
