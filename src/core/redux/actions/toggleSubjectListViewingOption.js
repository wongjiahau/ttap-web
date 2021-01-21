"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("./../reducers/masterState");
class ToggleSubjectListViewingOptions extends masterState_1.MasterStateAction {
    TypeName() {
        return "toggle subject list viewing option";
    }
    GenerateNewState(state) {
        const newIsShowingSelectedSubjectOnly = !state.SubjectListState.IsShowingSelectedSubjectOnly;
        const newSubjects = state
            .SubjectListState
            .Subjects
            .map((s) => {
            if (newIsShowingSelectedSubjectOnly) {
                return Object.assign({}, s, { IsVisible: s.IsSelected });
            }
            else {
                return Object.assign({}, s, { IsVisible: true });
            }
        });
        const result = Object.assign({}, state, { SubjectListState: Object.assign({}, state.SubjectListState, { IsShowingSelectedSubjectOnly: newIsShowingSelectedSubjectOnly, Subjects: newSubjects }) });
        return result;
    }
}
exports.ToggleSubjectListViewingOptions = ToggleSubjectListViewingOptions;
//# sourceMappingURL=toggleSubjectListViewingOption.js.map