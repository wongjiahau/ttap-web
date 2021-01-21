"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("./../reducers/masterState");
class HideSnackbar extends masterState_1.MasterStateAction {
    constructor() {
        super();
    }
    TypeName() { return "hide snackbar"; }
    GenerateNewState(state) {
        return Object.assign({}, state, { SnackbarState: Object.assign({}, state.SnackbarState, { IsOpen: false }) });
    }
}
exports.HideSnackbar = HideSnackbar;
//# sourceMappingURL=hideSnackbar.js.map