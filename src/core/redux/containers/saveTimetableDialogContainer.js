"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const saveTimetableDialog_1 = require("../../react/saveTimetableDialog");
const saveTimetableAsGoogleCalendar_1 = require("../actions/saveTimetable/saveTimetableAsGoogleCalendar");
const saveTimetableAsHtml_1 = require("../actions/saveTimetable/saveTimetableAsHtml");
const saveTimetableAsImage_1 = require("../actions/saveTimetable/saveTimetableAsImage");
const saveTimetableAsTextFile_1 = require("../actions/saveTimetable/saveTimetableAsTextFile");
const toggleIsOpenOfGetDateDialog_1 = require("../actions/toggleIsOpenOfGetDateDialog");
const toggleIsOpenOfSaveDialog_1 = require("../actions/toggleIsOpenOfSaveDialog");
const toggleIsOpenOfSummary_1 = require("./../actions/toggleIsOpenOfSummary");
const mapStateToProps = (state) => {
    const target = state.MasterStateReducer.SaveTimetableDialogState;
    return {
        isGetDateDialogOpen: target.IsGetDateDialogOpen,
        isMainDialogOpen: target.IsMainDialogOpen
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleSaveAsTextFile: () => dispatch(new saveTimetableAsTextFile_1.SaveTimetableAsTextFile()),
        handleSaveAsHtml: () => dispatch(new saveTimetableAsHtml_1.SaveTimetableAsHtml()),
        handleSaveAsImage: () => {
            dispatch(new toggleIsOpenOfSummary_1.ToggleIsOpenOfSummary(true));
            dispatch(new saveTimetableAsImage_1.SaveTimetableAsImage());
        },
        handleSaveToGoogleCalendar: (semStartDate) => dispatch(new saveTimetableAsGoogleCalendar_1.SaveTimetableAsGoogleCalendar(semStartDate)),
        handleClose: () => dispatch(new toggleIsOpenOfSaveDialog_1.ToggleIsOpenOfSaveDialog(false)),
        handleCloseGetDateDialog: () => dispatch(new toggleIsOpenOfGetDateDialog_1.ToggleIsOpenOfGetDateDialog(false)),
        handleOpenGetDateDialog: () => dispatch(new toggleIsOpenOfGetDateDialog_1.ToggleIsOpenOfGetDateDialog(true))
    };
};
exports.SaveTimetableDialogContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(saveTimetableDialog_1.SaveTimetableDialog);
//# sourceMappingURL=saveTimetableDialogContainer.js.map