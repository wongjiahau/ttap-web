"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const timetableCreatorView_1 = require("../../react/timetableCreatorView");
const findTimetablesBasedOnChosenSlots_1 = require("../actions/findTimetablesBasedOnChosenSlots");
const notifyDataLoaded_1 = require("../actions/notifyDataLoaded");
const notifyIfTimetableIsFound_1 = require("../actions/notifyIfTimetableIsFound");
const searchSubjectList_1 = require("../actions/searchSubjectList");
const toggleDisableClashChecking_1 = require("../actions/toggleDisableClashChecking");
const toggleIsOpenOfSBCWDialog_1 = require("../actions/toggleIsOpenOfSBCWDialog");
const toggleIsOpenOfSubjectListView_1 = require("../actions/toggleIsOpenOfSubjectListView");
const turnOffSBCW_1 = require("../actions/turnOffSBCW");
const updateTotalMatrix_1 = require("../actions/updateTotalMatrix");
const mapStateToProps = (state) => {
    const target = state.MasterStateReducer.TimetableCreatorState;
    const settingsState = state.MasterStateReducer.SettingsState;
    return {
        isSbcwTurnedOn: settingsState.SearchByConsideringWeekNumber,
        isSlotLoaded: target.IsSlotLoaded,
        isDccTurnedOn: settingsState.DisableClashChecking
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleSlotLoaded: (rawSlots) => dispatch(new notifyDataLoaded_1.NotifyDataLoaded(rawSlots)),
        handleOpenSubjectListView: () => {
            dispatch(new toggleIsOpenOfSubjectListView_1.ToggleIsOpenOfSubjectListView(true));
            dispatch(new searchSubjectList_1.SearchSubjectList(""));
        },
        handleOpenSbcwDialog: () => dispatch(new toggleIsOpenOfSBCWDialog_1.ToggleIsOpenOfSBCWDialog(true)),
        handleTurnOffSBCW: () => {
            dispatch(new turnOffSBCW_1.TurnOffSBCW());
            dispatch(new findTimetablesBasedOnChosenSlots_1.FindTimetablesBasedOnChosenSlots());
            dispatch(new updateTotalMatrix_1.UpdateTotalMatrix());
            dispatch(new notifyIfTimetableIsFound_1.NotifyIfTimetableIsFound());
        },
        handleToggleDisableClashChecking: (x) => {
            dispatch(new toggleDisableClashChecking_1.ToggleDisableClashChecking(x));
        }
    };
};
exports.TimetableCreatorContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(timetableCreatorView_1.TimetableCreatorView);
//# sourceMappingURL=timetableCreatorContainer.js.map