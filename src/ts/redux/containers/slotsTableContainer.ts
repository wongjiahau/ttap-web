import { connect } from "react-redux";
import { Subject } from "../../model/subject";
import { ToggleLoadingScreen } from "../../react/app";
import {
  ISlotsTableViewDispatchProps,
  ISlotsTableViewInternalState,
  ISlotsTableViewStateProps,
  SlotsTable,
} from "../../react/slotsTableView";
import { FindAlternativeSlotsOfCurrentSlots } from "../actions/findAlternativeSlotsOfCurrentSlots";
import { FindTimetablesBasedOnChosenSlots } from "../actions/findTimetablesBasedOnChosenSlots";
import { NotifyIfTimetableIsFound } from "../actions/notifyIfTimetableIsFound";
import { NotifyNumberOfRemainingTimetables } from "../actions/notifyNumberOfRemainingTimetables";
import { ToggleIsOpenOfSlotsTable } from "../actions/toggleIsOpenOfSlotsTable";
import { ToggleLoadingBar } from "../actions/toggleLoadingBar";
import { ToggleSelectionOnGroupOfSlots } from "../actions/toggleSelectionOnGroupOfSlots";
import { ToggleSelectionOnSpecificSlot } from "../actions/toggleSelectionOnSpecificSlot";
import { UpdateTotalMatrix } from "../actions/updateTotalMatrix";
import { IMasterState } from "../reducers/masterState";
import { ISlotsTableState } from "../reducers/slotsTableState";
import { ISubjectListState } from "../reducers/subjectListState";

const mapStateToProps = (state: any): ISlotsTableViewStateProps => {
  const slotsTableState = state.MasterStateReducer
    .SlotTableState as ISlotsTableState;
  const subjectListState = state.MasterStateReducer
    .SubjectListState as ISubjectListState;
  return {
    errorMessages: slotsTableState.ErrorMessages,
    isOpen: slotsTableState.IsOpen,
    selectedSubjects: subjectListState.Subjects.filter((s) => s.IsSelected),
    slotStates: slotsTableState.SlotStates,
    subjectStates: slotsTableState.SubjectStates,
    rawSlotStore:
      state.MasterStateReducer.DataState.RawSlotDataRouter.GetDataFrom(
        "ungeneralized"
      ),
  };
};

const mapDispatchToProps = (dispatch: any): ISlotsTableViewDispatchProps => {
  return {
    handleDone: () => {
      ToggleLoadingScreen("Finding possible timetables", () => {
        dispatch(new FindTimetablesBasedOnChosenSlots());
        dispatch(new UpdateTotalMatrix());
        dispatch(new FindAlternativeSlotsOfCurrentSlots());
      });
    },
    handleCancel: () => dispatch(new ToggleIsOpenOfSlotsTable(false)),
    handleSlotCheckChanged: (
      slotNumber: string,
      checked: boolean,
      subjectCode: string
    ) =>
      dispatch(
        new ToggleSelectionOnSpecificSlot(slotNumber, checked, subjectCode)
      ),
    handleSlotsGroupCheckChanged: (subjectCode: string) =>
      dispatch(new ToggleSelectionOnGroupOfSlots(subjectCode)),
  };
};

export const SlotsTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SlotsTable);
