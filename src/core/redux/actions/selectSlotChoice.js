"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objectStore_1 = require("../../dataStructure/objectStore");
const masterState_1 = require("./../reducers/masterState");
class SelectSlotChoice extends masterState_1.MasterStateAction {
    constructor(slotUid, newSlotChoice) {
        super();
        this.slotUid = slotUid;
        this.newSlotChoice = newSlotChoice;
    }
    TypeName() { return "select slot choice"; }
    GenerateNewState(state) {
        const oldObjectStore = state.TimetableListState.SlotViewModelStore;
        const newSlotStateStore = new objectStore_1.ObjectStore(oldObjectStore.GetAll());
        const slotsToBeModified = newSlotStateStore.GetOne(this.slotUid);
        slotsToBeModified.CurrentChoice = this.newSlotChoice;
        return Object.assign({}, state, { TimetableListState: Object.assign({}, state.TimetableListState, { SlotViewModelStore: newSlotStateStore }) });
    }
}
exports.SelectSlotChoice = SelectSlotChoice;
//# sourceMappingURL=selectSlotChoice.js.map