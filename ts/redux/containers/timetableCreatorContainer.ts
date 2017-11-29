import {
    connect
} from "react-redux";
import {
    RawSlot
} from "../../model/rawSlot";
import ParseHtmlToRawSlot from "../../parser/parseHtmlToRawSlot";
import {
    GetTestRawSlot1
} from "../../tests/testDataGenerator";
import {
    HideSnackbar
} from "../actions/hideSnackbar";
import {
    NotifyDataLoaded
} from "../actions/notifyDataLoaded";
import {
    NotifyNumberOfRemainingTimetables
} from "../actions/notifyNumberOfRemainingTimetables";
import {
    ReformTimetablesBasedOnSpecificSlot
} from "../actions/reformTimetablesBasedOnSpecificSlot";
import {
    ToggleIsOpenOfSlotsTable
} from "../actions/toggleIsOpenOfSlotsTable";
import {
    ITimetableCreatorViewDispatchProps,
    ITimetableCreatorViewStateProps,
    TimetableCreatorView
} from "./../../react/timetableCreatorView";
import {
    SearchSubjectList
} from "./../actions/searchSubjectList";
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
    TimetableCreatorState,
    TimetableCreatorStateReducer
} from "./../reducers/timetableCreatorState";

const mapStateToProps = (state): ITimetableCreatorViewStateProps => {
    const target = state.TimetableCreatorStateReducer as TimetableCreatorState;
    return {
        isSlotLoaded: target.IsSlotLoaded,
        clashingSubjectPairs: target.SubjectListState.ClashingSubjectPairs,
        isSubjectListViewVisible: target.IsSubjectListViewVisible,
        isSlotsTableVisible: target.IsSlotsTableVisible,
        isSnackbarVisible: target.IsSnackbarVisible,
        selectedSubjects: target.SubjectListState.Subjects.filter((x) => x.IsSelected),
        slotStates: target.SubjectListState.SlotStates,
        snackbarMessage: target.SnackbarMessage,
    };
};

const mapDispatchToProps = (dispatch): ITimetableCreatorViewDispatchProps => {
    return {
        handleCloseSlotsTable: () => dispatch(new ToggleIsOpenOfSlotsTable(false).Action()),
        handleLoadDemo: (html: string) => dispatch(new NotifyDataLoaded(ParseHtmlToRawSlot(html)).Action()),
        handleSlotLoaded: (rawSlots: RawSlot[]) => dispatch(new NotifyDataLoaded(rawSlots).Action()),
        handleSlotCheckChanged: (slotId: number, checked: boolean) => {
            dispatch(new ReformTimetablesBasedOnSpecificSlot(slotId, checked).Action());
            dispatch(new NotifyNumberOfRemainingTimetables().Action());
        },
        handleSnackbarAction: () => dispatch(new HideSnackbar().Action()),
        handleToggleVisibilityOfSubjectListView: () => dispatch(new ToggleVisibilityOfSubjectListView().Action()),
    };
};

export const TimetableCreatorContainer = connect(mapStateToProps, mapDispatchToProps)(TimetableCreatorView);
