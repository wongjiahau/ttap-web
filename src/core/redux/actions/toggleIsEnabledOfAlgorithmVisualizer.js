"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("../reducers/masterState");
class ToggleIsEnabledOfAlgorithmVisualizer extends masterState_1.MasterStateAction {
    constructor(enable) {
        super();
        this.enable = enable;
    }
    TypeName() {
        return "toggle is enabled of algorithm visualizer";
    }
    GenerateNewState(state) {
        const isEnabled = this.enable !== undefined ? this.enable : !state.AlgorithmVisualizerState.isEnabled;
        return Object.assign({}, state, { AlgorithmVisualizerState: Object.assign({}, state.AlgorithmVisualizerState, { isEnabled: isEnabled }), SnackbarState: Object.assign({}, state.SnackbarState, { Message: `Visualization is ${isEnabled ? "enabled" : "disabled"}.`, IsOpen: true }) });
    }
}
exports.ToggleIsEnabledOfAlgorithmVisualizer = ToggleIsEnabledOfAlgorithmVisualizer;
//# sourceMappingURL=toggleIsEnabledOfAlgorithmVisualizer.js.map