import {connect} from "react-redux";
import {RawSlot} from "../../model/rawSlot";
import {CreateSlotStates} from "../../model/slotState";
import {ITimetableListViewDispatchProps, ITimetableListViewStateProps, TimetableListView} from "../../react/timetableListView";
import {GoToRandomTimetable} from "../actions/goToRandomTimetable";
import {ToggleIsOpenOfSaveDialog} from "../actions/toggleIsOpenOfSaveDialog";
import {ToggleIsOpenOfSlotsTable} from "../actions/toggleIsOpenOfSlotsTable";
import {ToggleIsOpenOfSummary} from "../actions/toggleIsOpenOfSummary";
import {UpdateSlotsTableState} from "../actions/updateSlotsTableState";
import {ITimetableListState} from "../reducers/timetableListState";
import {GoToNextTimetable} from "./../actions/goToNextTimetable";
import {GoToPrevTimetable} from "./../actions/goToPrevTimetable";
import { SelectSlotChoice } from "./../actions/selectSlotChoice";
import {ToggleSetTimeConstraintView} from "./../actions/toggleSetTimeConstraintView";

const mapStateToProps = (state) : ITimetableListViewStateProps => {
    const timetableListState = state.MasterStateReducer.TimetableListState as ITimetableListState;
    return {
        currentIndex: timetableListState.CurrentIndex,
        slots: timetableListState.AllGeneralizedSlots,
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
        handleToggleIsOpenOfSummary:     () => dispatch(new ToggleIsOpenOfSummary()),
        handleSelectSlotChoice:          (slotUid: number, newSlotChoice : number) => dispatch(new SelectSlotChoice(slotUid, newSlotChoice))
    };
};

export const TimetableListContainer = connect(mapStateToProps, mapDispatchToProps)(TimetableListView);
