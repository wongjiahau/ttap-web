"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const masterState_1 = require("./../reducers/masterState");
const toggleIsOpenOfAlgorithmVisualizerView_1 = require("../actions/toggleIsOpenOfAlgorithmVisualizerView");
const toggleIsEnabledOfAlgorithmVisualizer_1 = require("../actions/toggleIsEnabledOfAlgorithmVisualizer");
describe("ToggleIsOpenOfAlgorithmVisualizerView action", () => {
    it("'s typename should be 'toggle is open of algorithm visualizer view'", () => {
        const action = new toggleIsOpenOfAlgorithmVisualizerView_1.ToggleIsOpenOfAlgorithmVisualizerView(true);
        chai_1.expect(action.TypeName()).to.eq("toggle is open of algorithm visualizer view");
    });
    it("can only open the view if Algorithm Visualizer is enabled", () => {
        const initialState = masterState_1.NewMasterState();
        chai_1.expect(initialState.AlgorithmVisualizerState.isEnabled).to.eq(false);
        const newState = masterState_1.MasterStateReducer(initialState, new toggleIsOpenOfAlgorithmVisualizerView_1.ToggleIsOpenOfAlgorithmVisualizerView(true));
        chai_1.expect(newState.AlgorithmVisualizerState.isOpen).to.eq(false);
        const newState1 = masterState_1.MasterStateReducer(initialState, new toggleIsEnabledOfAlgorithmVisualizer_1.ToggleIsEnabledOfAlgorithmVisualizer());
        chai_1.expect(newState1.AlgorithmVisualizerState.isEnabled).to.eq(true);
        const newState2 = masterState_1.MasterStateReducer(newState1, new toggleIsOpenOfAlgorithmVisualizerView_1.ToggleIsOpenOfAlgorithmVisualizerView(true));
        chai_1.expect(newState2.AlgorithmVisualizerState.isOpen).to.eq(true);
    });
    it("should set IsOpen to false if passed in false", () => {
        const initialState = masterState_1.NewMasterState();
        const newState1 = masterState_1.MasterStateReducer(initialState, new toggleIsEnabledOfAlgorithmVisualizer_1.ToggleIsEnabledOfAlgorithmVisualizer());
        chai_1.expect(newState1.AlgorithmVisualizerState.isEnabled).to.eq(true);
        const newState2 = masterState_1.MasterStateReducer(newState1, new toggleIsOpenOfAlgorithmVisualizerView_1.ToggleIsOpenOfAlgorithmVisualizerView(true));
        chai_1.expect(newState2.AlgorithmVisualizerState.isOpen).to.eq(true);
        const newState3 = masterState_1.MasterStateReducer(newState2, new toggleIsOpenOfAlgorithmVisualizerView_1.ToggleIsOpenOfAlgorithmVisualizerView(false));
        chai_1.expect(newState3.AlgorithmVisualizerState.isOpen).to.eq(false);
    });
});
//# sourceMappingURL=_toggleIsOpenOfAlgorithmVisualizerView.test.js.map