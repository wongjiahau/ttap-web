import {
    connect
} from "react-redux";
import {
    HideSnackbar
} from "../actions/hideSnackbar";
import { ToggleIsOpenOfSubjectListView } from "../actions/toggleIsOpenOfSubjectListView";
import {
    ISubjectListState,
    SubjectListStateAction
} from "../reducers/subjectListState";
import {
    TimetableCreatorStateAction
} from "../reducers/timetableCreatorState";
import {
    ISubjectListViewDispatchProps,
    ISubjectListViewStateProps,
    SubjectListView
} from "./../../react/subjectListView";
import {
    NotifyIfTimetableIsFound
} from "./../actions/notifyIfTimetableIsFound";
import {
    SearchSubjectList
} from "./../actions/searchSubjectList";
import {
    ToggleLoadingBar
} from "./../actions/toggleLoadingBar";
import {
    ToggleSubjectListViewingOptions
} from "./../actions/toggleSubjectListViewingOption";
import {
    ToggleSubjectSelection
} from "./../actions/toggleSubjectSelection";

const mapStateToProps = (state): ISubjectListViewStateProps => {
    const target = state.MasterStateReducer.SubjectListState as ISubjectListState;
    return {
        clashingSubjectPairs:         target.ClashingSubjectPairs,
        isOpen:                       target.IsOpen,
        isShowingLoadingBar:          target.IsShowingLoadingBar,
        isShowingSelectedSubjectOnly: target.IsShowingSelectedSubjectOnly,
        searchWord:                   target.SearchedText,
        subjects:                     target.Subjects,
    };
};

const mapDispatchToProps = (dispatch): ISubjectListViewDispatchProps => {
    return {
        handleClose: () => {
            dispatch(new ToggleIsOpenOfSubjectListView(false));
            dispatch(new HideSnackbar());
        },
        handleSearch: (searchedText: string) => {
            dispatch(new SearchSubjectList(searchedText));
            dispatch(new HideSnackbar());
        },
        handleSelection: (subjectIndex: number) => {
            dispatch(new ToggleLoadingBar(true));
            setTimeout(() => {
                dispatch(new ToggleSubjectSelection(subjectIndex));
                dispatch(new ToggleLoadingBar(false));
                dispatch(new NotifyIfTimetableIsFound());
            }, 0);
        },
        handleToggleView: () => dispatch(new ToggleSubjectListViewingOptions())
    };
};

export const SubjectListViewContainer = connect(mapStateToProps, mapDispatchToProps)(SubjectListView);
