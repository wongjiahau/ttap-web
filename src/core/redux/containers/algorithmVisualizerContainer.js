"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const algorithmVisualizerView_1 = require("../../react/algorithmVisualizerView");
const toggleIsOpenOfAlgorithmVisualizerView_1 = require("../actions/toggleIsOpenOfAlgorithmVisualizerView");
const mapStateToProps = (state) => {
    const masterState = state.MasterStateReducer;
    return {
        open: masterState.AlgorithmVisualizerState.isOpen,
        expectedHitCount: () => masterState.TimetableListState.FiltrateTimetables.map((x) => x.ListOfSlotUids.length).reduce((x, y) => x + y, 0),
        actualHitCount: masterState.AlgorithmVisualizerState.searchedPathCount,
        fullSearchPathCount: masterState.AlgorithmVisualizerState.fullSearchPathCount,
        timeTaken: masterState.AlgorithmVisualizerState.timeTaken,
        handleClearAnimation: masterState.AlgorithmVisualizerState.clearAnimation
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        handleClose: () => dispatch(new toggleIsOpenOfAlgorithmVisualizerView_1.ToggleIsOpenOfAlgorithmVisualizerView(false))
    };
};
exports.AlgorithmVisualizerViewContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(algorithmVisualizerView_1.AlgorithmVisualizerView);
//# sourceMappingURL=algorithmVisualizerContainer.js.map