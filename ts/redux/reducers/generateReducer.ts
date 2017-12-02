import {has} from "lodash";

import * as typeName from "type-name";

export function GenerateReducer < T > (initialState : T) : (state : any, action) => T {
    return(state : any = initialState, action): T => {
        if (!has(action, "generateNewState")) {
            return state;
        }
        if (typeName(initialState) !== action.stateName) {
            return state;
        }
        return action.generateNewState(state);
    };
}
