import { MasterStateAction } from "../reducers/masterState";
import { IMasterState } from "../reducers/masterState";

export class ToggleIsEnabledOfAlgorithmVisualizer extends MasterStateAction {
    public constructor(private enable ?: boolean) {
        super();
    }
    public TypeName(): string {
        return "toggle is enabled of algorithm visualizer";
    }

    protected GenerateNewState(state: IMasterState): IMasterState {
        return {
            ...state,
            AlgorithmVisualizerState: {
                ...state.AlgorithmVisualizerState,
                isEnabled: this.enable !== undefined ? this.enable : !state.AlgorithmVisualizerState.isEnabled,
            }
        };
    }

}
