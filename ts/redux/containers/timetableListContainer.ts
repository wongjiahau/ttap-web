import {connect} from "react-redux";
import {CreateGeneralizedSlots} from "../../model/generalizedSlot";
import {RawSlot} from "../../model/rawSlot";
import {ITimetableListViewDispatchProps, ITimetableListViewStateProps, TimetableListView} from "../../react/timetableListView";
import {GoToRandomTimetable} from "../actions/goToRandomTimetable";
import {ToggleIsOpenOfSaveDialog} from "../actions/toggleIsOpenOfSaveDialog";
import {ToggleIsOpenOfSlotsTable} from "../actions/toggleIsOpenOfSlotsTable";
import {ToggleIsOpenOfSummary} from "../actions/toggleIsOpenOfSummary";
import {UpdateSlotsTableState} from "../actions/updateSlotsTableState";
import {ITimetableListState} from "../reducers/timetableListState";
import {GoToNextTimetable} from "./../actions/goToNextTimetable";
import {GoToPrevTimetable} from "./../actions/goToPrevTimetable";
import {ToggleSetTimeConstraintView} from "./../actions/toggleSetTimeConstraintView";

const mapStateToProps = (state) : ITimetableListViewStateProps => {
    const timetableListState = state.MasterStateReducer.TimetableListState as ITimetableListState;
    const currentTimetable = timetableListState.FiltrateTimetables[timetableListState.CurrentIndex];
    let slots;
    if (currentTimetable) {
        slots = CreateGeneralizedSlots(RawSlot.GetBunch(currentTimetable.HashIds));
    }
    return {
        currentIndex: timetableListState.CurrentIndex,
        slots: slots ? slots : [],
        isSummaryOpen: timetableListState.IsSummaryOpen,
        maxIndex: timetableListState.FiltrateTimetables.length - 1
    };
};

const mapDispatchToProps = (dispatch) : ITimetableListViewDispatchProps => {
    return {
        handleGoToNext:                  () => dispatch(new GoToNextTimetable()),
        handleGoToPrevious:              () => dispatch(new GoToPrevTimetable()),
        handleGoToRandom:                () => dispatch(new GoToRandomTimetable()),
        handleOpenSaveTimetableDialog:   () => dispatch(new ToggleIsOpenOfSaveDialog(true)),
        handleOpenSetTimeConstraintView: () => dispatch(new ToggleSetTimeConstraintView(true)),
        handleOpenSlotsTable:            () => dispatch(new ToggleIsOpenOfSlotsTable(true)),
        handleToggleIsOpenOfSummary:     () => dispatch(new ToggleIsOpenOfSummary())
    };
};

export const TimetableListContainer = connect(mapStateToProps, mapDispatchToProps)(TimetableListView);
