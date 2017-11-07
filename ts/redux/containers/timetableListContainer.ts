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
    GoToNextTimetable
} from "./../actions/goToNextTimetable";
import {
    GoToPrevTimetable
} from "./../actions/goToPrevTimetable";
import {
    UpdateTimetableListState
} from "./../actions/UpdateTimetableListState";

const mapStateToProps = (state): ITimetableListViewStateProps => {
    return {
        currentIndex: state.SubjectListStateReducer.TimetableListState.CurrentIndex,
        currentTimetable: state.SubjectListStateReducer.TimetableListState.CurrentTimetable,
        maxIndex: state.SubjectListStateReducer.TimetableListState.Timetables.length - 1,
    };
};

const mapDispatchToProps = (dispatch): ITimetableListViewDispatchProps => {
    return {
        handleGoToNext: () => dispatch(new UpdateTimetableListState(new GoToNextTimetable()).Action()),
        handleGoToPrevious: () => dispatch(new UpdateTimetableListState(new GoToPrevTimetable()).Action()),
        handleSave: () => {
            alert("not implemented yet");
        },
        handleSetTimeConstraint: () => {
            alert("not implemented yet");
        },
    };
};

export const TimetableListContainer = connect(mapStateToProps, mapDispatchToProps)(TimetableListView);
