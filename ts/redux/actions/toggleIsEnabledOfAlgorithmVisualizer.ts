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
        const isEnabled = this.enable !== undefined ? this.enable : !state.AlgorithmVisualizerState.isEnabled;
        return {
            ...state,
            AlgorithmVisualizerState: {
                ...state.AlgorithmVisualizerState,
                isEnabled: isEnabled
            },
            SnackbarState: {
                ...state.SnackbarState,
                Message: `Visualization is ${isEnabled ? "enabled" : "disabled"}.`,
                IsOpen: true
            }
        };
    }

}
