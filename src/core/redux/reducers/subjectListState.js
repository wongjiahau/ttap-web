"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeName = require("type-name");
const action_1 = require("../actions/action");
function NewSubjectListState(subjects) {
    return {
        ClashingSubjectPairs: null,
        IsOpen: false,
        IsShowingLoadingBar: false,
        IsShowingSelectedSubjectOnly: false,
        SearchedText: "",
        Subjects: subjects,
    };
}
exports.NewSubjectListState = NewSubjectListState;
class SubjectListStateAction extends action_1.Action {
    StateName() {
        return typeName(NewSubjectListState([]));
    }
}
exports.SubjectListStateAction = SubjectListStateAction;
//# sourceMappingURL=subjectListState.js.map