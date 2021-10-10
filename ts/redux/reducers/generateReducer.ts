import * as typeName from "type-name";

export function GenerateReducer<T>(
  initialState: T
): (state: any, action: any) => T {
  return (state: any = initialState, action): T => {
    if (action.hasOwnProperty("generateNewState")) {
      return action.generateNewState(state);
    }
    if ("GenerateNewState" in action) {
      return action.GenerateNewState(state);
    }
    return state;
  };
}
