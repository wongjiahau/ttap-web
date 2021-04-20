"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timetable_1 = require("../../../model/timetable");
const saveTimetableDialogState_1 = require("../../reducers/saveTimetableDialogState");
const masterState_1 = require("./../../reducers/masterState");
class SaveTimetable extends masterState_1.MasterStateAction {
    constructor() {
        super();
    }
    TypeName() {
        return "save timetable as - " + this.SaveType();
    }
    GenerateNewState(state) {
        const x = state.TimetableListState;
        const currentTimetable = timetable_1.newTimetable(x.FiltrateTimetables[x.CurrentIndex].ListOfSlotUids[x.CurrentSubIndex], x.FiltrateTimetables[x.CurrentIndex].DayTimeMatrix);
        if (currentTimetable) {
            this.Save(currentTimetable, state.DataState.RawSlotDataRouter.GetCurrentData());
        }
        return Object.assign({}, state, { SaveTimetableDialogState: saveTimetableDialogState_1.NewSaveTimetableDialogState() });
    }
}
exports.SaveTimetable = SaveTimetable;
class MockSaveTimetable extends SaveTimetable {
    Save(timetable) {
        // do nothing, as the purpose of this class is for testing only
    }
    SaveType() {
        return "mock";
    }
}
exports.MockSaveTimetable = MockSaveTimetable;
//# sourceMappingURL=saveTimetable.js.map