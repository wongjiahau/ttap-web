"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This class is use to generate actions
 * @export
 * @abstract
 * @class Action
 * @template T is the type of Redux State where the action will return
 */
class Action {
    Action() {
        return {
            generateNewState: this
                .GenerateNewState
                .bind(this),
            stateName: this.StateName(),
            type: this.TypeName().toUpperCase()
        };
    }
}
exports.Action = Action;
//# sourceMappingURL=action.js.map