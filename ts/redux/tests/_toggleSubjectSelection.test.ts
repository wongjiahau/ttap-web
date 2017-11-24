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
    ToggleSubjectListViewingOptions
} from "./../actions/toggleSubjectListViewingOption";
import {
    CheckForClashesBetween,
    FindTimetableBasedOn,
    ToggleSubjectSelection
} from "./../actions/toggleSubjectSelection";
import {
    ISubjectListState,
    SubjectListState,
    SubjectListStateReducer
} from "./../reducers/subjectListState";

describe("toggle subject selection action", () => {

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
        expect(newState.IsShowingSelectedSubjectOnly).to.eq(true);
        newState = SubjectListStateReducer(newState, new ToggleSubjectSelection("MPU3113").Action());
        expect(newState.IsShowingSelectedSubjectOnly).to.eq(false);
        expect(newState.Subjects.every((x) => x.IsVisible)).to.eq(true);
    });

    it("should set the property of timetable when selecting subject", () => {
        const initialState = new SubjectListState(GetTestSubjects1());
        const newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection("MPU3113").Action());
        expect(newState.TimetableListState.FiltrateTimetables).to.have.lengthOf(3);

    });

    describe("behaviour of subject selection", () => {
        it("case 1", () => {
            const behaviour = `
            Given Ali just loaded slots data (by logging in)
            When Ali selected subject 'MPU34022' [ACP]
            And Then Ali selected subject 'MPU32013' [BKA]
            Then Ali shall see a clash report saying 'MPU32013' cannot be selected
            And the clash report should be Single-Clashing error, not Group-Clashing error
        `;
            const subjects = GetTestSubjects1();
            const initialState = new SubjectListState(GetTestSubjects1());
            let newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection("MPU34022").Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection("MPU32013").Action());
            const clashReport = newState.Subjects.filter((x) => x.Code === "MPU32013")[0].ClashReport;
            expect(clashReport.Type).to.eq("single");
            expect(clashReport.TargetName).to.eq("Arts & Cultural Performance");
        });

        it("case 2", () => {
            const behaviour = `
            Given Ali just loaded slots data (by logging in)
            When Ali selected subject 'MPU34022' [ACP]
            And Then Ali selected subject 'MPU3143' [BMK2]
            And Then Ali selected subject 'UKMM1043' [BEAM]
            Then Ali shall see a clash report on [BEAM] saying that
                it cannot be selected due to Group Clashing
        `;
            const subjects = GetTestSubjects1();
            const initialState = new SubjectListState(GetTestSubjects1());
            let newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection("MPU34022").Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection("MPU3143").Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection("UKMM1043").Action());
            expect(newState.Subjects.filter((x) => x.Code === "UKMM1043")[0].ClashReport.Type)
                .to.eq("group");
        });
    });

    describe("behaviour of subject deselection", () => {
        it("case 1", () => {
            const behaviour = `
            Given Ali just loaded slots data (by logging in)
            When Ali selected subject 'MPU34022' [ACP]
            And Then Ali selected subject 'MPU32013' [BKA]
            And Then When Ali deselected subject 'MPU34022' [ACP]
            Then Ali shall see that the clash report on [BKA] is cleared
        `;
            const subjects = GetTestSubjects1();
            const initialState = new SubjectListState(GetTestSubjects1());
            let newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection("MPU34022").Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection("MPU32013").Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection("MPU34022").Action());
            expect(newState.Subjects.filter((x) => x.Code === "MPU32013")[0].ClashReport).to.eq(null);
        });

        it("case 2", () => {
            const behaviour = `
            Given Ali just loaded slots data (by logging in)
            When Ali selected subject 'MPU34022' [ACP]
            And Then Ali selected subject 'MPU3143' [BMK2]
            And Then Ali selected subject 'UKMM1043' [BEAM]
            And Then When Ali deselected subject [ACP] or [BMK2]
            Then Ali shall see that the clash report on [BEAM] is cleared
        `;
            const subjects = GetTestSubjects1();
            const initialState = new SubjectListState(GetTestSubjects1());
            let newState = SubjectListStateReducer(initialState, new ToggleSubjectSelection("MPU34022").Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection("MPU3143").Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection("UKMM1043").Action());
            newState = SubjectListStateReducer(newState, new ToggleSubjectSelection("MPU3143").Action());
            expect(newState.Subjects.filter((x) => x.Code === "UKMM1043")[0].ClashReport).to.eq(null);
        });
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
        expect(result.Type).to.eq("single");
        expect(result.TargetName).to.eq("Water & Wastewater Treatment");
    });

});
