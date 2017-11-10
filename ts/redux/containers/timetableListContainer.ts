import {
    expect
} from "chai";
import {
    connect
} from "react-redux";
import {
    ITimetableListViewDispatchProps,
    ITimetableListViewStateProps,
    TimetableListView
} from "../../react/timetableListView";
import {
    SaveTimetableAsImage
} from "../actions/saveTimetable/saveTimetableAsImage";
import {
    SaveTimetableAsTextFile
} from "../actions/saveTimetable/saveTimetableAsTextFile";
import {
    TimetableListStateAction
} from "../reducers/timetableListState";
import {
    CloseSaveDialog
} from "./../actions/closeSaveDialog";
import {
    GoToNextTimetable
} from "./../actions/goToNextTimetable";
import {
    GoToPrevTimetable
} from "./../actions/goToPrevTimetable";
import {
    OpenSaveDialog
} from "./../actions/openSaveDialog";
import {
    SaveTimetableAsGoogleCalendar
} from "./../actions/saveTimetable/saveTimetableAsGoogleCalendar";
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
    TimetableCreatorStateAction
} from "./../reducers/timetableCreatorState";
import {
    TimetableListState
} from "./../reducers/timetableListState";

const mapStateToProps = (state): ITimetableListViewStateProps => {
    const target = state.TimetableCreatorStateReducer.SubjectListState.TimetableListState as TimetableListState;
    return {
        isSaveDialogOpen: target.IsSaveDialogOpen,
        currentIndex: target.CurrentIndex,
        currentTimetable: target.CurrentTimetable,
        maxIndex: target.Timetables.length - 1,
    };
};

const mapDispatchToProps = (dispatch): ITimetableListViewDispatchProps => {
    return {
        handleGoToNext: () => dispatch(Wrap(new GoToNextTimetable())),
        handleGoToPrevious: () => dispatch(Wrap(new GoToPrevTimetable())),
        handleSetTimeConstraint: () => {
            dispatch(new ToggleSetTimeConstraintView(true).Action());
        },
        handleSaveAsTextFile: () => {
            dispatch(Wrap(new SaveTimetableAsTextFile()));
        },
        handleSaveAsPicture: () => {
            dispatch(Wrap(new SaveTimetableAsImage()));
        },
        handleSaveToGoogleCalendar: () => {
            dispatch(Wrap(new SaveTimetableAsGoogleCalendar()));
        },
        handleOpenSaveDialog: () => {
            dispatch(Wrap(new OpenSaveDialog()));
        },
        handleCloseSaveDialog: () => {
            dispatch(Wrap(new CloseSaveDialog()));
        }
    };
};

export const TimetableListContainer = connect(mapStateToProps, mapDispatchToProps)(TimetableListView);

const Wrap = (action: TimetableListStateAction): any => {
    return new UpdateSubjectListState(new UpdateTimetableListState(action)).Action();
};
