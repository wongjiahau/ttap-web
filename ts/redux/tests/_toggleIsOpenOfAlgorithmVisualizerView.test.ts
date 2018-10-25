import {expect} from "chai";
import {MasterStateReducer, NewMasterState} from "./../reducers/masterState";
import { ToggleIsOpenOfAlgorithmVisualizerView } from "../actions/toggleIsOpenOfAlgorithmVisualizerView";
import { ToggleIsEnabledOfAlgorithmVisualizer } from "../actions/toggleIsEnabledOfAlgorithmVisualizer";
describe("ToggleIsOpenOfAlgorithmVisualizerView action", () => {
    it("'s typename should be 'toggle is open of algorithm visualizer view'", () => {
        const action = new ToggleIsOpenOfAlgorithmVisualizerView(true);
        expect(action.TypeName()).to.eq("toggle is open of algorithm visualizer view");
    });

    it("can only open the view if Algorithm Visualizer is enabled", () => {
        const initialState = NewMasterState();
        expect(initialState.AlgorithmVisualizerState.isEnabled).to.eq(false);
        const newState = MasterStateReducer(initialState, new ToggleIsOpenOfAlgorithmVisualizerView(true));
        expect(newState.AlgorithmVisualizerState.isOpen).to.eq(false);
        const newState1 = MasterStateReducer(initialState, new ToggleIsEnabledOfAlgorithmVisualizer());
        expect(newState1.AlgorithmVisualizerState.isEnabled).to.eq(true);
        const newState2 = MasterStateReducer(newState1, new ToggleIsOpenOfAlgorithmVisualizerView(true));
        expect(newState2.AlgorithmVisualizerState.isOpen).to.eq(true);
    });

    it("should set IsOpen to false if passed in false", () => {
        const initialState = NewMasterState();
        const newState1 = MasterStateReducer(initialState, new ToggleIsEnabledOfAlgorithmVisualizer());
        expect(newState1.AlgorithmVisualizerState.isEnabled).to.eq(true);
        const newState2 = MasterStateReducer(newState1, new ToggleIsOpenOfAlgorithmVisualizerView(true));
        expect(newState2.AlgorithmVisualizerState.isOpen).to.eq(true);
        const newState3 = MasterStateReducer(newState2, new ToggleIsOpenOfAlgorithmVisualizerView(false));
        expect(newState3.AlgorithmVisualizerState.isOpen).to.eq(false);
    });

});
