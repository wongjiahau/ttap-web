"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("./../reducers/masterState");
class ToggleIsOpenOfSubjectListView extends masterState_1.MasterStateAction {
    constructor(open) {
        super();
        this.open = open;
    }
    TypeName() {
        return this.open ?
            "open subject list view" :
            "close subject list view";
    }
    GenerateNewState(state) {
        return Object.assign({}, state, { SubjectListState: Object.assign({}, state.SubjectListState, { IsOpen: this.open }) });
    }
}
exports.ToggleIsOpenOfSubjectListView = ToggleIsOpenOfSubjectListView;
//# sourceMappingURL=toggleIsOpenOfSubjectListView.js.map