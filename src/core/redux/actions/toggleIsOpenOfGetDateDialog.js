"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("./../reducers/masterState");
class ToggleIsOpenOfGetDateDialog extends masterState_1.MasterStateAction {
    constructor(isOpen) {
        super();
        this.isOpen = isOpen;
    }
    TypeName() {
        return this.isOpen ?
            "open get date dialog" :
            "close get date dialog";
    }
    GenerateNewState(state) {
        return Object.assign({}, state, { SaveTimetableDialogState: Object.assign({}, state.SaveTimetableDialogState, { IsGetDateDialogOpen: this.isOpen }) });
    }
}
exports.ToggleIsOpenOfGetDateDialog = ToggleIsOpenOfGetDateDialog;
//# sourceMappingURL=toggleIsOpenOfGetDateDialog.js.map