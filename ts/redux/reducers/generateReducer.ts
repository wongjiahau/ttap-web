import {
    has
} from "lodash";

export function GenereteReducer < T > (initialState: T, typesOfAcceptedActions: string[]): (state: any, action) => T {
    return (state: any = initialState, action): T => {
        if (has(action, "generateNewState")) {
            if (typesOfAcceptedActions.some((type) => type === action.type)) {
                const result = action.generateNewState(state);
                return result;
            }
        }
        console.warn("Warning! The following object does not contain generateNewState() method");
        console.log(action);
        return state;
    };

}
