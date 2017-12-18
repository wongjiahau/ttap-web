import {
    connect
} from "react-redux";
import {
    ITimetableListViewDispatchProps,
    ITimetableListViewStateProps,
    TimetableListView
} from "../../react/timetableListView";
import {
    FindTimetablesBasedOnChosenSlots
} from "../actions/findTimetablesBasedOnChosenSlots";
import {
    GoToRandomTimetable
} from "../actions/goToRandomTimetable";
import {
    NotifyIfTimetableIsFound
} from "../actions/notifyIfTimetableIsFound";
import {
    ToggleIsOpenOfSaveDialog
} from "../actions/toggleIsOpenOfSaveDialog";
import {
    ToggleIsOpenOfSBCWDialog
} from "../actions/toggleIsOpenOfSBCWDialog";
import {
    ToggleIsOpenOfSlotsTable
} from "../actions/toggleIsOpenOfSlotsTable";
import { ToggleIsOpenOfSummary } from "../actions/toggleIsOpenOfSummary";
import {
    TurnOffSBCW
} from "../actions/turnOffSBCW";
import {
    UpdateSlotsTableState
} from "../actions/updateSlotsTableState";
import {
    ISettingsState
} from "../reducers/settingsState";
import {
    ITimetableListState
} from "../reducers/timetableListState";
import {
    GoToNextTimetable
} from "./../actions/goToNextTimetable";
import {
    GoToPrevTimetable
} from "./../actions/goToPrevTimetable";
import {
    ToggleSetTimeConstraintView
} from "./../actions/toggleSetTimeConstraintView";
import {
    UpdateTotalState
} from "./../actions/updateTotalState";

const mapStateToProps = (state): ITimetableListViewStateProps => {
    const timetableListState = state.MasterStateReducer.TimetableListState as ITimetableListState;
    const settingsState = state.MasterStateReducer.SettingsState as ISettingsState;
    return {
        currentIndex:     timetableListState.CurrentIndex,
        currentTimetable: timetableListState.FiltrateTimetables[timetableListState.CurrentIndex],
        isSbcwTurnedOn:   settingsState.SearchByConsideringWeekNumber,
        isSummaryOpen:    timetableListState.IsSummaryOpen,
        maxIndex:         timetableListState.FiltrateTimetables.length - 1,

    };
};

const mapDispatchToProps = (dispatch): ITimetableListViewDispatchProps => {
    return {
        handleGoToNext:                  () => dispatch(new GoToNextTimetable()),
        handleGoToPrevious:              () => dispatch(new GoToPrevTimetable()),
        handleGoToRandom:                () => dispatch(new GoToRandomTimetable()),
        handleOpenSaveTimetableDialog:   () => dispatch(new ToggleIsOpenOfSaveDialog(true)),
        handleOpenSbcwDialog:            () => dispatch(new ToggleIsOpenOfSBCWDialog(true)),
        handleOpenSetTimeConstraintView: () => dispatch(new ToggleSetTimeConstraintView(true)),
        handleOpenSlotsTable:            () => dispatch(new ToggleIsOpenOfSlotsTable(true)),
        handleTurnOffSBCW:               () => {
            dispatch(new TurnOffSBCW());
            dispatch(new FindTimetablesBasedOnChosenSlots());
            dispatch(new UpdateTotalState());
            dispatch(new NotifyIfTimetableIsFound());
        },
        handleToggleIsOpenOfSummary: () => dispatch(new ToggleIsOpenOfSummary())
    };
};

export const TimetableListContainer = connect(mapStateToProps, mapDispatchToProps)(TimetableListView);
