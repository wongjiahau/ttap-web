"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const random = require("lodash.random");
const masterState_1 = require("./../reducers/masterState");
class GoToRandomTimetable extends masterState_1.MasterStateAction {
    constructor() {
        super();
    }
    TypeName() {
        return "go to random timetable";
    }
    GenerateNewState(state) {
        const length = state.TimetableListState.FiltrateTimetables.length;
        if (length === 1) {
            return state;
        }
        const getRandom = () => random(0, length - 1);
        let x = getRandom();
        while (x === state.TimetableListState.CurrentIndex) {
            x = getRandom();
        }
        return Object.assign({}, state, { TimetableListState: Object.assign({}, state.TimetableListState, { CurrentIndex: x, CurrentSubIndex: 0, AlternativeSlots: [] }) });
    }
}
exports.GoToRandomTimetable = GoToRandomTimetable;
//# sourceMappingURL=goToRandomTimetable.js.map