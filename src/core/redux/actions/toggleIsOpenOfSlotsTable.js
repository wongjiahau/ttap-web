"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("./../reducers/masterState");
class ToggleIsOpenOfSlotsTable extends masterState_1.MasterStateAction {
    constructor(isOpen) {
        super();
        this.isOpen = isOpen;
    }
    TypeName() {
        return this.isOpen ?
            "open slots table" :
            "close slots table";
    }
    GenerateNewState(state) {
        return Object.assign({}, state, { SlotTableState: Object.assign({}, state.SlotTableState, { IsOpen: this.isOpen }), SnackbarState: Object.assign({}, state.SnackbarState, { IsOpen: false }) });
    }
}
exports.ToggleIsOpenOfSlotsTable = ToggleIsOpenOfSlotsTable;
//# sourceMappingURL=toggleIsOpenOfSlotsTable.js.map