"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const masterState_1 = require("../reducers/masterState");
class GoToThisAlternativeSlot extends masterState_1.MasterStateAction {
    constructor(destinationSlotUid) {
        super();
        this.destinationSlotUid = destinationSlotUid;
    }
    TypeName() { return `go to this alternate slot (uid=${this.destinationSlotUid}) `; }
    GenerateNewState(state) {
        if (state.TimetableListState.ShowingAlternateSlotOf === null) {
            return state;
        }
        const timetables = state.TimetableListState.FiltrateTimetables;
        // tslint:disable-next-line:array-type
        const indexOfPossibleDestinations = [];
        for (let i = 0; i < timetables.length; i++) {
            const t = state.TimetableListState.FiltrateTimetables[i];
            for (let j = 0; j < t.ListOfSlotUids.length; j++) {
                if (t.ListOfSlotUids[j].indexOf(this.destinationSlotUid) > -1) {
                    indexOfPossibleDestinations.push([i, j]);
                }
            }
        }
        const currentTimetable = timetables[state.TimetableListState.CurrentIndex];
        let indexOfDestinationTimetable = [state.TimetableListState.CurrentIndex, state.TimetableListState.CurrentSubIndex];
        const destinationTimetableUids = [...currentTimetable.ListOfSlotUids[state.TimetableListState.CurrentSubIndex]];
        const destinationTimetableSlotNumbers = new Set(state.TimetableListState.SlotViewModelStore.GetBunch(destinationTimetableUids).map((x) => x.SlotNumber));
        destinationTimetableSlotNumbers.delete(state.TimetableListState.ShowingAlternateSlotOf.SlotNumber);
        destinationTimetableSlotNumbers.add(state.TimetableListState.SlotViewModelStore.GetOne(this.destinationSlotUid).SlotNumber);
        for (let i = 0; i < indexOfPossibleDestinations.length; i++) {
            const dest = indexOfPossibleDestinations[i];
            const t = timetables[dest[0 /*index*/]];
            if (setEqual(destinationTimetableSlotNumbers, new Set(state.TimetableListState.SlotViewModelStore.GetBunch(t.ListOfSlotUids[dest[1 /*subindex*/]]).map((x) => x.SlotNumber)))) {
                indexOfDestinationTimetable = dest;
                break;
            }
        }
        return Object.assign({}, state, { TimetableListState: Object.assign({}, state.TimetableListState, { CurrentIndex: indexOfDestinationTimetable[0], CurrentSubIndex: indexOfDestinationTimetable[1], AlternativeSlots: [], ShowingAlternateSlotOf: null }), SnackbarState: Object.assign({}, state.SnackbarState, { IsOpen: false }) });
    }
}
exports.GoToThisAlternativeSlot = GoToThisAlternativeSlot;
function arrayEqual(xs, ys) {
    if (xs.length !== ys.length) {
        throw new Error("xs length should be equal to ys length");
    }
    else {
        for (let i = 0; i < xs.length; i++) {
            if (xs[i] !== ys[i]) {
                return false;
            }
        }
        return true;
    }
}
function setEqual(as, bs) {
    if (as.size !== bs.size) {
        return false;
    }
    for (const a of as) {
        if (!bs.has(a)) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=goToThisAlternativeSlot.js.map