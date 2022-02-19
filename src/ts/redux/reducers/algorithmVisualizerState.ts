export interface IAlgorithmVisualizerState {
  isOpen: boolean;
  isEnabled: boolean;
  searchedPathCount: number;
  fullSearchPathCount: number;
  timeTaken: number;
  clearAnimation: () => void;
}

export function NewAlgorithmVisualizerState(): IAlgorithmVisualizerState {
  return {
    isOpen: false,
    isEnabled: false,
    searchedPathCount: 0,
    fullSearchPathCount: 0,
    timeTaken: 0,
    clearAnimation: () => {
      /* do nothing */
    },
  };
}
