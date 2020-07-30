"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("../reducers/masterState");
class GoToPrevTimetable extends masterState_1.MasterStateAction {
    TypeName() { return "go to previous timetable"; }
    GenerateNewState(state) {
        let newIndex = state.TimetableListState.CurrentIndex - 1;
        if (newIndex < 0) {
            newIndex = state.TimetableListState.FiltrateTimetables.length - 1;
        }
        return Object.assign({}, state, { TimetableListState: Object.assign({}, state.TimetableListState, { CurrentIndex: newIndex, CurrentSubIndex: 0, AlternativeSlots: [] }) });
    }
}
exports.GoToPrevTimetable = GoToPrevTimetable;
//# sourceMappingURL=goToPrevTimetable.js.map