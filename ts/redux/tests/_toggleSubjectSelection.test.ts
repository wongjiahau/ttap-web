import { expect } from "chai";
const isEqual = require("lodash.isequal");
import { FindClashes } from "../../clashFinder/findClashes";
import { ObjectStore } from "../../dataStructure/objectStore";
import { ParseSlotToSubject } from "../../parser/parseSlotToSubject";
import { FindTimetableWithoutConsideringWeekNumber } from "../../permutator/findTimetable";
import { IndexOf } from "../../tests/testData/heng_2017_sept";
import { GetTestRawSlot1, GetTestSubjects1 } from "../../tests/testDataGenerator";
import { NotifyDataLoaded } from "../actions/notifyDataLoaded";
import { NewSubjectListState } from "../reducers/subjectListState";
import { ToggleSubjectListViewingOptions } from "./../actions/toggleSubjectListViewingOption";
import { CheckForClashesBetween, GetSelectedSlots, ToggleSubjectSelection } from "./../actions/toggleSubjectSelection";
import { IMasterState, MasterStateReducer, NewMasterState } from "./../reducers/masterState";

const testSlots = GetTestRawSlot1();
const mockSubjects = ParseSlotToSubject(testSlots);
FindClashes(mockSubjects, new ObjectStore(testSlots)); // some test will fail if this line is not run

function getInitialState(): IMasterState {
        const newState = MasterStateReducer(NewMasterState(),
            new NotifyDataLoaded(testSlots));
        return newState;
}
describe("toggle subject selection action", () => {

    it("'s type name should be 'select subject'", () => {
        const action = new ToggleSubjectSelection(0);
        expect(action.TypeName())
            .to
            .eq("toggle subject selection");

    });

    it("should toggle selection on a subject based on its subject index", () => {
        const initialState = getInitialState();
        const newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        expect(newState.SubjectListState.Subjects[IndexOf.HE].IsSelected).to.eq(true);
    });

    it("should toggle selection on subject from true to false also", () => {
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.HE));
        expect(newState.SubjectListState.Subjects[IndexOf.HE].IsSelected).to.eq(false);
    });

    it("should show all subjects when user deselected all subjects", () => {
        const initialState = getInitialState();
        let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
        newState = MasterStateReducer(newState, new ToggleSubjectListViewingOptions());
        expect(newState.SubjectListState.IsShowingSelectedSubjectOnly).to.eq(true);
        newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.HE));
        expect(newState.SubjectListState.IsShowingSelectedSubjectOnly).to.eq(false);
        expect(newState.SubjectListState.Subjects.every((x) => x.IsVisible)).to.eq(true);
    });

    it("should set the property of timetable when selecting subject", () => {
        const initialState = getInitialState();
        const newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.HE));
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
            const initialState = getInitialState();
            let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.ACP));
            newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.BKA));
            const clashReport = newState.SubjectListState.Subjects[IndexOf.BKA].ClashReport;
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
            const initialState = getInitialState();
            let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.ACP));
            newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.BMK2));
            newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.BEAM));
            expect(newState.SubjectListState.Subjects[IndexOf.BEAM].ClashReport.Type)
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
            Then Ali shall see that the clash report on [BKA] is cleared `;
            const initialState = getInitialState();
            let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.ACP));
            newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.BKA));
            newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.ACP));
            expect(newState.SubjectListState.Subjects[IndexOf.BKA].ClashReport).to.eq(null);
        });

        it("case 2", () => {
            const behaviour = `
            Given Ali just loaded slots data (by logging in)
            When Ali selected subject 'MPU34022' [ACP]
            And Then Ali selected subject 'MPU32013' [BKA] (which is clashgin with ACP)
            And Then Ali selected subject 'MPU3143' [BMK2] (which is clashing with BKA)
            And Then When Ali deselected subject 'MPU34022' [ACP]
            Then Ali shall see that the clash report's on [BKA] is updated to [BMK2] `;
            const initialState = getInitialState();
            let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.ACP));
            newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.BKA));
            newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.BMK2));
            newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.ACP));
            expect(newState.SubjectListState.Subjects[IndexOf.BKA].ClashReport.TargetName)
                .to.eq("Bahasa Melayu Komunikasi 2");
        });

        it("case 3", () => {
            const behaviour = `
            Given Ali just loaded slots data (by logging in)
            When Ali selected subject 'MPU34022' [ACP]
            And Then Ali selected subject 'MPU3143' [BMK2]
            And Then Ali selected subject 'UKMM1043' [BEAM]
            And Then When Ali deselected subject [ACP] or [BMK2]
            Then Ali shall see that the clash report on [BEAM] is cleared `;
            const initialState = getInitialState();
            let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.ACP));
            newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.BMK2));
            newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.BEAM));
            newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.BMK2));
            expect(newState.SubjectListState.Subjects[IndexOf.BEAM].ClashReport).to.eq(null);
        });

        it("case 4", () => {
            const behaviour = `
            Given Ali just loaded slots data (by logging in)
            When Ali selected [ACP]
            And Then Ali selected [BMK2]
            And Then Ali selected [BEAM]
            And Then When Ali deselected [BMK2]
            Then Ali shall that the clash report on [BEAM] is gone`;

            const initialState = getInitialState();
            let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.ACP));
            newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.BMK2));
            newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.BEAM));
            newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.BMK2));
            expect(newState.SubjectListState.Subjects[IndexOf.BEAM].ClashReport).to.eq(null);
        });

        it("case 5", () => {
            const behaviour = `
            Given Ali just loaded slots data (by logging in)
            When Ali selected [ACP]
            And Then Ali selected [BMK2]
            And Then Ali selected [BEAM].
            By this time Ali shall see that [BEAM] have a group clash report on it.
            And Then Ali selected [HE]
            And Then When Ali deselected [HE]
            Then Ali shall that the clash report on [BEAM] is still there`;

            const initialState = getInitialState();
            let newState = MasterStateReducer(initialState, new ToggleSubjectSelection(IndexOf.ACP));
            newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.BMK2));
            newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.BEAM));
            newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.HE));
            newState = MasterStateReducer(newState, new ToggleSubjectSelection(IndexOf.HE));
            expect(newState.SubjectListState.Subjects[IndexOf.BEAM].ClashReport.Type).to.eq("group");
        });
    });

});

describe("GetSelectedSlots", () => {
    it("should return a list of slots", () => {
        const subjects = mockSubjects;
        const titas = subjects[IndexOf.TITA];
        const wwt = subjects[IndexOf.WWT];
        const slots = GetSelectedSlots([wwt, titas]);
        expect(slots).to.have.lengthOf(14);
    });

});

describe("CheckForClashesBetween", () => {
    it("case 1", () => {
        const subjects = mockSubjects;
        const titas = subjects[IndexOf.TITA];
        const wwt = subjects[IndexOf.WWT];
        const bmk2 = subjects[IndexOf.BMK2];
        wwt.ClashingCounterparts.push(titas.Code);
        const result = CheckForClashesBetween(titas, [bmk2, wwt]);
        expect(result.Type).to.eq("single");
        expect(result.TargetName).to.eq("Water & Wastewater Treatment");
    });

});
