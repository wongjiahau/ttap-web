"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getInitial_1 = require("../../util/getInitial");
const str_1 = require("../../util/str");
const masterState_1 = require("./../reducers/masterState");
class SearchSubjectList extends masterState_1.MasterStateAction {
    constructor(searchedText) {
        super();
        this.searchedText = searchedText;
    }
    TypeName() {
        return "search subject list";
    }
    GenerateNewState(state) {
        const newSubjects = state
            .SubjectListState
            .Subjects
            .map((s) => {
            const stringToBeMatched = new str_1.Str((s.Code + s.Name + getInitial_1.GetInitial(s.Name)).toLowerCase());
            return Object.assign({}, s, { IsVisible: (stringToBeMatched.Contains(this.searchedText.toLowerCase()) ?
                    true :
                    false) });
        });
        const result = Object.assign({}, state, { SubjectListState: Object.assign({}, state.SubjectListState, { IsShowingSelectedSubjectOnly: false, SearchedText: this.searchedText, Subjects: newSubjects }) });
        return result;
    }
}
exports.SearchSubjectList = SearchSubjectList;
//# sourceMappingURL=searchSubjectList.js.map