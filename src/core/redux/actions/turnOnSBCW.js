"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findTimetable_1 = require("../../permutator/findTimetable");
const masterState_1 = require("./../reducers/masterState");
class TurnOnSBCW extends masterState_1.MasterStateAction {
    constructor() {
        super();
    }
    TypeName() {
        return "turn on search by considering week number";
    }
    GenerateNewState(state) {
        const newDataRouter = state.DataState.RawSlotDataRouter.Clone();
        newDataRouter.SetRouteTo("ungeneralized");
        return Object.assign({}, state, { DataState: {
                RawSlotDataRouter: newDataRouter
            }, SettingsState: Object.assign({}, state.SettingsState, { SearchByConsideringWeekNumber: true, TimetableFinder: findTimetable_1.FindTimetableByConsideringWeekNumber }), SbcwDialogState: Object.assign({}, state.SbcwDialogState, { IsOpen: false }) });
    }
}
exports.TurnOnSBCW = TurnOnSBCW;
//# sourceMappingURL=turnOnSBCW.js.map