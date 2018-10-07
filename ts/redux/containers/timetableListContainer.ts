import {connect} from "react-redux";
import {ITimetableListViewDispatchProps, ITimetableListViewStateProps, TimetableListView} from "../../react/timetableListView";
import { FindAlternativeSlotsOfCurrentSlot } from "../actions/findAlternativeSlotsOfCurrentSlots";
import {GoToRandomTimetable} from "../actions/goToRandomTimetable";
import {ToggleIsOpenOfSaveDialog} from "../actions/toggleIsOpenOfSaveDialog";
import {ToggleIsOpenOfSlotsTable} from "../actions/toggleIsOpenOfSlotsTable";
import {ToggleIsOpenOfSummary} from "../actions/toggleIsOpenOfSummary";
import { MasterStateAction } from "../reducers/masterState";
import {ITimetableListState} from "../reducers/timetableListState";
import { ISlotViewModel } from "./../../model/slotViewModel";
import {GoToNextTimetable} from "./../actions/goToNextTimetable";
import {GoToPrevTimetable} from "./../actions/goToPrevTimetable";
import { GoToThisAlternateSlot } from "./../actions/goToThisAlternateSlot";
import {SelectSlotChoice} from "./../actions/selectSlotChoice";
import {ShowAlternateSlot} from "./../actions/showAlternateSlot";
import {ToggleSetTimeConstraintView} from "./../actions/toggleSetTimeConstraintView";

const mapStateToProps = (state) : ITimetableListViewStateProps => {
    const timetableListState = state.MasterStateReducer.TimetableListState as ITimetableListState;
    const index = timetableListState.CurrentIndex;
    const timetable = timetableListState.FiltrateTimetables.length > 0 ?
                             timetableListState.FiltrateTimetables[index] :
                             null;
    return {
        currentIndex:       index,
        currentTimetable:   timetable,
        isSummaryOpen:      timetableListState.IsSummaryOpen,
        maxIndex:           timetableListState.FiltrateTimetables.length - 1,
        slotViewModelStore: timetableListState.SlotViewModelStore,
        alternateSlots:     timetableListState.AlternateSlots
    };
};

const mapDispatchToProps = (primitiveDispatch) : ITimetableListViewDispatchProps => {
    const dispatch = (action: MasterStateAction) => {
        primitiveDispatch(action);
        primitiveDispatch(new FindAlternativeSlotsOfCurrentSlot());
    };
    return {
        handleGoToNext:                  () => dispatch(new GoToNextTimetable()),
        handleGoToPrevious:              () => dispatch(new GoToPrevTimetable()),
        handleGoToRandom:                () => dispatch(new GoToRandomTimetable()),
        handleOpenSaveTimetableDialog:   () => dispatch(new ToggleIsOpenOfSaveDialog(true)),
        handleOpenSetTimeConstraintView: () => dispatch(new ToggleSetTimeConstraintView(true)),
        handleOpenSlotsTable:            () => dispatch(new ToggleIsOpenOfSlotsTable(true)),
        handleToggleIsOpenOfSummary:     () => dispatch(new ToggleIsOpenOfSummary()),
        handleShowAlternateSlot:         (s: ISlotViewModel) => dispatch(new ShowAlternateSlot(s)),
        handleGoToThisAlternateSlot:     (slotUid: number) => dispatch(new GoToThisAlternateSlot(slotUid)),
        handleSelectSlotChoice:          (slotUid: number, newSlotChoice : number) => dispatch(new SelectSlotChoice(slotUid, newSlotChoice)),
    };
};

export const TimetableListContainer = connect(mapStateToProps, mapDispatchToProps)(TimetableListView);
