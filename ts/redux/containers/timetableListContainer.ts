import {connect} from "react-redux";
import {ITimetableListViewDispatchProps, ITimetableListViewStateProps, TimetableListView} from "../../react/timetableListView";
import { FindAlternativeSlotsOfCurrentSlots } from "../actions/findAlternativeSlotsOfCurrentSlots";
import { GoToNextSubTimetable } from "../actions/goToNextSubTimetable";
import { GoToPreviousSubTimetable } from "../actions/goToPreviousSubTimetable";
import {GoToRandomTimetable} from "../actions/goToRandomTimetable";
import { GoToThisAlternativeSlot } from "../actions/goToThisAlternativeSlot";
import {ToggleIsOpenOfSaveDialog} from "../actions/toggleIsOpenOfSaveDialog";
import {ToggleIsOpenOfSlotsTable} from "../actions/toggleIsOpenOfSlotsTable";
import {ToggleIsOpenOfSummary} from "../actions/toggleIsOpenOfSummary";
import { MasterStateAction } from "../reducers/masterState";
import {ITimetableListState} from "../reducers/timetableListState";
import { ISlotViewModel } from "./../../model/slotViewModel";
import {GoToNextTimetable} from "./../actions/goToNextTimetable";
import {GoToPrevTimetable} from "./../actions/goToPrevTimetable";
import {SelectSlotChoice} from "./../actions/selectSlotChoice";
import {ShowAlternateSlot} from "./../actions/showAlternateSlot";
import {ToggleSetTimeConstraintView} from "./../actions/toggleSetTimeConstraintView";

const mapStateToProps = (state: any) : ITimetableListViewStateProps => {
    const timetableListState = state.MasterStateReducer.TimetableListState as ITimetableListState;
    const index = timetableListState.CurrentIndex;
    const timetable = timetableListState.FiltrateTimetables.length > 0 ?
                             timetableListState.FiltrateTimetables[index] :
                             null;
    return {
        currentIndex:       index,
        currentTimetable:   timetable,
        currentSubIndex:    timetableListState.CurrentSubIndex,
        isSummaryOpen:      timetableListState.IsSummaryOpen,
        maxIndex:           timetableListState.FiltrateTimetables.length - 1,
        slotViewModelStore: timetableListState.SlotViewModelStore,
        alternativeSlots:   timetableListState.AlternativeSlots
    };
};

const mapDispatchToProps = (triggerlessDispatch: any) : ITimetableListViewDispatchProps => {
    const dispatch = (action: MasterStateAction) => {
        triggerlessDispatch(action);
        triggerlessDispatch(new FindAlternativeSlotsOfCurrentSlots());
    };
    return {
        handleGoToNextTimetable:         () => dispatch(new GoToNextTimetable()),
        handleGoToPreviousTimetable:     () => dispatch(new GoToPrevTimetable()),
        handleGoToRandomTimetable:       () => dispatch(new GoToRandomTimetable()),
        handleGoToNextSubTimetable:      () => dispatch(new GoToNextSubTimetable()),
        handleGoToPreviousSubTimetable:  () => dispatch(new GoToPreviousSubTimetable()),
        handleOpenSaveTimetableDialog:   () => triggerlessDispatch(new ToggleIsOpenOfSaveDialog(true)),
        handleOpenSetTimeConstraintView: () => triggerlessDispatch(new ToggleSetTimeConstraintView(true)),
        handleOpenSlotsTable:            () => triggerlessDispatch(new ToggleIsOpenOfSlotsTable(true)),
        handleToggleIsOpenOfSummary:     () => triggerlessDispatch(new ToggleIsOpenOfSummary()),
        handleShowAlternateSlot:         (s: ISlotViewModel) => triggerlessDispatch(new ShowAlternateSlot(s)),
        handleGoToThisAlternateSlot:     (slotUid: number) => dispatch(new GoToThisAlternativeSlot(slotUid)),
        handleSelectSlotChoice:          (slotUid: number, newSlotChoice : number) => dispatch(new SelectSlotChoice(slotUid, newSlotChoice)),
    };
};

export const TimetableListContainer = connect(mapStateToProps, mapDispatchToProps)(TimetableListView);
