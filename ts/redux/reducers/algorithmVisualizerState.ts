export interface IAlgorithmVisualizerState {
    isOpen: boolean;
    isEnabled: boolean;
}

export function NewAlgorithmVisualizerState(): IAlgorithmVisualizerState {
    return {
        isOpen: false,
        isEnabled: false
    };
}