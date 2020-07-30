"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const heng_2017_apr_1 = require("../../tests/testData/heng_2017_apr");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const findAlternativeSlotsOfCurrentSlots_1 = require("../actions/findAlternativeSlotsOfCurrentSlots");
const showAlternateSlot_1 = require("../actions/showAlternateSlot");
const toggleSubjectSelection_1 = require("../actions/toggleSubjectSelection");
const masterState_1 = require("../reducers/masterState");
describe("find alternative slots of current slot", () => {
    it("should not show alternative slots if not all sibling slots are shown", () => {
        // For more info, refer https://github.com/wongjiahau/ttap-web/issues/101
        const intialState = testDataGenerator_1.GetMockInitialState("heng_2017_apr");
        let state = masterState_1.MasterStateReducer(intialState, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.FM1));
        state = masterState_1.MasterStateReducer(state, new toggleSubjectSelection_1.ToggleSubjectSelection(heng_2017_apr_1.IndexOf.FM2));
        chai_1.expect(state.TimetableListState.SlotViewModelStore.GetAll()).to.have.lengthOf(79);
        state = masterState_1.MasterStateReducer(state, new findAlternativeSlotsOfCurrentSlots_1.FindAlternativeSlotsOfCurrentSlots());
        const slotsToBeClicked = state.TimetableListState.SlotViewModelStore.GetAll()
            .filter((x) => x.Type === "L" &&
            x.SubjectCode === "UEME2123" &&
            x.Group[0] === "1")[0]; // Fluid Mechanic I, Lecture 1
        state = masterState_1.MasterStateReducer(state, new showAlternateSlot_1.ShowAlternateSlot(slotsToBeClicked));
        chai_1.expect(state.TimetableListState.AlternativeSlots.some((x) => x.Group[0] === "2")).to.eq(false);
        chai_1.expect(state.TimetableListState.SlotViewModelStore.GetAll()).to.have.lengthOf(79);
    });
});
//# sourceMappingURL=_findAlternativeSlotsOfCurrentSlots.test.js.map