"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const includes = require("lodash.includes");
const subject_1 = require("../../model/subject");
const findTimetableVisualizer_1 = require("../../permutator/findTimetableVisualizer");
const groupSimilarTimetables_1 = require("../../permutator/groupSimilarTimetables");
const beautifySubjectName_1 = require("../../util/beautifySubjectName");
const timetableListState_1 = require("../reducers/timetableListState");
const masterState_1 = require("./../reducers/masterState");
const toggleSubjectListViewingOption_1 = require("./toggleSubjectListViewingOption");
let CurrentTimetableFinder;
let RawSlotStore;
class ToggleSubjectSelection extends masterState_1.MasterStateAction {
    constructor(subjectIndex) {
        super();
        this.subjectIndex = subjectIndex;
    }
    TypeName() { return "toggle subject selection"; }
    GenerateNewState(state) {
        const visualizer = state.AlgorithmVisualizerState.isEnabled ?
            new findTimetableVisualizer_1.FindTimetableVisualizer() :
            new findTimetableVisualizer_1.NullFindTimetableVisualizer();
        CurrentTimetableFinder = (x) => state.SettingsState.TimetableFinder(x, state.SettingsState.DisableClashChecking, visualizer);
        RawSlotStore = state.DataState.RawSlotDataRouter.GetCurrentData();
        const newSubjects = state
            .SubjectListState
            .Subjects
            .map((x) => (Object.assign({}, x)));
        const targetSubject = newSubjects[this.subjectIndex];
        if (targetSubject.ClashReport !== null) {
            return state;
        }
        else {
            const result = targetSubject.IsSelected
                ? DeselectSubject(targetSubject, newSubjects, state)
                : SelectSubject(targetSubject, newSubjects, state);
            if (state.AlgorithmVisualizerState.isEnabled) {
                visualizer.animate();
                return Object.assign({}, result, { AlgorithmVisualizerState: Object.assign({}, state.AlgorithmVisualizerState, { searchedPathCount: visualizer.getSearchedPathCount(), fullSearchPathCount: visualizer.getFullSearchPathCount(), timeTaken: visualizer.getTimeTakenInMillisecond(), clearAnimation: visualizer.clearPreviousAnimation }) });
            }
            else {
                return result;
            }
        }
    }
}
exports.ToggleSubjectSelection = ToggleSubjectSelection;
function SelectSubject(subjectToBeSelected, allSubjects, state) {
    const selectedSubjects = allSubjects.filter((x) => x.IsSelected);
    const clashReport = CheckForClashesBetween(subjectToBeSelected, selectedSubjects);
    const result = Object.assign({}, state, { SubjectListState: Object.assign({}, state.SubjectListState, { Subjects: allSubjects }) });
    if (clashReport) {
        subjectToBeSelected.ClashReport = clashReport;
        return result;
    }
    const selectedSlots = GetSelectedSlots(selectedSubjects.concat([subjectToBeSelected]));
    const timetables = CurrentTimetableFinder(selectedSlots);
    if (timetables.length === 0) {
        subjectToBeSelected.ClashReport = new subject_1.ClashReport("group");
        return result;
    }
    subjectToBeSelected.IsSelected = true;
    return Object.assign({}, result, { TimetableListState: timetableListState_1.NewTimetableListState(groupSimilarTimetables_1.GroupSimilarTimetables(timetables), selectedSlots) });
}
exports.SelectSubject = SelectSubject;
function DeselectSubject(subjectToBeDeselected, allSubjects, state) {
    subjectToBeDeselected.IsSelected = false;
    const selectedSubjects = allSubjects.filter((x) => x.IsSelected);
    ReleaseDisabledSubjectsIfPossible(selectedSubjects, allSubjects);
    const selectedSlots = GetSelectedSlots(selectedSubjects);
    const timetables = selectedSubjects.length > 0
        ? CurrentTimetableFinder(selectedSlots)
        : [];
    const result = Object.assign({}, state, { SubjectListState: Object.assign({}, state.SubjectListState, { Subjects: allSubjects }), TimetableListState: timetableListState_1.NewTimetableListState(groupSimilarTimetables_1.GroupSimilarTimetables(timetables), selectedSlots) });
    const allSubjectIsDeselected = allSubjects.every((x) => !x.IsSelected);
    const newIsShowSelectedSubjectOnly = state.SubjectListState.IsShowingSelectedSubjectOnly && !allSubjectIsDeselected;
    const shouldToggleToShowAllSubject = state.SubjectListState.IsShowingSelectedSubjectOnly && newIsShowSelectedSubjectOnly === false;
    if (shouldToggleToShowAllSubject) {
        return masterState_1.MasterStateReducer(result, new toggleSubjectListViewingOption_1.ToggleSubjectListViewingOptions());
    }
    else {
        return result;
    }
}
exports.DeselectSubject = DeselectSubject;
function ReleaseDisabledSubjectsIfPossible(selectedSubjects, allSubjects) {
    const disabledSubjects = allSubjects.filter((s) => s.ClashReport !== null);
    for (let i = 0; i < disabledSubjects.length; i++) {
        const s = disabledSubjects[i];
        if (s.ClashReport === null) {
            continue;
        }
        switch (s.ClashReport.Type) {
            case "single":
                let stillGotClashes = false;
                for (let j = 0; j < selectedSubjects.length; j++) {
                    if (includes(selectedSubjects[j].ClashingCounterparts, s.Code)) {
                        s.ClashReport = new subject_1.ClashReport("single", beautifySubjectName_1.BeautifySubjectName(selectedSubjects[j].Name));
                        stillGotClashes = true;
                        break;
                    }
                }
                if (!stillGotClashes) {
                    s.ClashReport = null;
                }
                break;
            case "group":
                if (CurrentTimetableFinder(GetSelectedSlots(selectedSubjects.concat([s]))).length > 0) {
                    s.ClashReport = null;
                }
                break;
        }
    }
}
exports.ReleaseDisabledSubjectsIfPossible = ReleaseDisabledSubjectsIfPossible;
function CheckForClashesBetween(s, subjects) {
    for (let i = 0; i < subjects.length; i++) {
        for (let j = 0; j < subjects[i].ClashingCounterparts.length; j++) {
            if (s.Code === subjects[i].ClashingCounterparts[j]) {
                return new subject_1.ClashReport("single", beautifySubjectName_1.BeautifySubjectName(subjects[i].Name));
            }
        }
    }
    return null;
}
exports.CheckForClashesBetween = CheckForClashesBetween;
function GetSelectedSlots(subjects) {
    if (subjects.length === 0) {
        return [];
    }
    let slotIds = [];
    for (let i = 0; i < subjects.length; i++) {
        slotIds = slotIds.concat(subjects[i].SlotUids);
    }
    const result = RawSlotStore.GetBunch(slotIds);
    return result;
}
exports.GetSelectedSlots = GetSelectedSlots;
//# sourceMappingURL=toggleSubjectSelection.js.map