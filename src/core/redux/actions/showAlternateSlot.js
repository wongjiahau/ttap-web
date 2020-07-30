"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slotView_1 = require("../../react/slotView");
const masterState_1 = require("./../reducers/masterState");
class ShowAlternateSlot extends masterState_1.MasterStateAction {
    constructor(slot) {
        super();
        this.slot = slot;
    }
    TypeName() { return "show alternate slot"; }
    GenerateNewState(state) {
        if (state.TimetableListState.ShowingAlternateSlotOf &&
            this.slot.Uid === state.TimetableListState.ShowingAlternateSlotOf.Uid) {
            return Object.assign({}, state, { SnackbarState: Object.assign({}, state.SnackbarState, { IsOpen: false }), TimetableListState: Object.assign({}, state.TimetableListState, { AlternativeSlots: [], ShowingAlternateSlotOf: null }) });
        }
        const alternativeSlots = this.slot.AlternativeSlots;
        return Object.assign({}, state, { SnackbarState: Object.assign({}, state.SnackbarState, { Message: alternativeSlots.length > 0 ?
                    `Showing alternative slots for ${slotView_1.getSlotContent(this.slot)}` :
                    `No alternative slots are available for ${slotView_1.getSlotContent(this.slot)}`, IsOpen: true }), TimetableListState: Object.assign({}, state.TimetableListState, { AlternativeSlots: alternativeSlots, ShowingAlternateSlotOf: this.slot }) });
    }
}
exports.ShowAlternateSlot = ShowAlternateSlot;
//# sourceMappingURL=showAlternateSlot.js.map