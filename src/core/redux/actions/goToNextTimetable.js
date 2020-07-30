"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("../reducers/masterState");
class GoToNextTimetable extends masterState_1.MasterStateAction {
    TypeName() { return "go to next timetable"; }
    GenerateNewState(state) {
        let newIndex = state.TimetableListState.CurrentIndex + 1;
        if (newIndex > state.TimetableListState.FiltrateTimetables.length - 1) {
            newIndex = 0;
        }
        return Object.assign({}, state, { TimetableListState: Object.assign({}, state.TimetableListState, { CurrentIndex: newIndex, CurrentSubIndex: 0, AlternativeSlots: [] }) });
    }
}
exports.GoToNextTimetable = GoToNextTimetable;
//# sourceMappingURL=goToNextTimetable.js.map