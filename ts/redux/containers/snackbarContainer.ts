import {
    connect
} from "react-redux";
import {
    ISnackbarViewDispatchProps,
    ISnackbarViewStateProps,
    SnackbarView
} from "../../react/snackbarView";
import {
    HideSnackbar
} from "../actions/hideSnackbar";
import {
    ISnackbarState
} from "../reducers/snackbarState";

const mapStateToProps = (state): ISnackbarViewStateProps => {
    const target = state.MasterStateReducer.SnackbarState as ISnackbarState;
    return {
        isOpen: target.IsOpen,
        message: target.Message
    };
};

const mapDispatchToProps = (dispatch): ISnackbarViewDispatchProps => {
    return {
        handleClose: () => dispatch(new HideSnackbar())
    };
};

export const SnackbarContainer = connect(mapStateToProps, mapDispatchToProps)(SnackbarView);
