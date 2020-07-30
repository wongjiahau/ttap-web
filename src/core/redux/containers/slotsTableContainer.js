"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const app_1 = require("../../react/app");
const slotsTableView_1 = require("../../react/slotsTableView");
const findAlternativeSlotsOfCurrentSlots_1 = require("../actions/findAlternativeSlotsOfCurrentSlots");
const findTimetablesBasedOnChosenSlots_1 = require("../actions/findTimetablesBasedOnChosenSlots");
const toggleIsOpenOfSlotsTable_1 = require("../actions/toggleIsOpenOfSlotsTable");
const toggleSelectionOnGroupOfSlots_1 = require("../actions/toggleSelectionOnGroupOfSlots");
const toggleSelectionOnSpecificSlot_1 = require("../actions/toggleSelectionOnSpecificSlot");
const updateTotalMatrix_1 = require("../actions/updateTotalMatrix");
const mapStateToProps = (state) => {
    const slotsTableState = state.MasterStateReducer.SlotTableState;
    const subjectListState = state.MasterStateReducer.SubjectListState;
    return {
        errorMessages: slotsTableState.ErrorMessages,
        isOpen: slotsTableState.IsOpen,
        selectedSubjects: subjectListState.Subjects.filter((s) => s.IsSelected),
        slotStates: slotsTableState.SlotStates,
        subjectStates: slotsTableState.SubjectStates,
        rawSlotStore: state.MasterStateReducer.DataState.RawSlotDataRouter.GetDataFrom("ungeneralized")
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleDone: () => {
            app_1.ToggleLoadingScreen("Finding possible timetables", () => {
                dispatch(new findTimetablesBasedOnChosenSlots_1.FindTimetablesBasedOnChosenSlots());
                dispatch(new updateTotalMatrix_1.UpdateTotalMatrix());
                dispatch(new findAlternativeSlotsOfCurrentSlots_1.FindAlternativeSlotsOfCurrentSlots());
            });
        },
        handleCancel: () => dispatch(new toggleIsOpenOfSlotsTable_1.ToggleIsOpenOfSlotsTable(false)),
        handleSlotCheckChanged: (slotNumber, checked, subjectCode) => dispatch(new toggleSelectionOnSpecificSlot_1.ToggleSelectionOnSpecificSlot(slotNumber, checked, subjectCode)),
        handleSlotsGroupCheckChanged: (subjectCode) => dispatch(new toggleSelectionOnGroupOfSlots_1.ToggleSelectionOnGroupOfSlots(subjectCode))
    };
};
exports.SlotsTableContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(slotsTableView_1.SlotsTable);
//# sourceMappingURL=slotsTableContainer.js.map