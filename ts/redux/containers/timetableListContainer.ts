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
        handleGoToNext: () => dispatch(new GoToNextTimetable().Action()),
        handleGoToRandom: () => dispatch(new GoToRandomTimetable().Action()),
        handleGoToPrevious: () => dispatch(new GoToPrevTimetable().Action()),
        handleOpenSetTimeConstraintView: () => {
            dispatch(new UpdateTotalState().Action());
            dispatch(new ToggleSetTimeConstraintView(true).Action());
        },
        handleOpenSlotsTable: () => dispatch(new ToggleIsOpenOfSlotsTable(true).Action()),
        handleOpenSaveTimetableDialog: () => dispatch(new ToggleIsOpenOfSaveDialog(true).Action())
    };
};

export const TimetableListContainer = connect(mapStateToProps, mapDispatchToProps)(TimetableListView);
