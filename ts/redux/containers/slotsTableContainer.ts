import {
    connect
} from "react-redux";
import {
    Subject
} from "../../model/subject";
import {
    ISlotsTableViewDispatchProps,
    ISlotsTableViewInternalState,
    ISlotsTableViewStateProps,
    SlotsTable
} from "../../react/slotsTableView";
import {
    FindTimetablesBasedOnChosenSlots
} from "../actions/findTimetablesBasedOnChosenSlots";
import {
    NotifyIfTimetableIsFound
} from "../actions/notifyIfTimetableIsFound";
import {
    NotifyNumberOfRemainingTimetables
} from "../actions/notifyNumberOfRemainingTimetables";
import {
    ToggleIsOpenOfSlotsTable
} from "../actions/toggleIsOpenOfSlotsTable";
import {
    ToggleSelectionOnGroupOfSlots
} from "../actions/toggleSelectionOnGroupOfSlots";
import {
    ToggleSelectionOnSpecificSlot
} from "../actions/toggleSelectionOnSpecificSlot";
import {
    UpdateTotalState
} from "../actions/updateTotalState";
import { IMasterState } from "../reducers/masterState";
import {
    ISlotsTableState
} from "../reducers/slotsTableState";
import {
    ISubjectListState
} from "../reducers/subjectListState";
import { FindAlternativeSlotsOfCurrentSlot } from "../actions/findAlternativeSlotsOfCurrentSlots";

const mapStateToProps = (state): ISlotsTableViewStateProps => {
    const slotsTableState = state.MasterStateReducer.SlotTableState as ISlotsTableState;
    const subjectListState = state.MasterStateReducer.SubjectListState as ISubjectListState;
    return {
        errorMessages:    slotsTableState.ErrorMessages,
        isOpen:           slotsTableState.IsOpen,
        selectedSubjects: subjectListState.Subjects.filter((s) => s.IsSelected),
        slotStates:       slotsTableState.SlotStates,
        subjectStates:    slotsTableState.SubjectStates,
        rawSlotStore:     state.MasterStateReducer.DataState.RawSlotDataRouter.GetDataFrom("ungeneralized")
    };
};

const mapDispatchToProps = (dispatch): ISlotsTableViewDispatchProps => {
    return {
        handleDone: () => {
            dispatch(new FindTimetablesBasedOnChosenSlots());
            dispatch(new UpdateTotalState());
            dispatch(new FindAlternativeSlotsOfCurrentSlot());
        },
        handleCancel: () => dispatch(new ToggleIsOpenOfSlotsTable(false)),
        handleSlotCheckChanged: (slotNumber: string, checked: boolean, subjectCode: string) =>
        dispatch(new ToggleSelectionOnSpecificSlot(slotNumber, checked, subjectCode)),
        handleSlotsGroupCheckChanged: (subjectCode: string) =>
        dispatch(new ToggleSelectionOnGroupOfSlots(subjectCode))
    };
};

export const SlotsTableContainer = connect(mapStateToProps, mapDispatchToProps)(SlotsTable);
