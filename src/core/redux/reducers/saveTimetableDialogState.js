"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeName = require("type-name");
const action_1 = require("../actions/action");
function NewSaveTimetableDialogState() {
    return {
        IsMainDialogOpen: false,
        IsGetDateDialogOpen: false
    };
}
exports.NewSaveTimetableDialogState = NewSaveTimetableDialogState;
class SaveTimetableDialogStateAction extends action_1.Action {
    StateName() {
        return typeName(NewSaveTimetableDialogState());
    }
}
exports.SaveTimetableDialogStateAction = SaveTimetableDialogStateAction;
//# sourceMappingURL=saveTimetableDialogState.js.map