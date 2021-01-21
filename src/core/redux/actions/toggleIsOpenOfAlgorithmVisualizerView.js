"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("./../reducers/masterState");
class ToggleIsOpenOfAlgorithmVisualizerView extends masterState_1.MasterStateAction {
    constructor(open) {
        super();
        this.open = open;
    }
    TypeName() {
        return "toggle is open of algorithm visualizer view";
    }
    GenerateNewState(state) {
        return Object.assign({}, state, { AlgorithmVisualizerState: Object.assign({}, state.AlgorithmVisualizerState, { isOpen: state.AlgorithmVisualizerState.isEnabled && this.open }) });
    }
}
exports.ToggleIsOpenOfAlgorithmVisualizerView = ToggleIsOpenOfAlgorithmVisualizerView;
//# sourceMappingURL=toggleIsOpenOfAlgorithmVisualizerView.js.map