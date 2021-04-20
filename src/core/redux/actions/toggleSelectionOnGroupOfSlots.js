"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clone = require("lodash.clone");
const find = require("lodash.find");
const masterState_1 = require("./../reducers/masterState");
class ToggleSelectionOnGroupOfSlots extends masterState_1.MasterStateAction {
    constructor(subjectCode) {
        super();
        this.subjectCode = subjectCode;
    }
    TypeName() {
        return `toggle selection on group of slots of (${this.subjectCode})`;
    }
    GenerateNewState(state) {
        const targetSubject = find(state.SubjectListState.Subjects, {
            Code: this.subjectCode
        });
        let selectedSlotsCount = 0;
        let deselectedSlotsCount = 0;
        targetSubject.SlotNumbers.forEach((slotNumber) => {
            if (state.SlotTableState.SlotStates[slotNumber] === true) {
                selectedSlotsCount++;
            }
            else {
                deselectedSlotsCount++;
            }
        });
        const allSlotShouldBeSelected = deselectedSlotsCount > selectedSlotsCount;
        const newSlotStates = clone(state.SlotTableState.SlotStates);
        targetSubject.SlotNumbers.forEach((slotNumber) => {
            newSlotStates[slotNumber] = allSlotShouldBeSelected;
        });
        const newSubjectStates = clone(state.SlotTableState.SubjectStates);
        newSubjectStates[this.subjectCode] = allSlotShouldBeSelected ? "true" : "false";
        return Object.assign({}, state, { SlotTableState: Object.assign({}, state.SlotTableState, { SlotStates: newSlotStates, SubjectStates: newSubjectStates }) });
    }
}
exports.ToggleSelectionOnGroupOfSlots = ToggleSelectionOnGroupOfSlots;
//# sourceMappingURL=toggleSelectionOnGroupOfSlots.js.map