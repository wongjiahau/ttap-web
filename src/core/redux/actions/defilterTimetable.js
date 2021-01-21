"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defilter_1 = require("../../model/matrix/defilter");
const generateTotalMatrix_1 = require("../../model/matrix/generateTotalMatrix");
const masterState_1 = require("../reducers/masterState");
class DefilterTimetable extends masterState_1.MasterStateAction {
    constructor(clickedBox) {
        super();
        this.clickedBox = clickedBox;
    }
    TypeName() {
        return `defilter timetable at [${this.clickedBox.Uid}]`;
    }
    GenerateNewState(state) {
        const newClickedTimeConstraint = state.SetTimeConstraintState.ClickedTimeConstraint.slice();
        newClickedTimeConstraint[this.clickedBox.Day] ^= this.clickedBox.TimePeriod;
        const newUidsOfClickedBox = state.SetTimeConstraintState.UidsOfClickedBoxes
            .filter((x) => x !== this.clickedBox.Uid);
        const [rescued, unrescued] = defilter_1.Defilter(state.TimetableListState.ResidueTimetables, newClickedTimeConstraint);
        const newFiltrateTimetables = state.TimetableListState.FiltrateTimetables.concat(rescued);
        const newResidueTimetables = unrescued;
        return Object.assign({}, state, { TimetableListState: Object.assign({}, state.TimetableListState, { CurrentIndex: 0, FiltrateTimetables: newFiltrateTimetables, ResidueTimetables: newResidueTimetables }), SetTimeConstraintState: Object.assign({}, state.SetTimeConstraintState, { UidsOfClickedBoxes: newUidsOfClickedBox, TotalMatrix: generateTotalMatrix_1.GenerateTotalMatrix(newFiltrateTimetables, newUidsOfClickedBox), ClickedTimeConstraint: newClickedTimeConstraint }) });
    }
}
exports.DefilterTimetable = DefilterTimetable;
//# sourceMappingURL=defilterTimetable.js.map