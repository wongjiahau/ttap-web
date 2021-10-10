import { IMasterState, MasterStateAction } from "./../reducers/masterState";
export class ToggleIsOpenOfAlgorithmVisualizerView extends MasterStateAction {
  public constructor(private open: boolean) {
    super();
  }
  public TypeName(): string {
    return "toggle is open of algorithm visualizer view";
  }
  protected GenerateNewState(state: IMasterState): IMasterState {
    return {
      ...state,
      AlgorithmVisualizerState: {
        ...state.AlgorithmVisualizerState,
        isOpen: state.AlgorithmVisualizerState.isEnabled && this.open,
      },
    };
  }
}
