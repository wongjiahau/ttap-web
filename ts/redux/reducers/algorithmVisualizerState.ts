export interface IAlgorithmVisualizerState {
    isOpen: boolean;
    isEnabled: boolean;
    searchedPathCount: number;
}

export function NewAlgorithmVisualizerState(): IAlgorithmVisualizerState {
    return {
        isOpen: false,
        isEnabled: false,
        searchedPathCount: 0
    };
}
