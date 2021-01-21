"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const turnOnSBCWConfirmationDialog_1 = require("../../react/turnOnSBCWConfirmationDialog");
const findAlternativeSlotsOfCurrentSlots_1 = require("../actions/findAlternativeSlotsOfCurrentSlots");
const findTimetablesBasedOnChosenSlots_1 = require("../actions/findTimetablesBasedOnChosenSlots");
const notifyIfTimetableIsFound_1 = require("../actions/notifyIfTimetableIsFound");
const toggleIsOpenOfSBCWDialog_1 = require("../actions/toggleIsOpenOfSBCWDialog");
const turnOnSBCW_1 = require("../actions/turnOnSBCW");
const updateTotalMatrix_1 = require("../actions/updateTotalMatrix");
const mapStateToProps = (state) => {
    const target = state.MasterStateReducer.SbcwDialogState;
    return {
        isOpen: target.IsOpen,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleClose: () => {
            dispatch(new toggleIsOpenOfSBCWDialog_1.ToggleIsOpenOfSBCWDialog(false));
        },
        handleTurnOn: () => {
            dispatch(new turnOnSBCW_1.TurnOnSBCW());
            dispatch(new findTimetablesBasedOnChosenSlots_1.FindTimetablesBasedOnChosenSlots());
            dispatch(new updateTotalMatrix_1.UpdateTotalMatrix());
            dispatch(new notifyIfTimetableIsFound_1.NotifyIfTimetableIsFound());
            dispatch(new findAlternativeSlotsOfCurrentSlots_1.FindAlternativeSlotsOfCurrentSlots());
        },
    };
};
exports.SBCWDialogContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(turnOnSBCWConfirmationDialog_1.TurnOnSBCWDialog);
//# sourceMappingURL=turnOnSBCWDialogContainer.js.map