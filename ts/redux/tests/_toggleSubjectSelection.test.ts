import {expect} from "chai";
import {isEqual} from "lodash";
import {GetTestSubjects1} from "../../tests/testDataGenerator";
import {ToggleSubjectListViewingOptions} from "./../actions/toggleSubjectListViewingOption";
import {CheckForClashesBetween, FindTimetableBasedOn, ToggleSubjectSelection} from "./../actions/toggleSubjectSelection";
import {ISubjectListState, SubjectListState, SubjectListStateReducer} from "./../reducers/subjectListState";

describe("selectSubject action", () => {

    it("'s type name should be 'select subject'", () => {
        const action = new ToggleSubjectSelection("");
        expect(action.TypeName())
            .to
            .eq("toggle subject selection");

    });

    it("should toggle selection on a subject based on its subject code", () => {
        const initialState = new SubjectListState(GetTestSubjects1());
        const newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection("MPU3113").Action());
        expect(newState.Subjects.filter((s) => s.Code === "MPU3113")[0].IsSelected)
            .to
            .eq(true);
    });

    it("should toggle selection on subject from true to false also", () => {
        const initialState = new SubjectListState(GetTestSubjects1());
        let newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection("MPU3113").Action());
        newState = SubjectListStateReducer(newState, new ToggleSubjectSelection("MPU3113").Action());
        expect(newState.Subjects.filter((s) => s.Code === "MPU3113")[0].IsSelected)
            .to
            .eq(false);
    });

    it("should show all subjects when user deselected all subjects", () => {
        const initialState = new SubjectListState(GetTestSubjects1());
        let newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection("MPU3113").Action());
        newState = SubjectListStateReducer(newState, new ToggleSubjectListViewingOptions().Action());
        expect(newState.IsShowingSelectedSubjectOnly)
            .to
            .eq(true);
        newState = SubjectListStateReducer(newState, new ToggleSubjectSelection("MPU3113").Action());
        expect(newState.IsShowingSelectedSubjectOnly)
            .to
            .eq(false);
        expect(newState.Subjects.every((x) => x.IsVisible))
            .to
            .eq(true);
    });

    it("case 1 about single clashing", () => {
        // Selecting a subject that causes clashes will cause the subject to display error messages
        const subjects = GetTestSubjects1();
        const initialState = new SubjectListState(GetTestSubjects1());
        let newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection("MPU34022").Action()); // acp
        newState = SubjectListStateReducer(newState, new ToggleSubjectSelection("MPU32013").Action()); // bka
        expect(newState.Subjects.filter((x) => x.Code === "MPU32013")[0].ClashReport.TargetName) // bka
            .to.eq("Arts & Cultural Performance");
    });

    it("case 2 about group clashing", () => {
        // Selecting a subject that causes clashes will cause the subject to display error messages
        const subjects = GetTestSubjects1();
        const initialState = new SubjectListState(GetTestSubjects1());
        let newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection("MPU34022").Action()); // acp
        newState = SubjectListStateReducer(newState, new ToggleSubjectSelection("MPU3143").Action()); // bmk2
        newState = SubjectListStateReducer(newState, new ToggleSubjectSelection("UKMM1043").Action()); // beam
        expect(newState.Subjects.filter((x) => x.Code === "UKMM1043")[0].ClashReport.ClashingType) // bka
            .to.eq("group");
    });

});

describe("FindTimetableBasedOn", () => {
    it("should return a list of timetables", () => {
        const subjects = GetTestSubjects1();
        const titas = subjects.filter((s) => s.Code === "MPU3123")[0];
        const wwt = subjects.filter((s) => s.Code === "UEMX3653")[0];
        const timetables = FindTimetableBasedOn([wwt, titas]);
        expect(timetables).to.have.lengthOf(5);
    });

});

describe("CheckForClashesBetween", () => {
    it("case 1", () => {
        const subjects = GetTestSubjects1();
        const titas = subjects.filter((s) => s.Code === "MPU3123")[0];
        const wwt = subjects.filter((s) => s.Code === "UEMX3653")[0];
        const bmk2 = subjects.filter((s) => s.Code === "MPU3143")[0];
        wwt.ClashingCounterparts.push("MPU3123");
        const result = CheckForClashesBetween(titas, [bmk2, wwt]);
        expect(result.ClashingType).to.eq("single");
        expect(result.TargetName).to.eq("Water & Wastewater Treatment");
    });

});
