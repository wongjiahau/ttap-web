import {has} from "lodash";
export class ReducerGenerator < T > {
    public constructor(private initialState : T) {}
    public GetReducer() : (state : any, action) => T {
        return(state : any = this.initialState, action): T => {
            if (has(action, "generateNewState")) {
                const result = action.generateNewState(state);
                return result;
            }
            return state;
        };
    }
}
