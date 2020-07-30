"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("../reducers/masterState");
class GoToPreviousSubTimetable extends masterState_1.MasterStateAction {
    TypeName() { return "go to previous sub timetable"; }
    GenerateNewState(state) {
        const s = state.TimetableListState;
        let newIndex = s.CurrentSubIndex - 1;
        if (newIndex < 0) {
            newIndex = s.FiltrateTimetables[s.CurrentIndex].ListOfSlotUids.length - 1;
        }
        return Object.assign({}, state, { TimetableListState: Object.assign({}, state.TimetableListState, { CurrentSubIndex: newIndex, AlternativeSlots: [] }) });
    }
}
exports.GoToPreviousSubTimetable = GoToPreviousSubTimetable;
//# sourceMappingURL=goToPreviousSubTimetable.js.map