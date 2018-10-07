import {
    connect
} from "react-redux";
import { FindAlternativeSlotsOfCurrentSlot } from "../actions/findAlternativeSlotsOfCurrentSlots";
import {
    HideSnackbar
} from "../actions/hideSnackbar";
import {
    ToggleIsOpenOfSubjectListView
} from "../actions/toggleIsOpenOfSubjectListView";
import { ToggleSetTimeConstraintView } from "../actions/toggleSetTimeConstraintView";
import {
    UpdateSlotsTableState
} from "../actions/updateSlotsTableState";
import {
    UpdateTotalState
} from "../actions/updateTotalState";
import {
    ISubjectListState} from "../reducers/subjectListState";
import {
    ISubjectListViewDispatchProps,
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

const mapStateToProps = (state): ISubjectListState => {
    const target = state.MasterStateReducer.SubjectListState as ISubjectListState;
    return {
        ClashingSubjectPairs: target.ClashingSubjectPairs,
        IsOpen: target.IsOpen,
        IsShowingLoadingBar: target.IsShowingLoadingBar,
        IsShowingSelectedSubjectOnly: target.IsShowingSelectedSubjectOnly,
        SearchedText: target.SearchedText,
        Subjects: target.Subjects,
    };
};

const mapDispatchToProps = (dispatch): ISubjectListViewDispatchProps => {
    return {
        handleClose: () => {
            dispatch(new ToggleIsOpenOfSubjectListView(false));
            dispatch(new HideSnackbar());
            dispatch(new UpdateSlotsTableState());
            dispatch(new ToggleSetTimeConstraintView(true));
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
                dispatch(new UpdateTotalState());
            }, 0);
        },
        handleToggleView: () => dispatch(new ToggleSubjectListViewingOptions())
    };
};

export const SubjectListViewContainer = connect(mapStateToProps, mapDispatchToProps)(SubjectListView);
