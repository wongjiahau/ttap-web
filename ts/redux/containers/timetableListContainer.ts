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
        handleGoToNext: () => dispatch(Wrap(new GoToNextTimetable()).Action()),
        handleGoToPrevious: () => dispatch(Wrap(new GoToPrevTimetable()).Action()),
        handleSetTimeConstraint: () => {
            alert("not implemented yet");
        },
        handleSaveAsTextFile: () => {
            dispatch(Wrap(new SaveTimetableAsTextFile()).Action());
        },
        handleSaveAsPicture: () => {
            dispatch(Wrap(new SaveTimetableAsImage()).Action());
        },
        handleSaveToGoogleCalendar: () => {
            alert("not implemented yet!");
        },
        handleOpenSaveDialog: () => {
            dispatch(Wrap(new OpenSaveDialog()).Action());
        },
        handleCloseSaveDialog: () => {
            dispatch(Wrap(new CloseSaveDialog()).Action());
        }
    };
};

export const TimetableListContainer = connect(mapStateToProps, mapDispatchToProps)(TimetableListView);

const Wrap = (action: TimetableListStateAction): TimetableCreatorStateAction => {
    return new UpdateSubjectListState(new UpdateTimetableListState(action));
};
