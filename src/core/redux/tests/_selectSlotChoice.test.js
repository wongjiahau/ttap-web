"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const toggleSubjectSelection_1 = require("./../actions/toggleSubjectSelection");
const isEqual = require("lodash.isequal");
const parseStudentHtmlToRawSlot_1 = require("../../parser/parseStudentHtmlToRawSlot");
const testManager_1 = require("../../tests/testManager");
const notifyDataLoaded_1 = require("../actions/notifyDataLoaded");
const selectSlotChoice_1 = require("./../actions/selectSlotChoice");
const masterState_1 = require("./../reducers/masterState");
function getInitialState() {
    const slots = parseStudentHtmlToRawSlot_1.default(new testManager_1.default().GetDataFrom(testManager_1.FileName.cf_2017_nov));
    const state = masterState_1.MasterStateReducer(masterState_1.NewMasterState(), new notifyDataLoaded_1.NotifyDataLoaded(slots));
    return state;
}
describe("SelectSlotChoice action", () => {
    it("'s typename should be 'select slot choice'", () => {
        const action = new selectSlotChoice_1.SelectSlotChoice(0, 0);
        chai_1.expect(action.TypeName()).to.eq("select slot choice");
    });
    it("case 1", () => {
        const initialState = getInitialState();
        const indexOfUEMK3233 = 4; // Bioprocess Engineering
        let newState = masterState_1.MasterStateReducer(initialState, new toggleSubjectSelection_1.ToggleSubjectSelection(indexOfUEMK3233));
        chai_1.expect(newState.TimetableListState.SlotViewModelStore.GetOne(229).CurrentChoice).to.eq(0);
        newState = masterState_1.MasterStateReducer(newState, new selectSlotChoice_1.SelectSlotChoice(229, 1));
        chai_1.expect(newState.TimetableListState.SlotViewModelStore.GetOne(229).CurrentChoice).to.eq(1);
    });
});
//# sourceMappingURL=_selectSlotChoice.test.js.map