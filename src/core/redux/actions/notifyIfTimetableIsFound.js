"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("./../reducers/masterState");
class NotifyIfTimetableIsFound extends masterState_1.MasterStateAction {
    constructor() {
        super();
    }
    TypeName() {
        return "notify if timetable is found";
    }
    GenerateNewState(state) {
        const numberOfTimetablesFound = state.TimetableListState.FiltrateTimetables.length;
        const shouldShowSnackbar = state.SubjectListState.Subjects.some((s) => s.IsSelected);
        const message = `${numberOfTimetablesFound} possible timetables found.`;
        return Object.assign({}, state, { SnackbarState: Object.assign({}, state.SnackbarState, { Message: message, IsOpen: shouldShowSnackbar }) });
    }
}
exports.NotifyIfTimetableIsFound = NotifyIfTimetableIsFound;
//# sourceMappingURL=notifyIfTimetableIsFound.js.map