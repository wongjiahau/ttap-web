"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("../reducers/masterState");
class GoToNextSubTimetable extends masterState_1.MasterStateAction {
    TypeName() { return "go to next sub timetable"; }
    GenerateNewState(state) {
        const s = state.TimetableListState;
        let newIndex = s.CurrentSubIndex + 1;
        if (newIndex > s.FiltrateTimetables[s.CurrentIndex].ListOfSlotUids.length - 1) {
            newIndex = 0;
        }
        return Object.assign({}, state, { TimetableListState: Object.assign({}, state.TimetableListState, { CurrentSubIndex: newIndex, AlternativeSlots: [] }) });
    }
}
exports.GoToNextSubTimetable = GoToNextSubTimetable;
//# sourceMappingURL=goToNextSubTimetable.js.map