"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("./../reducers/masterState");
class ToggleIsOpenOfSummary extends masterState_1.MasterStateAction {
    constructor(open = null) {
        super();
        this.open = open;
    }
    TypeName() {
        return "toggle is open of summary";
    }
    GenerateNewState(state) {
        if (this.open !== null) {
            return Object.assign({}, state, { TimetableListState: Object.assign({}, state.TimetableListState, { IsSummaryOpen: this.open }) });
        }
        return Object.assign({}, state, { TimetableListState: Object.assign({}, state.TimetableListState, { IsSummaryOpen: !state.TimetableListState.IsSummaryOpen }) });
    }
}
exports.ToggleIsOpenOfSummary = ToggleIsOpenOfSummary;
//# sourceMappingURL=toggleIsOpenOfSummary.js.map