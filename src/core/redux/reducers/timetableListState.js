"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeName = require("type-name");
const objectStore_1 = require("../../dataStructure/objectStore");
const slotViewModel_1 = require("../../model/slotViewModel");
const action_1 = require("../actions/action");
function NewTimetableListState(groupedTimetables, selectedSlots, isSummaryOpen = true) {
    const slotVMs = slotViewModel_1.CreateSlotViewModels(selectedSlots);
    const slotStateStore = groupedTimetables.length > 0 ?
        new objectStore_1.ObjectStore(slotVMs) :
        new objectStore_1.ObjectStore([]);
    return {
        CurrentIndex: 0,
        CurrentSubIndex: 0,
        FiltrateTimetables: groupedTimetables,
        IsSummaryOpen: isSummaryOpen,
        ResidueTimetables: [],
        SlotViewModelStore: slotStateStore,
        ShowingAlternateSlotOf: null,
        UidsOfLockedSlot: []
    };
}
exports.NewTimetableListState = NewTimetableListState;
class TimetableListStateAction extends action_1.Action {
    StateName() {
        return typeName(NewTimetableListState([], []));
    }
}
exports.TimetableListStateAction = TimetableListStateAction;
//# sourceMappingURL=timetableListState.js.map