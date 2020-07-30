"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const filterTimetable_1 = require("../actions/filterTimetable");
const findAlternativeSlotsOfCurrentSlots_1 = require("../actions/findAlternativeSlotsOfCurrentSlots");
const goToNextTimetable_1 = require("../actions/goToNextTimetable");
const goToPrevTimetable_1 = require("../actions/goToPrevTimetable");
const goToRandomTimetable_1 = require("../actions/goToRandomTimetable");
const showAlternateSlot_1 = require("../actions/showAlternateSlot");
const masterState_1 = require("../reducers/masterState");
const stcBox_1 = require("./../../model/matrix/stcBox");
const heng_2017_apr_1 = require("./../../tests/testData/heng_2017_apr");
const toggleSubjectSelection_1 = require("./../actions/toggleSubjectSelection");
describe("showAlternateSlot action", () => {
    it("should set alternate slots based on clicked slot", () => {
        const initialState = testDataGenerator_1.GetMockInitialState("heng_2017_apr");
        const newState0 = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.FM2));
        const newState1 = masterState_1.MasterStateReducer(newState0, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.FM1));
        let newState2 = masterState_1.MasterStateReducer(newState1, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.ASSD));
        newState2 = masterState_1.MasterStateReducer(newState2, new findAlternativeSlotsOfCurrentSlots_1.FindAlternativeSlotsOfCurrentSlots());
        const slotsToBeClicked = newState2.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) => x.Type === "T" &&
            x.SubjectCode === "UEME2123" &&
            x.Group[0] === "3")[0]; // Fluid Mechanic I, Tutorial 3
        const newState3 = masterState_1.MasterStateReducer(newState2, new showAlternateSlot_1.ShowAlternateSlot(slotsToBeClicked));
        if (!newState3.TimetableListState.ShowingAlternateSlotOf) {
            throw new Error();
        }
        chai_1.expect(newState3.TimetableListState.ShowingAlternateSlotOf.Uid).to.deep.eq(slotsToBeClicked.Uid);
        chai_1.expect(newState3.TimetableListState.AlternativeSlots).to.have.lengthOf(6);
        chai_1.expect(newState3.TimetableListState.AlternativeSlots.map((x) => x.Group))
            .to.deep.eq([
            ["9"],
            ["11"],
            ["13"],
            ["15"],
            ["17"],
            ["19"],
        ]);
        // "5/6" is not here, as it will clash with the current time table
        // so it should not be shown as alternate slots
        chai_1.expect(newState3.TimetableListState.AlternativeSlots.every((x) => x.IsAlternativeSlot));
        // snackbar should also be shown
        chai_1.expect(newState3.SnackbarState.IsOpen).to.eq(true);
        // Going to other timetabes will reset the alternate slots
        const newState4 = masterState_1.MasterStateReducer(newState3, new goToNextTimetable_1.GoToNextTimetable());
        chai_1.expect(newState4.TimetableListState.AlternativeSlots).to.deep.eq([]);
        const newState5 = masterState_1.MasterStateReducer(newState3, new goToPrevTimetable_1.GoToPrevTimetable());
        chai_1.expect(newState5.TimetableListState.AlternativeSlots).to.deep.eq([]);
        const newState6 = masterState_1.MasterStateReducer(newState3, new goToRandomTimetable_1.GoToRandomTimetable());
        chai_1.expect(newState6.TimetableListState.AlternativeSlots).to.deep.eq([]);
        // Clicking again will hide the alternate slots
        const newState7 = masterState_1.MasterStateReducer(newState3, new showAlternateSlot_1.ShowAlternateSlot(slotsToBeClicked));
        chai_1.expect(newState7.TimetableListState.AlternativeSlots).to.have.lengthOf(0);
        // also hiding snackbar
        chai_1.expect(newState7.SnackbarState.IsOpen).to.eq(false);
        // case 2
        const slotsToBeClicked2 = newState2.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) => x.Type === "T" &&
            x.SubjectCode === "UEMX4313" &&
            x.Group[0] === "1")[0]; // ASSD, Tutorial 1
        const newState8 = masterState_1.MasterStateReducer(newState3, new showAlternateSlot_1.ShowAlternateSlot(slotsToBeClicked2));
        chai_1.expect(newState8.TimetableListState.AlternativeSlots).to.have.lengthOf(1);
    });
    it("should not show alternate slots that is filtered out by set time constraint", () => {
        const initialState = testDataGenerator_1.GetMockInitialState("heng_2017_apr");
        const newState0 = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.ASSD));
        const greenBoxToBeClicked = new stcBox_1.STCBox(stcBox_1.BoxKind.MaybeOccupied, 1, parseInt("10000", 2), 4); // Tuesday 10.30am to 11.00am
        let newState1 = masterState_1.MasterStateReducer(newState0, new filterTimetable_1.FilterTimetable(greenBoxToBeClicked));
        newState1 = masterState_1.MasterStateReducer(newState1, new findAlternativeSlotsOfCurrentSlots_1.FindAlternativeSlotsOfCurrentSlots());
        const slotsToBeClicked = newState1.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) => x.SubjectCode === "UEMX4313" &&
            x.Type === "T" &&
            x.Group[0] === "1")[0]; // ASSD I, Tutorial 1
        const newState2 = masterState_1.MasterStateReducer(newState1, new showAlternateSlot_1.ShowAlternateSlot(slotsToBeClicked));
        chai_1.expect(newState2.TimetableListState.AlternativeSlots).to.have.lengthOf(0);
    });
});
//# sourceMappingURL=_showAlternateSlot.test.js.map