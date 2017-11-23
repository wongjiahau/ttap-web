import {
    connect
} from "react-redux";
import {
    RawSlot
} from "../../model/rawSlot";
import {
    HideSnackbar
} from "../actions/hideSnackbar";
import {
    NotifyDataLoaded
} from "../actions/notifyDataLoaded";
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
    TimetableCreatorState,
    TimetableCreatorStateReducer
} from "./../reducers/timetableCreatorState";

const mapStateToProps = (state): ITimetableCreatorViewStateProps => {
    const target = state.TimetableCreatorStateReducer as TimetableCreatorState;
    return {
        isSlotLoaded: target.IsSlotLoaded,
        clashingSubjectPairs: target.SubjectListState.ClashingSubjectPairs,
        isSubjectListViewVisible: target.IsSubjectListViewVisible,
        isSnackbarVisible: target.IsSnackbarVisible,
        snackbarMessage: target.SnackbarMessage,
    };
};

const mapDispatchToProps = (dispatch): ITimetableCreatorViewDispatchProps => {
    return {
        handleSlotLoaded: (rawSlots: RawSlot[]) => dispatch(new NotifyDataLoaded(rawSlots).Action()),
        handleSnackbarAction: () => dispatch(new HideSnackbar().Action()),
        handleToggleVisibilityOfSubjectListView: () => dispatch(new ToggleVisibilityOfSubjectListView().Action()),
    };
};

export const TimetableCreatorContainer = connect(mapStateToProps, mapDispatchToProps)(TimetableCreatorView);
