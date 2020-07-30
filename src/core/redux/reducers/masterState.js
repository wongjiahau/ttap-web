"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeName = require("type-name");
const action_1 = require("../actions/action");
const algorithmVisualizerState_1 = require("./algorithmVisualizerState");
const dataState_1 = require("./dataState");
const generateReducer_1 = require("./generateReducer");
const saveTimetableDialogState_1 = require("./saveTimetableDialogState");
const sbcwDialogState_1 = require("./sbcwDialogState");
const setTimeConstraintState_1 = require("./setTimeConstraintState");
const settingsState_1 = require("./settingsState");
const slotsTableState_1 = require("./slotsTableState");
const snackbarState_1 = require("./snackbarState");
const subjectListState_1 = require("./subjectListState");
const timetableCreatorState_1 = require("./timetableCreatorState");
const timetableListState_1 = require("./timetableListState");
function NewMasterState(isSummaryOpen = true) {
    return {
        DataState: dataState_1.NewDataState(),
        SaveTimetableDialogState: saveTimetableDialogState_1.NewSaveTimetableDialogState(),
        SbcwDialogState: sbcwDialogState_1.NewSbcwDialogstate(),
        SetTimeConstraintState: setTimeConstraintState_1.NewSetTimeConstraintState([]),
        SettingsState: settingsState_1.NewSettingsState(),
        SlotTableState: slotsTableState_1.NewSlotsTableState(),
        SnackbarState: snackbarState_1.NewSnackbarState(),
        SubjectListState: subjectListState_1.NewSubjectListState([]),
        TimetableCreatorState: timetableCreatorState_1.NewTimetableCreatorState(),
        TimetableListState: timetableListState_1.NewTimetableListState([], [], isSummaryOpen),
        AlgorithmVisualizerState: algorithmVisualizerState_1.NewAlgorithmVisualizerState()
    };
}
exports.NewMasterState = NewMasterState;
class MasterStateAction extends action_1.Action {
    StateName() {
        return typeName(NewMasterState());
    }
}
exports.MasterStateAction = MasterStateAction;
exports.MasterStateReducer = generateReducer_1.GenerateReducer(NewMasterState());
//# sourceMappingURL=masterState.js.map