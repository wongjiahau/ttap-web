import {
    connect
} from "react-redux";
import {
    ITurnOnSBCWDialogDispatchProps,
    ITurnOnSBCWDialogStateProps,
    TurnOnSBCWDialog
} from "../../react/turnOnSBCWConfirmationDialog";
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
        handleClose: () => dispatch(new ToggleIsOpenOfSBCWDialog(false)),
        handleTurnOn: () => {
            dispatch(new TurnOnSBCW());
            dispatch(new NotifyIfTimetableIsFound());
        },
    };
};

export const SBCWDialogContainer = connect(mapStateToProps, mapDispatchToProps)(TurnOnSBCWDialog);
