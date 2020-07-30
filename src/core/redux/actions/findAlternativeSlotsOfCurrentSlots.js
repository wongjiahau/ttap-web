"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const day_1 = require("../../att/day");
const timePeriod_1 = require("../../att/timePeriod");
const week_1 = require("../../att/week");
const objectStore_1 = require("../../dataStructure/objectStore");
const slot_1 = require("../../model/slot");
const slotViewModel_1 = require("../../model/slotViewModel");
const bigSlot_1 = require("../../permutator/bigSlot");
const matrix_1 = require("../../permutator/matrix");
const masterState_1 = require("../reducers/masterState");
/**
 * CurrentSlots means the slots that are being displayed at the moment.
 * So, this function is to search for all the alternative slots for each CurrentSlots
 * Note, this function did not use map/filter/reduce, because it needs a very high performance,
 *  as this function is invoked whenver user are browsing through timetables
 */
class FindAlternativeSlotsOfCurrentSlots extends masterState_1.MasterStateAction {
    TypeName() { return "go to next timetable"; }
    GenerateNewState(state) {
        const allSlots = state.DataState.RawSlotDataRouter.GetCurrentData().GetAll();
        const uidsOfFiltratedSlots = new Set();
        // filtrated means not being removed, it also means the slots of of those currently selected subjects
        for (let i = 0; i < state.TimetableListState.FiltrateTimetables.length; i++) {
            const t = state.TimetableListState.FiltrateTimetables[i];
            for (let j = 0; j < t.ListOfSlotUids[0].length; j++) {
                uidsOfFiltratedSlots.add(t.ListOfSlotUids[0][j]);
            }
        }
        // get the state of the current timetable
        // Why not use currentTimetable.State? because it is already compressed (means only contain data for 1 week)
        const currentSlots = state.TimetableListState.SlotViewModelStore.GetAll();
        const currentTimetable = state.TimetableListState.FiltrateTimetables[state.TimetableListState.CurrentIndex];
        const currentTimetableState = (() => {
            let result = [];
            for (let i = 0; i < currentSlots.length; i++) {
                const x = currentSlots[i];
                if (currentTimetable.ListOfSlotUids[0].indexOf(x.Uid) > -1) {
                    result = matrix_1.AppendMatrix(bigSlot_1.GetDayTimeMatrixOfBigSlot(day_1.ParseDay(x.Day), week_1.Week.Parse(x.WeekNumber[0]).BinaryData, timePeriod_1.TimePeriod.Parse(x.TimePeriod).BinaryData), result);
                }
            }
            return result;
        })();
        for (let i = 0; i < currentSlots.length; i++) {
            const targetSlot = currentSlots[i];
            let alternativeSlots = (() => {
                // alternativeSlots are slots that have the same SubjectCode and same Type but different UID
                // with the targetSlot
                // alternativeSlots are also those that do not clashes with the current timetable (that are displayed at that moment)
                const result = [];
                for (let j = 0; j < allSlots.length; j++) {
                    const x = allSlots[j];
                    if (x.Uid !== targetSlot.Uid
                        && uidsOfFiltratedSlots.has(x.Uid)
                        && x.SubjectCode === targetSlot.SubjectCode
                        && x.Type === targetSlot.Type
                        && !matrix_1.GotIntersection(currentTimetableState, bigSlot_1.newBigSlot(slot_1.CreateSlotFromRaw(x)).DayTimeMatrix)) {
                        const temp = slotViewModel_1.CreateSlotViewModel(x);
                        temp.IsAlternativeSlot = true;
                        result.push(temp);
                    }
                }
                return result;
            })();
            // The following code is to patch issue #101
            // Refer https://github.com/wongjiahau/ttap-web/issues/101
            const numberOfSiblingSlots = currentSlots
                .filter((x) => x.SlotNumber === targetSlot.SlotNumber && /*but*/ x.Uid !== targetSlot.Uid).length;
            if (numberOfSiblingSlots > 0) {
                alternativeSlots = alternativeSlots
                    .sort((x, y) => x.SlotNumber > y.SlotNumber ? 1 : 0)
                    .filter(((x) => alternativeSlots
                    .filter((y) => y.SlotNumber === x.SlotNumber).length - 1 === numberOfSiblingSlots));
            }
            // end of patch
            targetSlot.AlternativeSlots = alternativeSlots;
        }
        return Object.assign({}, state, { TimetableListState: Object.assign({}, state.TimetableListState, { SlotViewModelStore: new objectStore_1.ObjectStore(currentSlots) }) });
    }
}
exports.FindAlternativeSlotsOfCurrentSlots = FindAlternativeSlotsOfCurrentSlots;
//# sourceMappingURL=findAlternativeSlotsOfCurrentSlots.js.map