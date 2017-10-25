import {has} from "lodash";

export function GenereteReducer < T > (initialState : T) : (state : any, action) => T {
    return(state : any = initialState, action): T => {
        if (has(action, "generateNewState")) {
            const result = action.generateNewState(state);
            return result;
        }
        console.warn("Warning! The following object does not contain generateNewState() method");
        console.log(action);
        return state;
    };

}
