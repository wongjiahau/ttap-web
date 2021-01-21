"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeName = require("type-name");
const action_1 = require("../actions/action");
function NewTimetableCreatorState() {
    return {
        IsSlotLoaded: false
    };
}
exports.NewTimetableCreatorState = NewTimetableCreatorState;
class TimetableCreatorStateAction extends action_1.Action {
    StateName() {
        return typeName(NewTimetableCreatorState());
    }
}
exports.TimetableCreatorStateAction = TimetableCreatorStateAction;
//# sourceMappingURL=timetableCreatorState.js.map