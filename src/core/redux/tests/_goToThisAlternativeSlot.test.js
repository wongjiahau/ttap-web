"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const heng_2017_apr_1 = require("../../tests/testData/heng_2017_apr");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const findAlternativeSlotsOfCurrentSlots_1 = require("../actions/findAlternativeSlotsOfCurrentSlots");
const goToThisAlternativeSlot_1 = require("../actions/goToThisAlternativeSlot");
const showAlternateSlot_1 = require("../actions/showAlternateSlot");
const toggleSubjectSelection_1 = require("../actions/toggleSubjectSelection");
const masterState_1 = require("../reducers/masterState");
describe("showAlternateSlot action", () => {
    it("should set alternate slots based on clicked slot", () => {
        const initialState = testDataGenerator_1.GetMockInitialState("heng_2017_apr");
        const newState0 = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.ASSD));
        const newState1 = masterState_1.MasterStateReducer(newState0, new findAlternativeSlotsOfCurrentSlots_1.FindAlternativeSlotsOfCurrentSlots());
        const slotsToBeClicked = newState1.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) => x.SubjectCode === "UEMX4313" &&
            x.Type === "T" &&
            x.Group[0] === "1")[0]; // ASSD T1
        const newState2 = masterState_1.MasterStateReducer(newState1, new showAlternateSlot_1.ShowAlternateSlot(slotsToBeClicked));
        chai_1.expect(newState2.TimetableListState.CurrentIndex).to.eq(0);
        const newState3 = masterState_1.MasterStateReducer(newState2, new goToThisAlternativeSlot_1.GoToThisAlternativeSlot(newState2.TimetableListState.AlternativeSlots[0].Uid));
        chai_1.expect(newState3.TimetableListState.CurrentIndex).to.eq(1);
        chai_1.expect(newState3.TimetableListState.CurrentSubIndex).to.eq(0);
        chai_1.expect(newState3.TimetableListState.ShowingAlternateSlotOf).to.eq(null);
        chai_1.expect(newState3.SnackbarState.IsOpen).to.eq(false);
        chai_1.expect(newState3
            .TimetableListState
            .FiltrateTimetables[newState3.TimetableListState.CurrentIndex]
            .ListOfSlotUids[0]).to.have.lengthOf(3);
    });
    it("case 2", () => {
        const initialState = testDataGenerator_1.GetMockInitialState("heng_2017_apr");
        const newState0 = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.FM1));
        const newState1 = masterState_1.MasterStateReducer(newState0, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.FM2));
        const slotsToBeClicked = newState1.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) => x.SubjectCode === "UEME2123" &&
            x.Type === "L" &&
            x.Group[0] === "1").filter((x) => x.Day === "Mon")[0]; // FM1 L1 of Monday
        const newState2 = masterState_1.MasterStateReducer(newState1, new findAlternativeSlotsOfCurrentSlots_1.FindAlternativeSlotsOfCurrentSlots());
        const newState3 = masterState_1.MasterStateReducer(newState2, new showAlternateSlot_1.ShowAlternateSlot(slotsToBeClicked));
        const newState4 = masterState_1.MasterStateReducer(newState3, new goToThisAlternativeSlot_1.GoToThisAlternativeSlot(newState3.TimetableListState.AlternativeSlots[0].Uid));
        const currentSlots = newState4.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) => newState4.TimetableListState.FiltrateTimetables[newState4.TimetableListState.CurrentIndex].ListOfSlotUids[0]
            .indexOf(x.Uid) > -1);
        // Note: UEME2123 = Fluid Mechanics 1 ; UEME3112 = Fluid Mechanics 2
        chai_1.expect(currentSlots.some((x) => x.SubjectCode === "UEME2123" && x.Type === "L" && x.Group[0] === "3")).to.eq(true);
        chai_1.expect(currentSlots.some((x) => x.SubjectCode === "UEME2123" && x.Type === "T" && x.Group[0] === "3")).to.eq(true);
        chai_1.expect(currentSlots.some((x) => x.SubjectCode === "UEME2123" && x.Type === "P" && x.Group[0] === "1")).to.eq(true);
        chai_1.expect(currentSlots.some((x) => x.SubjectCode === "UEME3112" && x.Type === "L" && x.Group[0] === "1")).to.eq(true);
        chai_1.expect(currentSlots.some((x) => x.SubjectCode === "UEME3112" && x.Type === "T" && x.Group[0] === "1")).to.eq(true);
        chai_1.expect(currentSlots.some((x) => x.SubjectCode === "UEME3112" && x.Type === "P" && x.Group[0] === "5")).to.eq(true);
    });
    it("case 3", () => {
        const initialState = testDataGenerator_1.GetMockInitialState("heng_2017_apr");
        const newState0 = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.FM1));
        const newState1 = masterState_1.MasterStateReducer(newState0, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.FM2));
        const slotsToBeClicked = newState1.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) => x.SubjectCode === "UEME2123" &&
            x.Type === "P" &&
            x.Group[0] === "1")[0]; // FM1 P1 of Tuesday
        const newState2 = masterState_1.MasterStateReducer(newState1, new findAlternativeSlotsOfCurrentSlots_1.FindAlternativeSlotsOfCurrentSlots());
        const newState3 = masterState_1.MasterStateReducer(newState2, new showAlternateSlot_1.ShowAlternateSlot(slotsToBeClicked));
        const newState4 = masterState_1.MasterStateReducer(newState3, new goToThisAlternativeSlot_1.GoToThisAlternativeSlot(
        // Go to FM1-P28 of Friday
        newState3.TimetableListState.AlternativeSlots.filter((x) => x.Group[0] === "28")[0].Uid));
        // this check is because if no destination index is found, it will used back the original index
        chai_1.expect(newState4.TimetableListState.CurrentIndex).to.not.eq(newState3.TimetableListState.CurrentIndex);
        // changing back to original slots
        const slotsToBeClicked2 = newState1.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) => x.SubjectCode === "UEME2123" &&
            x.Type === "P" &&
            x.Group[0] === "28")[0]; // FM1 P28 of Friday
        const newState5 = masterState_1.MasterStateReducer(newState4, new findAlternativeSlotsOfCurrentSlots_1.FindAlternativeSlotsOfCurrentSlots());
        const newState6 = masterState_1.MasterStateReducer(newState5, new showAlternateSlot_1.ShowAlternateSlot(slotsToBeClicked2));
        const newState7 = masterState_1.MasterStateReducer(newState6, new goToThisAlternativeSlot_1.GoToThisAlternativeSlot(
        // Go to FM1-P1 of Tuesday
        newState6.TimetableListState.AlternativeSlots.filter((x) => x.Group[0] === "1")[0].Uid));
        chai_1.expect(newState7.TimetableListState.CurrentIndex).to.not.eq(newState6.TimetableListState.CurrentIndex);
    });
});
//# sourceMappingURL=_goToThisAlternativeSlot.test.js.map