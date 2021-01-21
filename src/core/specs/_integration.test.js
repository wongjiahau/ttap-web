"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const timePeriod_1 = require("../att/timePeriod");
const stcBox_1 = require("../model/matrix/stcBox");
const defilterTimetable_1 = require("../redux/actions/defilterTimetable");
const filterTimetable_1 = require("../redux/actions/filterTimetable");
const toggleSubjectSelection_1 = require("../redux/actions/toggleSubjectSelection");
const updateTotalMatrix_1 = require("../redux/actions/updateTotalMatrix");
const masterState_1 = require("../redux/reducers/masterState");
const heng_2017_apr_1 = require("../tests/testData/heng_2017_apr");
const testDataGenerator_1 = require("../tests/testDataGenerator");
describe("Integration test", () => {
    beforeEach(() => {
        timePeriod_1.TimePeriod.SetMinTo8am();
    });
    it("case 1", () => {
        const behaviour = `
        Step 0. Given Ali just loaded slots data (by logging in)
        Step 1. When user selected a subject A
        Step 2. And he set some time constraint
        Step 3. And he selected another subject B
        Step 4. And he set some time constraint
        Step 5. And he deset some time constraint that he clicked previously
        Step 6. Then he should see that the [X] he clicked should become a green box instead of a grey box
        `;
        // Step 0
        const initialState = testDataGenerator_1.GetMockInitialState("heng_2017_apr");
        // Step 1
        let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.CSD2));
        chai_1.expect(newState.TimetableListState.FiltrateTimetables).to.have.lengthOf(3);
        chai_1.expect(newState.TimetableListState.FiltrateTimetables.every((partition) => partition.ListOfSlotUids.length === 2)).to.eq(true);
        newState = masterState_1.MasterStateReducer(newState, new updateTotalMatrix_1.UpdateTotalMatrix());
        chai_1.expect(newState.SetTimeConstraintState.TotalMatrix.filter((x) => x.Kind === stcBox_1.BoxKind.MaybeOccupied)).to.have.lengthOf(6);
        // Step 2
        const stcBox1 = newState.SetTimeConstraintState.TotalMatrix.filter((x) => x.Uid === "32")[0]; // 3 means Thursday, 2 means 3rd box (3nd box means 9.00am->9.30am, since we set the min to be 8am)
        chai_1.expect(stcBox1.Kind).to.eq(stcBox_1.BoxKind.MaybeOccupied);
        newState = masterState_1.MasterStateReducer(newState, new filterTimetable_1.FilterTimetable(stcBox1));
        const stcBox2 = newState.SetTimeConstraintState.TotalMatrix.filter((x) => x.Uid === "34")[0]; // 3 means Thursday, 4 means 5th box (5th box means 10.30am->10.30am, since we set the min to be 8am)
        chai_1.expect(stcBox2.Kind).to.eq(stcBox_1.BoxKind.MaybeOccupied);
        newState = masterState_1.MasterStateReducer(newState, new filterTimetable_1.FilterTimetable(stcBox2));
        chai_1.expect(newState.SetTimeConstraintState.TotalMatrix.filter((x) => x.Kind === stcBox_1.BoxKind.MaybeOccupied)).to.have.lengthOf(0);
        // Step 3
        newState = masterState_1.MasterStateReducer(newState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.CT));
        chai_1.expect(newState.TimetableListState.FiltrateTimetables).to.have.lengthOf(4);
        chai_1.expect(newState.TimetableListState.FiltrateTimetables.map((x) => x.ListOfSlotUids.length)).to.deep.eq([8, 8, 4, 4]);
        newState = masterState_1.MasterStateReducer(newState, new updateTotalMatrix_1.UpdateTotalMatrix());
        chai_1.expect(newState.SetTimeConstraintState.TotalMatrix.filter((x) => x.Kind === stcBox_1.BoxKind.MaybeOccupied)).to.have.lengthOf(12);
        chai_1.expect(newState.SetTimeConstraintState.ClickedTimeConstraint).to.deep.eq([0, 0, 0, 0, 0, 0, 0]);
        // Step 4
        const stcBox3 = newState.SetTimeConstraintState.TotalMatrix.filter((x) => x.Uid === "32")[0];
        newState = masterState_1.MasterStateReducer(newState, new filterTimetable_1.FilterTimetable(stcBox3));
        chai_1.expect(newState.SetTimeConstraintState.TotalMatrix.filter((x) => x.Kind === stcBox_1.BoxKind.MaybeOccupied)).to.have.lengthOf(8);
        const stcBox4 = newState.SetTimeConstraintState.TotalMatrix.filter((x) => x.Uid === "32")[0];
        chai_1.expect(newState.SetTimeConstraintState.ClickedTimeConstraint).to.deep.eq([0, 0, 0, 4, 0, 0, 0]);
        chai_1.expect(stcBox4.Kind).to.eq(stcBox_1.BoxKind.Clicked);
        // Step 5
        newState = masterState_1.MasterStateReducer(newState, new defilterTimetable_1.DefilterTimetable(stcBox4));
        const stcBox5 = newState.SetTimeConstraintState.TotalMatrix.filter((x) => x.Uid === "32")[0];
        // Step 6
        chai_1.expect(stcBox5.Kind).to.eq(stcBox_1.BoxKind.MaybeOccupied);
    });
});
//# sourceMappingURL=_integration.test.js.map