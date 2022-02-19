import { expect } from "chai";
import { MasterStateReducer, NewMasterState } from "./../reducers/masterState";
import { ToggleIsEnabledOfAlgorithmVisualizer } from "../actions/toggleIsEnabledOfAlgorithmVisualizer";
describe("ToggleIsOpenOfSummary action", () => {
  it("'s typename should be 'toggle is enabled of algorithm visualizer'", () => {
    const action = new ToggleIsEnabledOfAlgorithmVisualizer();
    expect(action.TypeName()).to.eq(
      "toggle is enabled of algorithm visualizer"
    );
  });

  it("should toggle IsEnabled if pass in nothing", () => {
    const initialState = NewMasterState();
    expect(initialState.AlgorithmVisualizerState.isEnabled).to.eq(false);
    const newState = MasterStateReducer(
      initialState,
      new ToggleIsEnabledOfAlgorithmVisualizer()
    );
    expect(newState.AlgorithmVisualizerState.isEnabled).to.eq(true);
    const newState1 = MasterStateReducer(
      newState,
      new ToggleIsEnabledOfAlgorithmVisualizer()
    );
    expect(newState1.AlgorithmVisualizerState.isEnabled).to.eq(false);
  });

  it("should set IsEnabled to true if passed in true", () => {
    const initialState = NewMasterState();
    let newState = MasterStateReducer(
      initialState,
      new ToggleIsEnabledOfAlgorithmVisualizer(true)
    );
    expect(newState.AlgorithmVisualizerState.isEnabled).to.eq(true);
  });

  it("should set IsEnabled to false if passed in false", () => {
    const initialState = NewMasterState();
    let newState = MasterStateReducer(
      initialState,
      new ToggleIsEnabledOfAlgorithmVisualizer(true)
    );
    expect(newState.AlgorithmVisualizerState.isEnabled).to.eq(true);
    newState = MasterStateReducer(
      newState,
      new ToggleIsEnabledOfAlgorithmVisualizer(false)
    );
    expect(newState.AlgorithmVisualizerState.isEnabled).to.eq(false);
    newState = MasterStateReducer(
      newState,
      new ToggleIsEnabledOfAlgorithmVisualizer(false)
    );
    expect(newState.AlgorithmVisualizerState.isEnabled).to.eq(false);
  });
});
