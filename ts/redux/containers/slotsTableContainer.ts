import {
    connect
} from "react-redux";
import {
    ISlotsTableViewDispatchProps,
    ISlotsTableViewInternalState,
    ISlotsTableViewStateProps,
    SlotsTable
} from "../../react/slotsTableView";
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
    ISlotsTableState
} from "../reducers/slotsTableState";
import {
    ISubjectListState
} from "../reducers/subjectListState";

const mapStateToProps = (state): ISlotsTableViewStateProps => {
    const slotsTableState = state.MasterStateReducer.SlotTableState as ISlotsTableState;
    const subjectListState = state.MasterStateReducer.SubjectListState as ISubjectListState;
    return {
        isOpen: slotsTableState.IsOpen,
        selectedSubjects: subjectListState.Subjects.filter((s) => s.IsSelected),
        slotStates: slotsTableState.SlotStates
    };
};

const mapDispatchToProps = (dispatch): ISlotsTableViewDispatchProps => {
    return {
        handleClose: () => dispatch(new ToggleIsOpenOfSlotsTable(false).Action()),
        handleSlotCheckChanged: (slotId: number, checked: boolean) => {
            dispatch(new ReformTimetablesBasedOnSpecificSlot(slotId, checked).Action());
            dispatch(new NotifyNumberOfRemainingTimetables().Action());
        }
    };
};

export const SlotsTableContainer = connect(mapStateToProps, mapDispatchToProps)(SlotsTable);
