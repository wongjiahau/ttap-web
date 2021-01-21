"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("./../reducers/masterState");
class UpdateSlotsTableState extends masterState_1.MasterStateAction {
    constructor() {
        super();
    }
    TypeName() {
        return "update slots table state";
    }
    GenerateNewState(state) {
        const selectedSubjects = state.SubjectListState.Subjects.filter((x) => x.IsSelected);
        return Object.assign({}, state, { SlotTableState: Object.assign({}, state.SlotTableState, { ErrorMessages: null, SlotStates: GetSlotStates(selectedSubjects), SubjectStates: GetSubjectStates(selectedSubjects) }) });
    }
}
exports.UpdateSlotsTableState = UpdateSlotsTableState;
function GetSlotStates(selectedSubjects) {
    const result = {};
    selectedSubjects.forEach((s) => {
        s.SlotNumbers.forEach((id) => {
            result[id] = true;
        });
    });
    return result;
}
exports.GetSlotStates = GetSlotStates;
function GetSubjectStates(selectedSubjects) {
    const result = {};
    selectedSubjects.forEach((s) => {
        result[s.Code] = "true";
    });
    return result;
}
exports.GetSubjectStates = GetSubjectStates;
//# sourceMappingURL=updateSlotsTableState.js.map