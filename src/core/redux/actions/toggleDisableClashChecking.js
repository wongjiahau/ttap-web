"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("../reducers/masterState");
class ToggleDisableClashChecking extends masterState_1.MasterStateAction {
    constructor(disable) {
        super();
        this.disable = disable;
    }
    TypeName() {
        return "toggle disable clash checking to: " + this.disable;
    }
    GenerateNewState(state) {
        return Object.assign({}, state, { SettingsState: Object.assign({}, state.SettingsState, { DisableClashChecking: this.disable }), SnackbarState: {
                IsOpen: true,
                Message: `Clash-checking ${this.disable ? "disabled" : "enabled"}.`
            } });
    }
}
exports.ToggleDisableClashChecking = ToggleDisableClashChecking;
//# sourceMappingURL=toggleDisableClashChecking.js.map