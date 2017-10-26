import {
    connect
} from "react-redux";
import {
    ITimetableCreatorViewDispatchProps,
    ITimetableCreatorViewStateProps,
    TimetableCreatorView
} from "./../../react/timetableCreatorView";
import {
    SearchSubjectList
} from "./../actions/searchSubjectList";
import {
    SelectSubject
} from "./../actions/selectSubject";
import {
    ToggleSubjectListViewingOptions
} from "./../actions/toggleSubjectListViewingOption";
import {
    ToggleVisibilityOfSubjectListView
} from "./../actions/toggleVisibilityOfSubjectListView";
import {
    TimetableCreatorReducer
} from "./../reducers/timetableCreatorState";

const mapStateToProps = (state): ITimetableCreatorViewStateProps => {
    return {
        isSubjectListViewVisible: state.TimetableCreatorReducer.IsSubjectListViewVisible,
    };
};

const mapDispatchToProps = (dispatch): ITimetableCreatorViewDispatchProps => {
    return {
        handleToggleVisibilityOfSubjectListView: () => dispatch(new ToggleVisibilityOfSubjectListView().Action())
    };
};

export const TimetableCreatorContainer = connect(mapStateToProps, mapDispatchToProps)(TimetableCreatorView);
