"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = require("../../model/matrix/filter");
const generateTotalMatrix_1 = require("../../model/matrix/generateTotalMatrix");
const masterState_1 = require("./../reducers/masterState");
class FilterTimetable extends masterState_1.MasterStateAction {
    constructor(clickedState) {
        super();
        this.clickedState = clickedState;
    }
    TypeName() {
        return `filter timetable at [${this.clickedState.Uid}]`;
    }
    GenerateNewState(state) {
        const [filtrate, residue] = filter_1.Filter(state.TimetableListState.FiltrateTimetables, this.clickedState);
        const newUidsOfClickedState = state.SetTimeConstraintState.UidsOfClickedBoxes.concat(this.clickedState.Uid);
        const newClickedTimeConstraint = state.SetTimeConstraintState.ClickedTimeConstraint.slice();
        newClickedTimeConstraint[this.clickedState.Day] |= this.clickedState.TimePeriod;
        return Object.assign({}, state, { TimetableListState: Object.assign({}, state.TimetableListState, { CurrentIndex: 0, FiltrateTimetables: filtrate, ResidueTimetables: state.TimetableListState.ResidueTimetables.concat(residue) }), SetTimeConstraintState: Object.assign({}, state.SetTimeConstraintState, { TotalMatrix: generateTotalMatrix_1.GenerateTotalMatrix(filtrate, newUidsOfClickedState), UidsOfClickedBoxes: newUidsOfClickedState, ClickedTimeConstraint: newClickedTimeConstraint }) });
    }
}
exports.FilterTimetable = FilterTimetable;
//# sourceMappingURL=filterTimetable.js.map