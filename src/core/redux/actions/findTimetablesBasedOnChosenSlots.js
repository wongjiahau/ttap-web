"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const find = require("lodash.find");
const sortBy = require("lodash.sortby");
const subjectSchema_1 = require("../../model/subjectSchema");
const findTimetableVisualizer_1 = require("../../permutator/findTimetableVisualizer");
const groupSimilarTimetables_1 = require("../../permutator/groupSimilarTimetables");
const partitionize_1 = require("../../permutator/partitionize");
const timetableListState_1 = require("../reducers/timetableListState");
const masterState_1 = require("./../reducers/masterState");
class FindTimetablesBasedOnChosenSlots extends masterState_1.MasterStateAction {
    constructor() {
        super();
    }
    TypeName() { return "find timetables based on chosen slots"; }
    GenerateNewState(state) {
        const slotStore = state.DataState.RawSlotDataRouter.GetDataFrom("ungeneralized");
        const slotTableState = state.SlotTableState;
        const slotNumbersOfSelectedSlots = GetSlotNumbers(slotTableState.SlotStates);
        let currentSubjectSchemas = [];
        let newTimetables = [];
        let selectedSlots = [];
        if (slotNumbersOfSelectedSlots.length > 0) {
            selectedSlots = GetSlotsFromSlotNumbers(slotStore.GetAll(), slotNumbersOfSelectedSlots);
            newTimetables = groupSimilarTimetables_1.GroupSimilarTimetables(state.SettingsState.TimetableFinder(selectedSlots, state.SettingsState.DisableClashChecking, new findTimetableVisualizer_1.NullFindTimetableVisualizer()));
            const slotsOfSubjects = partitionize_1.PartitionizeByKey(selectedSlots, "SubjectCode");
            currentSubjectSchemas = slotsOfSubjects.map((x) => subjectSchema_1.GenerateSubjectSchema(x));
            sortBy(currentSubjectSchemas, [(o) => o.SubjectCode]);
        }
        const selectedSubjects = state.SubjectListState.Subjects.filter((s) => s.IsSelected);
        const correctSubjectSchemas = selectedSubjects.map((s) => subjectSchema_1.GenerateSubjectSchema(slotStore.GetBunch(s.SlotUids)));
        sortBy(correctSubjectSchemas, [(o) => o.SubjectCode]);
        let errorMessages = [];
        correctSubjectSchemas.forEach((s) => {
            let matchingSchema = find(currentSubjectSchemas, { SubjectCode: s.SubjectCode });
            if (matchingSchema === undefined) {
                matchingSchema = new subjectSchema_1.SubjectSchema(false, false, false, s.SubjectCode);
            }
            const diff = subjectSchema_1.GetDiff(s, matchingSchema);
            if (diff.length > 0) {
                errorMessages = errorMessages.concat(diff);
            }
        });
        if (errorMessages.length === 0) { // if schema is tolerated
            // check if any timetables can be found based on currently selected slots
            if (newTimetables.length === 0) {
                errorMessages.push(new subjectSchema_1.DiffReport("", "no possible timetables found"));
            }
        }
        if (errorMessages.length > 0) {
            return Object.assign({}, state, { SlotTableState: Object.assign({}, state.SlotTableState, { ErrorMessages: errorMessages }) });
        }
        return Object.assign({}, state, { SnackbarState: {
                IsOpen: true,
                Message: newTimetables.length + " possible timetables found."
            }, SlotTableState: Object.assign({}, state.SlotTableState, { IsOpen: false, ErrorMessages: null }), TimetableListState: timetableListState_1.NewTimetableListState((newTimetables), selectedSlots) });
    }
}
exports.FindTimetablesBasedOnChosenSlots = FindTimetablesBasedOnChosenSlots;
function GetSlotsFromSlotNumbers(allSlots, slotNumbers) {
    let result = [];
    slotNumbers.forEach((num) => {
        result = result.concat(allSlots.filter((x) => x.Number === num));
    });
    return result;
}
exports.GetSlotsFromSlotNumbers = GetSlotsFromSlotNumbers;
function GetSlotNumbers(slotState) {
    const result = [];
    for (const key in slotState) {
        if (slotState.hasOwnProperty(key)) {
            const current = slotState[key];
            if (current === true) {
                result.push(key);
            }
        }
    }
    return result;
}
exports.GetSlotNumbers = GetSlotNumbers;
//# sourceMappingURL=findTimetablesBasedOnChosenSlots.js.map