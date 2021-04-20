"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("../reducers/masterState");
class GoToThisAlternativeSlot extends masterState_1.MasterStateAction {
    constructor(sourceSlotUid, destinationSlotUid) {
        super();
        this.sourceSlotUid = sourceSlotUid;
        this.destinationSlotUid = destinationSlotUid;
    }
    TypeName() { return `go to this alternate slot (destination=${this.destinationSlotUid}) `; }
    GenerateNewState(state) {
        const sourceSlot = state.TimetableListState.SlotViewModelStore.GetOne(this.sourceSlotUid);
        if (!sourceSlot) {
            console.error("Something is wrong, source slot is not defined");
            return state;
        }
        const alternativeSlot = sourceSlot.AlternativeSlots.find(slot => slot.slot.Uid === this.destinationSlotUid);
        if (!alternativeSlot) {
            return state;
        }
        return Object.assign({}, state, { TimetableListState: Object.assign({}, state.TimetableListState, { CurrentIndex: alternativeSlot.destinationTimetableIndex, CurrentSubIndex: alternativeSlot.destinationTimetableSubIndex, ShowingAlternateSlotOf: null }), SnackbarState: Object.assign({}, state.SnackbarState, { IsOpen: false }) });
    }
}
exports.GoToThisAlternativeSlot = GoToThisAlternativeSlot;
//# sourceMappingURL=goToThisAlternativeSlot.js.map