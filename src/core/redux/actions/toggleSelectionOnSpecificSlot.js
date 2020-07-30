"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clone = require("lodash.clone");
const find = require("lodash.find");
const masterState_1 = require("./../reducers/masterState");
class ToggleSelectionOnSpecificSlot extends masterState_1.MasterStateAction {
    constructor(slotNumber, checked, subjectCode) {
        super();
        this.slotNumber = slotNumber;
        this.checked = checked;
        this.subjectCode = subjectCode;
    }
    TypeName() {
        return this.checked ?
            `selecting slot [ ${this.slotNumber} ]` :
            `deselecting slot [ ${this.slotNumber} ]`;
    }
    GenerateNewState(state) {
        const newSlotStates = clone(state.SlotTableState.SlotStates);
        newSlotStates[this.slotNumber] = !this.checked;
        const targetSubject = find(state.SubjectListState.Subjects, {
            Code: this.subjectCode
        });
        return Object.assign({}, state, { SlotTableState: Object.assign({}, state.SlotTableState, { SlotStates: newSlotStates }) });
    }
}
exports.ToggleSelectionOnSpecificSlot = ToggleSelectionOnSpecificSlot;
//# sourceMappingURL=toggleSelectionOnSpecificSlot.js.map