"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("./../reducers/masterState");
class ToggleSetTimeConstraintView extends masterState_1.MasterStateAction {
    constructor(open) {
        super();
        this.open = open;
    }
    TypeName() {
        return this.open ? "open set time constraint view" : "close set time constraint view";
    }
    GenerateNewState(state) {
        return Object.assign({}, state, { SetTimeConstraintState: Object.assign({}, state.SetTimeConstraintState, { IsOpen: this.open }) });
    }
}
exports.ToggleSetTimeConstraintView = ToggleSetTimeConstraintView;
//# sourceMappingURL=toggleSetTimeConstraintView.js.map