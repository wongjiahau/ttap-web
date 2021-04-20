"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const snackbarView_1 = require("../../react/snackbarView");
const hideSnackbar_1 = require("../actions/hideSnackbar");
const mapStateToProps = (state) => {
    const target = state.MasterStateReducer.SnackbarState;
    return {
        isOpen: target.IsOpen,
        message: target.Message
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleClose: () => dispatch(new hideSnackbar_1.HideSnackbar())
    };
};
exports.SnackbarContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(snackbarView_1.SnackbarView);
//# sourceMappingURL=snackbarContainer.js.map