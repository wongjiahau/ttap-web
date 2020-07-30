"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function GenerateReducer(initialState) {
    return (state = initialState, action) => {
        if (action.hasOwnProperty("generateNewState")) {
            return action.generateNewState(state);
        }
        if ("GenerateNewState" in action) {
            return action.GenerateNewState(state);
        }
        return state;
    };
}
exports.GenerateReducer = GenerateReducer;
//# sourceMappingURL=generateReducer.js.map