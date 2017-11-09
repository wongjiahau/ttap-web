import {
    connect
} from "react-redux";
import {
    HideSnackbar
} from "../actions/hideSnackbar";
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
    TimetableCreatorStateReducer
} from "./../reducers/timetableCreatorState";

const mapStateToProps = (state): ITimetableCreatorViewStateProps => {
    return {
        isSubjectListViewVisible: state.TimetableCreatorReducer.IsSubjectListViewVisible,
        isSnackbarVisible: state.TimetableCreatorReducer.isSnackbarVisible,
        snackbarMessage: state.TimetableCreatorReducer.snackbarMessage,
    };
};

const mapDispatchToProps = (dispatch): ITimetableCreatorViewDispatchProps => {
    return {
        handleSnackbarAction: () => dispatch(new HideSnackbar().Action()),
        handleToggleVisibilityOfSubjectListView: () => dispatch(new ToggleVisibilityOfSubjectListView().Action()),
    };
};

export const TimetableCreatorContainer = connect(mapStateToProps, mapDispatchToProps)(TimetableCreatorView);
