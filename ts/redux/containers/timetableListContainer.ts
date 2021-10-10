import { connect } from "react-redux";
import {
  ITimetableListViewDispatchProps,
  ITimetableListViewStateProps,
  TimetableListView,
} from "../../react/timetableListView";
import { FindAlternativeSlotsOfCurrentSlots } from "../actions/findAlternativeSlotsOfCurrentSlots";
import { GoToNextSubTimetable } from "../actions/goToNextSubTimetable";
import { GoToPreviousSubTimetable } from "../actions/goToPreviousSubTimetable";
import { GoToRandomTimetable } from "../actions/goToRandomTimetable";
import { GoToThisAlternativeSlot } from "../actions/goToThisAlternativeSlot";
import { ToggleIsOpenOfSaveDialog } from "../actions/toggleIsOpenOfSaveDialog";
import { ToggleIsOpenOfSlotsTable } from "../actions/toggleIsOpenOfSlotsTable";
import { ToggleIsOpenOfSummary } from "../actions/toggleIsOpenOfSummary";
import { MasterStateAction } from "../reducers/masterState";
import { ITimetableListState } from "../reducers/timetableListState";
import { ISlotViewModel } from "./../../model/slotViewModel";
import { GoToNextTimetable } from "./../actions/goToNextTimetable";
import { GoToPrevTimetable } from "./../actions/goToPrevTimetable";
import { SelectSlotChoice } from "./../actions/selectSlotChoice";
import { ShowAlternateSlot } from "./../actions/showAlternateSlot";
import { ToggleSetTimeConstraintView } from "./../actions/toggleSetTimeConstraintView";

const mapStateToProps = (state: any): ITimetableListViewStateProps => {
  const timetableListState = state.MasterStateReducer
    .TimetableListState as ITimetableListState;
  const index = timetableListState.CurrentIndex;
  const timetable =
    timetableListState.FiltrateTimetables.length > 0
      ? timetableListState.FiltrateTimetables[index]
      : null;
  return {
    currentIndex: index,
    currentTimetable: timetable,
    currentSubIndex: timetableListState.CurrentSubIndex,
    isSummaryOpen: timetableListState.IsSummaryOpen,
    maxIndex: timetableListState.FiltrateTimetables.length - 1,
    slotViewModelStore: timetableListState.SlotViewModelStore,
    isShowingAlternativeSlotOf: timetableListState.ShowingAlternateSlotOf,
  };
};

const mapDispatchToProps = (dispatch: any): ITimetableListViewDispatchProps => {
  const triggerfulDispatch = (action: MasterStateAction) => {
    dispatch(action);
    dispatch(new FindAlternativeSlotsOfCurrentSlots());
  };
  return {
    handleGoToNextTimetable: () => triggerfulDispatch(new GoToNextTimetable()),
    handleGoToPreviousTimetable: () =>
      triggerfulDispatch(new GoToPrevTimetable()),
    handleGoToRandomTimetable: () =>
      triggerfulDispatch(new GoToRandomTimetable()),
    handleGoToNextSubTimetable: () =>
      triggerfulDispatch(new GoToNextSubTimetable()),
    handleGoToPreviousSubTimetable: () =>
      triggerfulDispatch(new GoToPreviousSubTimetable()),
    handleOpenSaveTimetableDialog: () =>
      dispatch(new ToggleIsOpenOfSaveDialog(true)),
    handleOpenSetTimeConstraintView: () =>
      dispatch(new ToggleSetTimeConstraintView(true)),
    handleOpenSlotsTable: () => dispatch(new ToggleIsOpenOfSlotsTable(true)),
    handleToggleIsOpenOfSummary: () => dispatch(new ToggleIsOpenOfSummary()),
    handleShowAlternateSlot: (s: ISlotViewModel) =>
      dispatch(new ShowAlternateSlot(s)),
    handleGoToThisAlternateSlot: (
      sourceSlotUid: number,
      destinationSlotUid: number
    ) =>
      triggerfulDispatch(
        new GoToThisAlternativeSlot(sourceSlotUid, destinationSlotUid)
      ),
    handleSelectSlotChoice: (slotUid: number, newSlotChoice: number) =>
      triggerfulDispatch(new SelectSlotChoice(slotUid, newSlotChoice)),
  };
};

export const TimetableListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimetableListView);
