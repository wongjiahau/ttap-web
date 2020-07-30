"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const timetableListView_1 = require("../../react/timetableListView");
const findAlternativeSlotsOfCurrentSlots_1 = require("../actions/findAlternativeSlotsOfCurrentSlots");
const goToNextSubTimetable_1 = require("../actions/goToNextSubTimetable");
const goToPreviousSubTimetable_1 = require("../actions/goToPreviousSubTimetable");
const goToRandomTimetable_1 = require("../actions/goToRandomTimetable");
const goToThisAlternativeSlot_1 = require("../actions/goToThisAlternativeSlot");
const toggleIsOpenOfSaveDialog_1 = require("../actions/toggleIsOpenOfSaveDialog");
const toggleIsOpenOfSlotsTable_1 = require("../actions/toggleIsOpenOfSlotsTable");
const toggleIsOpenOfSummary_1 = require("../actions/toggleIsOpenOfSummary");
const goToNextTimetable_1 = require("./../actions/goToNextTimetable");
const goToPrevTimetable_1 = require("./../actions/goToPrevTimetable");
const selectSlotChoice_1 = require("./../actions/selectSlotChoice");
const showAlternateSlot_1 = require("./../actions/showAlternateSlot");
const toggleSetTimeConstraintView_1 = require("./../actions/toggleSetTimeConstraintView");
const mapStateToProps = (state) => {
    const timetableListState = state.MasterStateReducer.TimetableListState;
    const index = timetableListState.CurrentIndex;
    const timetable = timetableListState.FiltrateTimetables.length > 0 ?
        timetableListState.FiltrateTimetables[index] :
        null;
    return {
        currentIndex: index,
        currentTimetable: timetable,
        currentSubIndex: timetableListState.CurrentSubIndex,
        isSummaryOpen: timetableListState.IsSummaryOpen,
        maxIndex: timetableListState.FiltrateTimetables.length - 1,
        slotViewModelStore: timetableListState.SlotViewModelStore,
        alternativeSlots: timetableListState.AlternativeSlots,
        isShowingAlternativeSlotOf: timetableListState.ShowingAlternateSlotOf
    };
};
const mapDispatchToProps = (dispatch) => {
    const triggerfulDispatch = (action) => {
        dispatch(action);
        dispatch(new findAlternativeSlotsOfCurrentSlots_1.FindAlternativeSlotsOfCurrentSlots());
    };
    return {
        handleGoToNextTimetable: () => triggerfulDispatch(new goToNextTimetable_1.GoToNextTimetable()),
        handleGoToPreviousTimetable: () => triggerfulDispatch(new goToPrevTimetable_1.GoToPrevTimetable()),
        handleGoToRandomTimetable: () => triggerfulDispatch(new goToRandomTimetable_1.GoToRandomTimetable()),
        handleGoToNextSubTimetable: () => triggerfulDispatch(new goToNextSubTimetable_1.GoToNextSubTimetable()),
        handleGoToPreviousSubTimetable: () => triggerfulDispatch(new goToPreviousSubTimetable_1.GoToPreviousSubTimetable()),
        handleOpenSaveTimetableDialog: () => dispatch(new toggleIsOpenOfSaveDialog_1.ToggleIsOpenOfSaveDialog(true)),
        handleOpenSetTimeConstraintView: () => dispatch(new toggleSetTimeConstraintView_1.ToggleSetTimeConstraintView(true)),
        handleOpenSlotsTable: () => dispatch(new toggleIsOpenOfSlotsTable_1.ToggleIsOpenOfSlotsTable(true)),
        handleToggleIsOpenOfSummary: () => dispatch(new toggleIsOpenOfSummary_1.ToggleIsOpenOfSummary()),
        handleShowAlternateSlot: (s) => dispatch(new showAlternateSlot_1.ShowAlternateSlot(s)),
        handleGoToThisAlternateSlot: (slotUid) => triggerfulDispatch(new goToThisAlternativeSlot_1.GoToThisAlternativeSlot(slotUid)),
        handleSelectSlotChoice: (slotUid, newSlotChoice) => triggerfulDispatch(new selectSlotChoice_1.SelectSlotChoice(slotUid, newSlotChoice)),
    };
};
exports.TimetableListContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(timetableListView_1.TimetableListView);
//# sourceMappingURL=timetableListContainer.js.map