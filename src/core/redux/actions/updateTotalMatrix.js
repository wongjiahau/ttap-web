"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateTotalMatrix_1 = require("../../model/matrix/generateTotalMatrix");
const masterState_1 = require("../reducers/masterState");
class UpdateTotalMatrix extends masterState_1.MasterStateAction {
    constructor() {
        super();
    }
    TypeName() {
        return "update total state";
    }
    GenerateNewState(state) {
        return Object.assign({}, state, { SetTimeConstraintState: Object.assign({}, state.SetTimeConstraintState, { ClickedTimeConstraint: [0, 0, 0, 0, 0, 0, 0], UidsOfClickedBoxes: [], TotalMatrix: generateTotalMatrix_1.GenerateTotalMatrix(state.TimetableListState.FiltrateTimetables, []) }) });
    }
}
exports.UpdateTotalMatrix = UpdateTotalMatrix;
//# sourceMappingURL=updateTotalMatrix.js.map