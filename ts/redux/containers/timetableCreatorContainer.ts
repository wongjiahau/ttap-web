import { connect } from "react-redux";
import { RawSlot } from "../../model/rawSlot";
import ParseHtmlToRawSlot from "../../parser/parseHtmlToRawSlot";
import { ITimetableCreatorViewDispatchProps, ITimetableCreatorViewStateProps, TimetableCreatorView } from "../../react/timetableCreatorView";
import { FindTimetablesBasedOnChosenSlots } from "../actions/findTimetablesBasedOnChosenSlots";
import { NotifyDataLoaded } from "../actions/notifyDataLoaded";
import { NotifyIfTimetableIsFound } from "../actions/notifyIfTimetableIsFound";
import { SearchSubjectList } from "../actions/searchSubjectList";
import { ToggleIsOpenOfSBCWDialog } from "../actions/toggleIsOpenOfSBCWDialog";
import { ToggleIsOpenOfSubjectListView } from "../actions/toggleIsOpenOfSubjectListView";
import { TurnOffSBCW } from "../actions/turnOffSBCW";
import { ISettingsState } from "../reducers/settingsState";
import { ITimetableCreatorState } from "../reducers/timetableCreatorState";
import { UpdateTotalMatrix } from "../actions/updateTotalMatrix";

const mapStateToProps = (state: any): ITimetableCreatorViewStateProps => {
    const target = state.MasterStateReducer.TimetableCreatorState as ITimetableCreatorState;
    const settingsState = state.MasterStateReducer.SettingsState as ISettingsState;
    return {
        isSbcwTurnedOn:   settingsState.SearchByConsideringWeekNumber,
        isSlotLoaded: target.IsSlotLoaded,
    };
};

const mapDispatchToProps = (dispatch: any): ITimetableCreatorViewDispatchProps => {
    return {
        handleSlotLoaded: (rawSlots: RawSlot[]) => dispatch(new NotifyDataLoaded(rawSlots)),
        handleOpenSubjectListView: () => {
            dispatch(new ToggleIsOpenOfSubjectListView(true));
            dispatch(new SearchSubjectList(""));
        },
        handleOpenSbcwDialog:            () => dispatch(new ToggleIsOpenOfSBCWDialog(true)),
        handleTurnOffSBCW:               () => {
            dispatch(new TurnOffSBCW());
            dispatch(new FindTimetablesBasedOnChosenSlots());
            dispatch(new UpdateTotalMatrix());
            dispatch(new NotifyIfTimetableIsFound());
        },
    };
};

export const TimetableCreatorContainer = connect(mapStateToProps, mapDispatchToProps)(TimetableCreatorView);
