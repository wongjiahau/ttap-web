"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("./../reducers/masterState");
class NotifyNumberOfRemainingTimetables extends masterState_1.MasterStateAction {
    constructor() {
        super();
    }
    TypeName() {
        return "notify number of remaining timetables";
    }
    GenerateNewState(state) {
        return Object.assign({}, state, { SnackbarState: Object.assign({}, state.SnackbarState, { IsOpen: true, Message: state.TimetableListState.FiltrateTimetables.length +
                    " timetables remaining." }) });
    }
}
exports.NotifyNumberOfRemainingTimetables = NotifyNumberOfRemainingTimetables;
//# sourceMappingURL=notifyNumberOfRemainingTimetables.js.map