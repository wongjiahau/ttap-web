"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("../reducers/masterState");
class ToggleLockSlot extends masterState_1.MasterStateAction {
    constructor(operation, slot) {
        super();
        this.operation = operation;
        this.slot = slot;
    }
    TypeName() {
        return "lock slot : " + JSON.stringify(this.slot, null, 2);
    }
    GenerateNewState(state) {
        const { UidsOfLockedSlot } = state.TimetableListState;
        switch (this.operation) {
            case "lock":
                UidsOfLockedSlot.push(this.slot.Uid);
                break;
            case "unlock":
                const index = UidsOfLockedSlot.indexOf(this.slot.Uid);
                if (index > -1) {
                    UidsOfLockedSlot.splice(index, 1);
                }
                else {
                    throw new Error("No locked slots have the uid of " + this.slot.Uid);
                }
                break;
        }
        return Object.assign({}, state, { TimetableListState: Object.assign({}, state.TimetableListState, { UidsOfLockedSlot }) });
    }
}
exports.ToggleLockSlot = ToggleLockSlot;
//# sourceMappingURL=toggleLockSlot.js.map