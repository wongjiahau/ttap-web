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
    UpdateSaveTimetableDialogState
} from "../actions/updateSaveTimetableDialogState";
import {
    TimetableListStateAction
} from "../reducers/timetableListState";
import {
    STCBox
} from "./../../model/states/stcBox";
import {
    DefilterTimetable
} from "./../actions/defilterTimetable";
import {
    FilterTimetable
} from "./../actions/filterTimetable";
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
    UpdateSubjectListState
} from "./../actions/updateSubjectListState";
import {
    UpdateTimetableListState
} from "./../actions/updateTimetableListState";
import {
    UpdateTotalState
} from "./../actions/updateTotalState";
import {
    TimetableCreatorStateAction
} from "./../reducers/timetableCreatorState";
import {
    TimetableListState
} from "./../reducers/timetableListState";

const mapStateToProps = (state): ITimetableListViewStateProps => {
    const target = state.TimetableCreatorStateReducer.SubjectListState.TimetableListState as TimetableListState;
    return {
        currentIndex: target.CurrentIndex,
        currentTimetable: target.FiltrateTimetables[target.CurrentIndex],
        isSetTimeConstraintViewOpen: target.IsSetTimeConstraintViewOpen,
        maxIndex: target.FiltrateTimetables.length - 1,
        numberOfRemainingTimetables: target.FiltrateTimetables.length,
        numberOfRemovedTimetables: target.ResidueTimetables.length,
        totalState: target.TotalState,
    };
};

const mapDispatchToProps = (dispatch): ITimetableListViewDispatchProps => {
    return {
        handleGoToNext: () => dispatch(Wrap(new GoToNextTimetable())),
        handleGoToRandom: () => dispatch(Wrap(new GoToRandomTimetable())),
        handleGoToPrevious: () => dispatch(Wrap(new GoToPrevTimetable())),
        handleOpenSetTimeConstraintView: () => {
            dispatch(Wrap(new UpdateTotalState()));
            dispatch(Wrap(new ToggleSetTimeConstraintView(true)));
        },
        handleCloseSetTimeConstraintView: () => dispatch(Wrap(new ToggleSetTimeConstraintView(false))),
        handleSetTimeConstraintAt: (state: STCBox) => dispatch(Wrap(new FilterTimetable(state))),
        handleDesetTimeConstraintAt: (state: STCBox) => dispatch(Wrap(new DefilterTimetable(state))),
        handleOpenSaveTimetableDialog: () => dispatch(new UpdateSaveTimetableDialogState(new ToggleIsOpenOfSaveDialog(true)).Action()),
        handleOpenSlotsTable: () => dispatch(new ToggleIsOpenOfSlotsTable(true).Action())
    };
};

export const TimetableListContainer = connect(mapStateToProps, mapDispatchToProps)(TimetableListView);

const Wrap = (action: TimetableListStateAction): any => {
    return new UpdateSubjectListState(new UpdateTimetableListState(action)).Action();
};
