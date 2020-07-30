"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function NewSetTimeConstraintState(totalState) {
    return {
        ClickedTimeConstraint: [0, 0, 0, 0, 0, 0, 0],
        IsOpen: false,
        TotalMatrix: totalState,
        UidsOfClickedBoxes: []
    };
}
exports.NewSetTimeConstraintState = NewSetTimeConstraintState;
//# sourceMappingURL=setTimeConstraintState.js.map