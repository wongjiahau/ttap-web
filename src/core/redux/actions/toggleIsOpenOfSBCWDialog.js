"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("./../reducers/masterState");
class ToggleIsOpenOfSBCWDialog extends masterState_1.MasterStateAction {
    constructor(open) {
        super();
        this.open = open;
    }
    TypeName() {
        return this.open ?
            "turn on SBCWDialog" :
            "turn off SBCWDialog";
    }
    GenerateNewState(state) {
        return Object.assign({}, state, { SbcwDialogState: {
                IsOpen: this.open
            } });
    }
}
exports.ToggleIsOpenOfSBCWDialog = ToggleIsOpenOfSBCWDialog;
//# sourceMappingURL=toggleIsOpenOfSBCWDialog.js.map