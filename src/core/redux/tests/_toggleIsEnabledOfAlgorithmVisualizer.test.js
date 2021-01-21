"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const masterState_1 = require("./../reducers/masterState");
const toggleIsEnabledOfAlgorithmVisualizer_1 = require("../actions/toggleIsEnabledOfAlgorithmVisualizer");
describe("ToggleIsOpenOfSummary action", () => {
    it("'s typename should be 'toggle is enabled of algorithm visualizer'", () => {
        const action = new toggleIsEnabledOfAlgorithmVisualizer_1.ToggleIsEnabledOfAlgorithmVisualizer();
        chai_1.expect(action.TypeName()).to.eq("toggle is enabled of algorithm visualizer");
    });
    it("should toggle IsEnabled if pass in nothing", () => {
        const initialState = masterState_1.NewMasterState();
        chai_1.expect(initialState.AlgorithmVisualizerState.isEnabled).to.eq(false);
        const newState = masterState_1.MasterStateReducer(initialState, new toggleIsEnabledOfAlgorithmVisualizer_1.ToggleIsEnabledOfAlgorithmVisualizer());
        chai_1.expect(newState.AlgorithmVisualizerState.isEnabled).to.eq(true);
        const newState1 = masterState_1.MasterStateReducer(newState, new toggleIsEnabledOfAlgorithmVisualizer_1.ToggleIsEnabledOfAlgorithmVisualizer());
        chai_1.expect(newState1.AlgorithmVisualizerState.isEnabled).to.eq(false);
    });
    it("should set IsEnabled to true if passed in true", () => {
        const initialState = masterState_1.NewMasterState();
        let newState = masterState_1.MasterStateReducer(initialState, new toggleIsEnabledOfAlgorithmVisualizer_1.ToggleIsEnabledOfAlgorithmVisualizer(true));
        chai_1.expect(newState.AlgorithmVisualizerState.isEnabled).to.eq(true);
    });
    it("should set IsEnabled to false if passed in false", () => {
        const initialState = masterState_1.NewMasterState();
        let newState = masterState_1.MasterStateReducer(initialState, new toggleIsEnabledOfAlgorithmVisualizer_1.ToggleIsEnabledOfAlgorithmVisualizer(true));
        chai_1.expect(newState.AlgorithmVisualizerState.isEnabled).to.eq(true);
        newState = masterState_1.MasterStateReducer(newState, new toggleIsEnabledOfAlgorithmVisualizer_1.ToggleIsEnabledOfAlgorithmVisualizer(false));
        chai_1.expect(newState.AlgorithmVisualizerState.isEnabled).to.eq(false);
        newState = masterState_1.MasterStateReducer(newState, new toggleIsEnabledOfAlgorithmVisualizer_1.ToggleIsEnabledOfAlgorithmVisualizer(false));
        chai_1.expect(newState.AlgorithmVisualizerState.isEnabled).to.eq(false);
    });
});
//# sourceMappingURL=_toggleIsEnabledOfAlgorithmVisualizer.test.js.map