"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findAlternativeSlotsOfCurrentSlots_1 = require("./../actions/findAlternativeSlotsOfCurrentSlots");
const react_redux_1 = require("react-redux");
const setTimeConstraintView_1 = require("../../react/setTimeConstraintView");
const defilterTimetable_1 = require("../actions/defilterTimetable");
const filterTimetable_1 = require("../actions/filterTimetable");
const toggleSetTimeConstraintView_1 = require("../actions/toggleSetTimeConstraintView");
const mapStateToProps = (state) => {
    const stcState = state.MasterStateReducer.SetTimeConstraintState;
    const timetableListState = state.MasterStateReducer.TimetableListState;
    return {
        isOpen: stcState.IsOpen,
        numberOfRemainingTimetables: timetableListState.FiltrateTimetables.length,
        numberOfRemovedTimetables: timetableListState.ResidueTimetables.length,
        totalMatrix: stcState.TotalMatrix
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleCancel: () => {
            dispatch(new findAlternativeSlotsOfCurrentSlots_1.FindAlternativeSlotsOfCurrentSlots());
            dispatch(new toggleSetTimeConstraintView_1.ToggleSetTimeConstraintView(false));
        },
        handleDesetTimeConstraintAt: (stcBox) => dispatch(new defilterTimetable_1.DefilterTimetable(stcBox)),
        handleSetTimeConstraintAt: (stcBox) => dispatch(new filterTimetable_1.FilterTimetable(stcBox))
    };
};
exports.SetTimeConstraintContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(setTimeConstraintView_1.SetTimeConstraintView);
//# sourceMappingURL=setTimeConstraintContainer.js.map