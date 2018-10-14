import {
    connect
} from "react-redux";
import {
    ITurnOnSBCWDialogDispatchProps,
    ITurnOnSBCWDialogStateProps,
    TurnOnSBCWDialog
} from "../../react/turnOnSBCWConfirmationDialog";
import { FindAlternativeSlotsOfCurrentSlot } from "../actions/findAlternativeSlotsOfCurrentSlots";
import {
    FindTimetablesBasedOnChosenSlots
} from "../actions/findTimetablesBasedOnChosenSlots";
import {
    HideSnackbar
} from "../actions/hideSnackbar";
import {
    NotifyIfTimetableIsFound
} from "../actions/notifyIfTimetableIsFound";
import {
    ToggleIsOpenOfSBCWDialog
} from "../actions/toggleIsOpenOfSBCWDialog";
import {
    TurnOnSBCW
} from "../actions/turnOnSBCW";
import {
    UpdateSlotsTableState
} from "../actions/updateSlotsTableState";
import {
    UpdateTotalState
} from "../actions/updateTotalState";
import {
    ISBCWDialogState
} from "../reducers/sbcwDialogState";
import {
    ISnackbarState
} from "../reducers/snackbarState";

const mapStateToProps = (state): ITurnOnSBCWDialogStateProps => {
    const target = state.MasterStateReducer.SbcwDialogState as ISBCWDialogState;
    return {
        isOpen: target.IsOpen,
    };
};

const mapDispatchToProps = (dispatch): ITurnOnSBCWDialogDispatchProps => {
    return {
        handleClose: () => {
            dispatch(new ToggleIsOpenOfSBCWDialog(false));
        },
        handleTurnOn: () => {
            dispatch(new TurnOnSBCW());
            dispatch(new FindTimetablesBasedOnChosenSlots());
            dispatch(new UpdateTotalState());
            dispatch(new NotifyIfTimetableIsFound());
            dispatch(new FindAlternativeSlotsOfCurrentSlot());
        },
    };
};

export const SBCWDialogContainer = connect(mapStateToProps, mapDispatchToProps)(TurnOnSBCWDialog);
