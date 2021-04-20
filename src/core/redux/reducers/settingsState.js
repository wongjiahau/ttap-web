"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findTimetable_1 = require("../../permutator/findTimetable");
function NewSettingsState() {
    return {
        SearchByConsideringWeekNumber: true,
        DisableClashChecking: false,
        TimetableFinder: findTimetable_1.FindTimetableByConsideringWeekNumber
    };
}
exports.NewSettingsState = NewSettingsState;
//# sourceMappingURL=settingsState.js.map