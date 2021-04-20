"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const filterTimetable_1 = require("../actions/filterTimetable");
const findAlternativeSlotsOfCurrentSlots_1 = require("../actions/findAlternativeSlotsOfCurrentSlots");
const goToNextSubTimetable_1 = require("../actions/goToNextSubTimetable");
const goToNextTimetable_1 = require("../actions/goToNextTimetable");
const goToPreviousSubTimetable_1 = require("../actions/goToPreviousSubTimetable");
const goToPrevTimetable_1 = require("../actions/goToPrevTimetable");
const goToRandomTimetable_1 = require("../actions/goToRandomTimetable");
const showAlternateSlot_1 = require("../actions/showAlternateSlot");
const toggleSetTimeConstraintView_1 = require("../actions/toggleSetTimeConstraintView");
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
        const alternativeSlots3 = newState3.TimetableListState.ShowingAlternateSlotOf
            ? newState3.TimetableListState.ShowingAlternateSlotOf.AlternativeSlots
            : [];
        chai_1.expect(alternativeSlots3).to.have.lengthOf(13);
        chai_1.expect(alternativeSlots3.map((x) => x.slot.Group))
            .to.deep.eq([["4"],
            ["9"], ["10"],
            ["11"], ["12"],
            ["13"], ["14"],
            ["15"], ["16"],
            ["17"], ["18"],
            ["19"], ["20"]]);
        // "5/6" is not here, as it will clash with the current time table
        // so it should not be shown as alternate slots
        // snackbar should also be shown
        chai_1.expect(newState3.SnackbarState.IsOpen).to.eq(true);
        // Clicking again will hide the alternate slots
        const newState4 = masterState_1.MasterStateReducer(newState3, new showAlternateSlot_1.ShowAlternateSlot(slotsToBeClicked));
        const alternativeSlots4 = newState4.TimetableListState.ShowingAlternateSlotOf
            ? newState4.TimetableListState.ShowingAlternateSlotOf.AlternativeSlots
            : [];
        chai_1.expect(alternativeSlots4).to.have.lengthOf(0);
        // also hiding snackbar
        chai_1.expect(newState4.SnackbarState.IsOpen).to.eq(false);
        // case 2
        const slotsToBeClicked2 = newState2.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) => x.Type === "T" &&
            x.SubjectCode === "UEMX4313" &&
            x.Group[0] === "1")[0]; // ASSD, Tutorial 1
        const newState5 = masterState_1.MasterStateReducer(newState4, new showAlternateSlot_1.ShowAlternateSlot(slotsToBeClicked2));
        const alternativeSlots5 = newState5.TimetableListState.ShowingAlternateSlotOf
            ? newState5.TimetableListState.ShowingAlternateSlotOf.AlternativeSlots
            : [];
        chai_1.expect(alternativeSlots5).to.have.lengthOf(2);
    });
    it("should not show alternate slots that is filtered out by set time constraint", () => {
        // Expect without applying set-time-constraint filter, there are three alternative slots for ASSD-T1
        const initialState = testDataGenerator_1.GetMockInitialState("heng_2017_apr");
        const state0 = masterState_1.MasterStateReducers(initialState, [
            new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.ASSD),
            new findAlternativeSlotsOfCurrentSlots_1.FindAlternativeSlotsOfCurrentSlots(),
        ]);
        const slotsToBeClicked1 = state0.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) => x.SubjectCode === "UEMX4313" &&
            x.Type === "T" &&
            x.Group[0] === "1")[0]; // ASSD I, Tutorial 1
        const state1 = masterState_1.MasterStateReducer(state0, new showAlternateSlot_1.ShowAlternateSlot(slotsToBeClicked1));
        const alternativeSlots1 = state1.TimetableListState.ShowingAlternateSlotOf
            ? state1.TimetableListState.ShowingAlternateSlotOf.AlternativeSlots
            : [];
        chai_1.expect(alternativeSlots1).to.have.lengthOf(3);
        // Expect after apply set-time-constraint filter, there is only one alternative slot for ASSD-T1
        const greenBoxToBeClicked = new stcBox_1.STCBox(stcBox_1.BoxKind.MaybeOccupied, 1, parseInt("10000", 2), 4); // Tuesday 10.30am to 11.00am
        const state2 = masterState_1.MasterStateReducers(state0, [
            new filterTimetable_1.FilterTimetable(greenBoxToBeClicked),
            new findAlternativeSlotsOfCurrentSlots_1.FindAlternativeSlotsOfCurrentSlots()
        ]);
        const slotsToBeClicked2 = state2.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) => x.SubjectCode === "UEMX4313" &&
            x.Type === "T" &&
            x.Group[0] === "1")[0]; // ASSD I, Tutorial 1
        const newState2 = masterState_1.MasterStateReducer(state2, new showAlternateSlot_1.ShowAlternateSlot(slotsToBeClicked2));
        const alternativeSlots2 = newState2.TimetableListState.ShowingAlternateSlotOf
            ? newState2.TimetableListState.ShowingAlternateSlotOf.AlternativeSlots
            : [];
        chai_1.expect(alternativeSlots2).to.have.lengthOf(1);
        // Expect the alternative slots is lesser after apply set-time-constraint filter
        chai_1.expect(alternativeSlots1.length >
            alternativeSlots2.length).to.eq(true);
    });
    it([
        "when showing alternative slots, ShowingAlternateSlotOf should be set to null when:",
        "1. Navigating to other timetables",
        "2. Opening set time constraint view"
    ].join(""), () => {
        const initialState = testDataGenerator_1.GetMockInitialState("heng_2017_apr");
        const newState0 = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.FM1));
        const newState1 = masterState_1.MasterStateReducer(newState0, new findAlternativeSlotsOfCurrentSlots_1.FindAlternativeSlotsOfCurrentSlots());
        const slotsToBeClicked = newState1.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) => x.Type === "T" &&
            x.SubjectCode === "UEME2123" &&
            x.Group[0] === "3")[0]; // Fluid Mechanic I, Tutorial 3
        const newState2 = masterState_1.MasterStateReducer(newState1, new showAlternateSlot_1.ShowAlternateSlot(slotsToBeClicked));
        chai_1.expect(newState2.TimetableListState.ShowingAlternateSlotOf).to.not.eq(null);
        chai_1.expect(masterState_1.MasterStateReducer(newState2, new goToNextTimetable_1.GoToNextTimetable()).TimetableListState.ShowingAlternateSlotOf)
            .to.eq(null);
        chai_1.expect(masterState_1.MasterStateReducer(newState2, new goToPrevTimetable_1.GoToPrevTimetable()).TimetableListState.ShowingAlternateSlotOf)
            .to.eq(null);
        chai_1.expect(masterState_1.MasterStateReducer(newState2, new goToRandomTimetable_1.GoToRandomTimetable()).TimetableListState.ShowingAlternateSlotOf)
            .to.eq(null);
        chai_1.expect(masterState_1.MasterStateReducer(newState2, new goToNextSubTimetable_1.GoToNextSubTimetable()).TimetableListState.ShowingAlternateSlotOf)
            .to.eq(null);
        chai_1.expect(masterState_1.MasterStateReducer(newState2, new goToPreviousSubTimetable_1.GoToPreviousSubTimetable()).TimetableListState.ShowingAlternateSlotOf)
            .to.eq(null);
        chai_1.expect(masterState_1.MasterStateReducer(newState2, new toggleSetTimeConstraintView_1.ToggleSetTimeConstraintView(true)).TimetableListState.ShowingAlternateSlotOf)
            .to.eq(null);
    });
    it("should not show the alternative slots of other slot if ShowingAlternateSlotOf is not null", () => {
        const initialState = testDataGenerator_1.GetMockInitialState("heng_2017_apr");
        const state1 = masterState_1.MasterStateReducers(initialState, [
            new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.FM1),
            new findAlternativeSlotsOfCurrentSlots_1.FindAlternativeSlotsOfCurrentSlots()
        ]);
        chai_1.expect(state1.TimetableListState.ShowingAlternateSlotOf).to.eq(null);
        // Show the alternative slots of FM1-T3
        const slotsToBeClicked1 = state1.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) => x.Type === "T" &&
            x.SubjectCode === "UEME2123" &&
            x.Group[0] === "3")[0]; // Fluid Mechanic I, Tutorial 3
        const state2 = masterState_1.MasterStateReducer(state1, new showAlternateSlot_1.ShowAlternateSlot(slotsToBeClicked1));
        chai_1.expect(state2.TimetableListState.ShowingAlternateSlotOf).not.to.eq(null);
        // Show the alternative slots of FM1-P1
        const slotsToBeClicked2 = state2.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) => x.Type === "P" &&
            x.SubjectCode === "UEME2123" &&
            x.Group[0] === "1")[0]; // Fluid Mechanic I, Practical 1
        const state3 = masterState_1.MasterStateReducer(state2, new showAlternateSlot_1.ShowAlternateSlot(slotsToBeClicked2));
        // Expect nothing changes, since FM1-T3 is still showing
        // This is to prevent the UI from crashing (related to React Archer)
        // Refer to https://github.com/wongjiahau/ttap-web/issues/193#issuecomment-763494226
        chai_1.expect(state3).to.deep.eq(state2);
    });
});
//# sourceMappingURL=_showAlternateSlot.test.js.map