import {
    connect
} from "react-redux";
import {
    ITimetableListViewDispatchProps,
    ITimetableListViewStateProps,
    TimetableListView
} from "../../react/timetableListView";
import {
    GoToRandomTimetable
} from "../actions/goToRandomTimetable";
import { NotifyIfTimetableIsFound } from "../actions/notifyIfTimetableIsFound";
import {
    ToggleIsOpenOfSaveDialog
} from "../actions/toggleIsOpenOfSaveDialog";
import {
    ToggleIsOpenOfSBCWDialog
} from "../actions/toggleIsOpenOfSBCWDialog";
import {
    ToggleIsOpenOfSlotsTable
} from "../actions/toggleIsOpenOfSlotsTable";
import {
    TurnOffSBCW
} from "../actions/turnOffSBCW";
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
    const timetableListStae = state.MasterStateReducer.TimetableListState as ITimetableListState;
    const settingsState = state.MasterStateReducer.SettingsState as ISettingsState;
    return {
        currentIndex:     timetableListStae.CurrentIndex,
        currentTimetable: timetableListStae.FiltrateTimetables[timetableListStae.CurrentIndex],
        isSbcwTurnedOn:   settingsState.SearchByConsideringWeekNumber,
        maxIndex:         timetableListStae.FiltrateTimetables.length - 1,
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
            dispatch(new NotifyIfTimetableIsFound());
        }
    };
};

export const TimetableListContainer = connect(mapStateToProps, mapDispatchToProps)(TimetableListView);
