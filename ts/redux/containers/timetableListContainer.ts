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

const mapStateToProps = (state): ITimetableListViewStateProps => {
    return {
        currentIndex: state.TimetableListReducer.CurrentIndex,
        currentTimetable: state.TimetableListReducer.CurrentTimetable,
        maxIndex: state.TimetableListReducer.Timetables.length - 1,
    };
};

const mapDispatchToProps = (dispatch): ITimetableListViewDispatchProps => {
    return {
        handleGoToNext: ()  => dispatch(new GoToNextTimetable().Action()),
        handleGoToPrevious: ()  => dispatch(new GoToPrevTimetable().Action()),
        handleSave: () => {
            alert("not implemented yet");
        },
        handleSetTimeConstraint: () => {
            alert("not implemented yet");
        },
    };
};

export const TimetableListContainer = connect(mapStateToProps, mapDispatchToProps)(TimetableListView);
