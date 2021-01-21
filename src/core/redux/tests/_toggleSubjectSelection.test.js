"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const isEqual = require("lodash.isequal");
const findClashes_1 = require("../../clashFinder/findClashes");
const objectStore_1 = require("../../dataStructure/objectStore");
const parseRawSlotToSubject_1 = require("../../parser/parseRawSlotToSubject");
const heng_2017_sept_1 = require("../../tests/testData/heng_2017_sept");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const toggleIsEnabledOfAlgorithmVisualizer_1 = require("../actions/toggleIsEnabledOfAlgorithmVisualizer");
const toggleSubjectListViewingOption_1 = require("./../actions/toggleSubjectListViewingOption");
const toggleSubjectSelection_1 = require("./../actions/toggleSubjectSelection");
const masterState_1 = require("./../reducers/masterState");
const testSlots = testDataGenerator_1.GetTestRawSlot1();
const mockSubjects = parseRawSlotToSubject_1.ParseRawSlotToSubject(testSlots);
findClashes_1.FindClashes(mockSubjects, new objectStore_1.ObjectStore(testSlots)); // some test will fail if this line is not run
describe("toggle subject selection action", () => {
    it("'s type name should be 'select subject'", () => {
        const action = new toggleSubjectSelection_1.ToggleSubjectSelection(0);
        chai_1.expect(action.TypeName())
            .to
            .eq("toggle subject selection");
    });
    it("should toggle selection on a subject based on its subject index", () => {
        const initialState = testDataGenerator_1.GetMockInitialState();
        const newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.HE));
        chai_1.expect(newState.SubjectListState.Subjects[heng_2017_sept_1.IndexOf.HE].IsSelected).to.eq(true);
    });
    it("should toggle selection on subject from true to false also", () => {
        const initialState = testDataGenerator_1.GetMockInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.HE));
        newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.HE));
        chai_1.expect(newState.SubjectListState.Subjects[heng_2017_sept_1.IndexOf.HE].IsSelected).to.eq(false);
    });
    it("should show all subjects when user deselected all subjects", () => {
        const initialState = testDataGenerator_1.GetMockInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.HE));
        newState = masterState_1.MasterStateReducer(newState, new toggleSubjectListViewingOption_1.ToggleSubjectListViewingOptions());
        chai_1.expect(newState.SubjectListState.IsShowingSelectedSubjectOnly).to.eq(true);
        newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.HE));
        chai_1.expect(newState.SubjectListState.IsShowingSelectedSubjectOnly).to.eq(false);
        chai_1.expect(newState.SubjectListState.Subjects.every((x) => x.IsVisible)).to.eq(true);
    });
    it("should set the property of timetable when selecting subject", () => {
        const initialState = testDataGenerator_1.GetMockInitialState();
        const newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.HE));
        chai_1.expect(newState.TimetableListState.FiltrateTimetables).to.have.lengthOf(3);
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
            const initialState = testDataGenerator_1.GetMockInitialState();
            let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.ACP));
            newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.BKA));
            const clashReport = newState.SubjectListState.Subjects[heng_2017_sept_1.IndexOf.BKA].ClashReport;
            if (!clashReport) {
                throw new Error();
            }
            chai_1.expect(clashReport.Type).to.eq("single");
            chai_1.expect(clashReport.TargetName).to.eq("Arts & Cultural Performance");
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
            const initialState = testDataGenerator_1.GetMockInitialState();
            let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.ACP));
            newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.BMK2));
            newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.BEAM));
            const clashReport = newState.SubjectListState.Subjects[heng_2017_sept_1.IndexOf.BEAM].ClashReport;
            if (!clashReport) {
                throw new Error();
            }
            chai_1.expect(clashReport.Type)
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
            const initialState = testDataGenerator_1.GetMockInitialState();
            let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.ACP));
            newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.BKA));
            newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.ACP));
            chai_1.expect(newState.SubjectListState.Subjects[heng_2017_sept_1.IndexOf.BKA].ClashReport).to.eq(null);
        });
        it("case 2", () => {
            const behaviour = `
            Given Ali just loaded slots data (by logging in)
            When Ali selected subject 'MPU34022' [ACP]
            And Then Ali selected subject 'MPU32013' [BKA] (which is clashgin with ACP)
            And Then Ali selected subject 'MPU3143' [BMK2] (which is clashing with BKA)
            And Then When Ali deselected subject 'MPU34022' [ACP]
            Then Ali shall see that the clash report's on [BKA] is updated to [BMK2] `;
            const initialState = testDataGenerator_1.GetMockInitialState();
            let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.ACP));
            newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.BKA));
            newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.BMK2));
            newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.ACP));
            const clashReport = newState.SubjectListState.Subjects[heng_2017_sept_1.IndexOf.BKA].ClashReport;
            if (!clashReport) {
                throw new Error();
            }
            chai_1.expect(clashReport.TargetName)
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
            const initialState = testDataGenerator_1.GetMockInitialState();
            let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.ACP));
            newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.BMK2));
            newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.BEAM));
            newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.BMK2));
            chai_1.expect(newState.SubjectListState.Subjects[heng_2017_sept_1.IndexOf.BEAM].ClashReport).to.eq(null);
        });
        it("case 4", () => {
            const behaviour = `
            Given Ali just loaded slots data (by logging in)
            When Ali selected [ACP]
            And Then Ali selected [BMK2]
            And Then Ali selected [BEAM]
            And Then When Ali deselected [BMK2]
            Then Ali shall that the clash report on [BEAM] is gone`;
            const initialState = testDataGenerator_1.GetMockInitialState();
            let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.ACP));
            newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.BMK2));
            newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.BEAM));
            newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.BMK2));
            chai_1.expect(newState.SubjectListState.Subjects[heng_2017_sept_1.IndexOf.BEAM].ClashReport).to.eq(null);
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
            const initialState = testDataGenerator_1.GetMockInitialState();
            let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.ACP));
            newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.BMK2));
            newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.BEAM));
            newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.HE));
            newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.HE));
            const clashReport = newState.SubjectListState.Subjects[heng_2017_sept_1.IndexOf.BEAM].ClashReport;
            if (!clashReport)
                throw new Error();
            chai_1.expect(clashReport.Type).to.eq("group");
        });
        it("should set statistics of algorithmVisualizerState if algorithm visualizer is enabled", () => {
            const initialState = testDataGenerator_1.GetMockInitialState();
            chai_1.expect(initialState.AlgorithmVisualizerState.searchedPathCount).to.eq(0);
            let newState = masterState_1.MasterStateReducer(initialState, new toggleIsEnabledOfAlgorithmVisualizer_1.ToggleIsEnabledOfAlgorithmVisualizer(true));
            newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_sept_1.IndexOf.ACP));
            chai_1.expect(newState.AlgorithmVisualizerState.searchedPathCount).to.eq(2);
            chai_1.expect(newState.AlgorithmVisualizerState.fullSearchPathCount).to.eq(2);
            chai_1.expect(newState.AlgorithmVisualizerState.searchedPathCount).to.eq(2);
            chai_1.expect(newState.AlgorithmVisualizerState.timeTaken >= 0).to.eq(true);
        });
    });
});
describe("GetSelectedSlots", () => {
    it("should return a list of slots", () => {
        const subjects = mockSubjects;
        const titas = subjects[heng_2017_sept_1.IndexOf.TITA];
        const wwt = subjects[heng_2017_sept_1.IndexOf.WWT];
        const slots = toggleSubjectSelection_1.GetSelectedSlots([wwt, titas]);
        chai_1.expect(slots).to.have.lengthOf(14);
    });
});
describe("CheckForClashesBetween", () => {
    it("case 1", () => {
        const subjects = mockSubjects;
        const titas = subjects[heng_2017_sept_1.IndexOf.TITA];
        const wwt = subjects[heng_2017_sept_1.IndexOf.WWT];
        const bmk2 = subjects[heng_2017_sept_1.IndexOf.BMK2];
        wwt.ClashingCounterparts.push(titas.Code);
        const result = toggleSubjectSelection_1.CheckForClashesBetween(titas, [bmk2, wwt]);
        if (!result)
            throw new Error();
        chai_1.expect(result.Type).to.eq("single");
        chai_1.expect(result.TargetName).to.eq("Water & Wastewater Treatment");
    });
});
//# sourceMappingURL=_toggleSubjectSelection.test.js.map