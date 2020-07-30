"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("./../reducers/masterState");
class ToggleIsOpenOfSaveDialog extends masterState_1.MasterStateAction {
    constructor(isOpen) {
        super();
        this.isOpen = isOpen;
    }
    TypeName() {
        if (this.isOpen) {
            return "open save dialog";
        }
        else {
            return "close save dialog";
        }
    }
    GenerateNewState(state) {
        return Object.assign({}, state, { SaveTimetableDialogState: Object.assign({}, state.SaveTimetableDialogState, { IsMainDialogOpen: this.isOpen }) });
    }
}
exports.ToggleIsOpenOfSaveDialog = ToggleIsOpenOfSaveDialog;
//# sourceMappingURL=toggleIsOpenOfSaveDialog.js.map