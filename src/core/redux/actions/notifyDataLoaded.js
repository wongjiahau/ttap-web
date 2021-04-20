"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataRouter_1 = require("./../../dataStructure/dataRouter");
const isEqual = require("lodash.isequal");
const findClashes_1 = require("../../clashFinder/findClashes");
const objectStore_1 = require("../../dataStructure/objectStore");
const parseRawSlotToSubject_1 = require("../../parser/parseRawSlotToSubject");
const generalizeSlot_1 = require("../../permutator/generalizeSlot");
const masterState_1 = require("../reducers/masterState");
const subjectListState_1 = require("../reducers/subjectListState");
class NotifyDataLoaded extends masterState_1.MasterStateAction {
    constructor(rawSlots) {
        super();
        this.rawSlots = rawSlots;
    }
    TypeName() { return "notify data loaded"; }
    GenerateNewState(state) {
        const route = state.SettingsState.SearchByConsideringWeekNumber
            ? "ungeneralized"
            : "generalized";
        const router = new dataRouter_1.DataRouter();
        router.AddData("generalized", new objectStore_1.ObjectStore(generalizeSlot_1.GeneralizeSlot(this.rawSlots)));
        router.AddData("ungeneralized", new objectStore_1.ObjectStore(this.rawSlots));
        router.SetRouteTo(route);
        const subjects = parseRawSlotToSubject_1.ParseRawSlotToSubject(this.rawSlots);
        findClashes_1.FindClashes(subjects, router.GetCurrentData());
        return Object.assign({}, state, { DataState: {
                RawSlotDataRouter: router
            }, TimetableCreatorState: Object.assign({}, state.TimetableCreatorState, { IsSlotLoaded: true }), SubjectListState: Object.assign({}, subjectListState_1.NewSubjectListState(subjects), { IsOpen: true }) });
    }
}
exports.NotifyDataLoaded = NotifyDataLoaded;
//# sourceMappingURL=notifyDataLoaded.js.map