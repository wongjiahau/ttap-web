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
import {
    ToggleIsOpenOfSaveDialog
} from "../actions/toggleIsOpenOfSaveDialog";
import {
    ToggleIsOpenOfSlotsTable
} from "../actions/toggleIsOpenOfSlotsTable";
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
    const target = state.MasterStateReducer.TimetableListState as ITimetableListState;
    return {
        currentIndex: target.CurrentIndex,
        currentTimetable: target.FiltrateTimetables[target.CurrentIndex],
        maxIndex: target.FiltrateTimetables.length - 1,
    };
};

const mapDispatchToProps = (dispatch): ITimetableListViewDispatchProps => {
    return {
        handleGoToNext: () => dispatch(new GoToNextTimetable()),
        handleGoToRandom: () => dispatch(new GoToRandomTimetable()),
        handleGoToPrevious: () => dispatch(new GoToPrevTimetable()),
        handleOpenSetTimeConstraintView: () => {
            dispatch(new ToggleSetTimeConstraintView(true));
        },
        handleOpenSlotsTable: () => dispatch(new ToggleIsOpenOfSlotsTable(true)),
        handleOpenSaveTimetableDialog: () => dispatch(new ToggleIsOpenOfSaveDialog(true))
    };
};

export const TimetableListContainer = connect(mapStateToProps, mapDispatchToProps)(TimetableListView);
