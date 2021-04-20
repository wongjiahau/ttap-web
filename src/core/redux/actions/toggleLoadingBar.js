"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("./../reducers/masterState");
class ToggleLoadingBar extends masterState_1.MasterStateAction {
    constructor(showLoadingBar) {
        super();
        this.showLoadingBar = showLoadingBar;
    }
    TypeName() {
        return "toggle loading bar";
    }
    GenerateNewState(state) {
        return Object.assign({}, state, { SubjectListState: Object.assign({}, state.SubjectListState, { IsShowingLoadingBar: this.showLoadingBar }) });
    }
}
exports.ToggleLoadingBar = ToggleLoadingBar;
//# sourceMappingURL=toggleLoadingBar.js.map