import {
    connect
} from "react-redux";
import { HideSnackbar } from "../actions/hideSnackbar";
import {
    SubjectListState,
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
import {
    ToggleVisibilityOfSubjectListView
} from "./../actions/toggleVisibilityOfSubjectListView";
import {
    UpdateSubjectListState
} from "./../actions/updateSubjectListState";

const mapStateToProps = (state): ISubjectListViewStateProps => {
    const target = state.TimetableCreatorStateReducer.SubjectListState as SubjectListState;
    return {
        clashingSubjectPairs: target.ClashingSubjectPairs,
        isShowingLoadingBar: target.IsShowingLoadingBar,
        isShowingSelectedSubjectOnly: target.IsShowingSelectedSubjectOnly,
        searchWord: target.SearchedText,
        subjects: target.Subjects,
    };
};

const mapDispatchToProps = (dispatch): ISubjectListViewDispatchProps => {
    return {
        handleClose: () => dispatch(new ToggleVisibilityOfSubjectListView().Action()),
        handleSearch: (searchedText: string) => {
            dispatch(Wrap(new SearchSubjectList(searchedText)).Action());
            dispatch(new HideSnackbar().Action());
        },
        handleSelection: (subjectIndex: number) => {
            dispatch(Wrap(new ToggleLoadingBar(true)).Action());
            setTimeout(() => {
                dispatch(Wrap(new ToggleSubjectSelection(subjectIndex)).Action());
                dispatch(Wrap(new ToggleLoadingBar(false)).Action());
                dispatch(new NotifyIfTimetableIsFound().Action());
            }, 0);
        },
        handleToggleView: () => dispatch(Wrap(new ToggleSubjectListViewingOptions()).Action())
    };
};

export const SubjectListViewContainer = connect(mapStateToProps, mapDispatchToProps)(SubjectListView);

const Wrap = (action: SubjectListStateAction): TimetableCreatorStateAction => {
    return new UpdateSubjectListState(action);
};
