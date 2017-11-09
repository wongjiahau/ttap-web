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
    TimetableListStateAction
} from "../reducers/timetableListState";
import {
    GoToNextTimetable
} from "./../actions/goToNextTimetable";
import {
    GoToPrevTimetable
} from "./../actions/goToPrevTimetable";
import {
    UpdateSubjectListState
} from "./../actions/updateSubjectListState";
import {
    UpdateTimetableListState
} from "./../actions/updateTimetableListState";
import {
    TimetableCreatorStateAction
} from "./../reducers/timetableCreatorState";

const mapStateToProps = (state): ITimetableListViewStateProps => {
    const target = state.TimetableCreatorStateReducer.SubjectListState.TimetableListState;
    return {
        currentIndex:     target.CurrentIndex,
        currentTimetable: target.CurrentTimetable,
        maxIndex:         target.Timetables.length - 1,
    };
};

const mapDispatchToProps = (dispatch): ITimetableListViewDispatchProps => {
    return {
        handleGoToNext: () => dispatch(Wrap(new GoToNextTimetable()).Action()),
        handleGoToPrevious: () => dispatch(Wrap(new GoToPrevTimetable()).Action()),
        handleSave: () => {
            alert("not implemented yet");
        },
        handleSetTimeConstraint: () => {
            alert("not implemented yet");
        },
    };
};

export const TimetableListContainer = connect(mapStateToProps, mapDispatchToProps)(TimetableListView);

const Wrap = (action: TimetableListStateAction): TimetableCreatorStateAction => {
    return new UpdateSubjectListState(new UpdateTimetableListState(action));
};
