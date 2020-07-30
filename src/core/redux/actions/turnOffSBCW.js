"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findTimetable_1 = require("../../permutator/findTimetable");
const masterState_1 = require("./../reducers/masterState");
class TurnOffSBCW extends masterState_1.MasterStateAction {
    constructor() {
        super();
    }
    TypeName() {
        return "turn off search by considering week number";
    }
    GenerateNewState(state) {
        const newDataRouter = state.DataState.RawSlotDataRouter.Clone();
        newDataRouter.SetRouteTo("generalized");
        return Object.assign({}, state, { DataState: {
                RawSlotDataRouter: newDataRouter
            }, SettingsState: Object.assign({}, state.SettingsState, { SearchByConsideringWeekNumber: false, TimetableFinder: findTimetable_1.FindTimetableWithoutConsideringWeekNumber }) });
    }
}
exports.TurnOffSBCW = TurnOffSBCW;
//# sourceMappingURL=turnOffSBCW.js.map