import {ObjectStore} from "./../../dataStructure/objectStore";
import {GetSemStartDateDialog} from "./../../react/getSemStartDateDialog";
const includes = require("lodash.includes");

import {IStringDicionary} from "../../interfaces/dictionary";
import {RawSlot} from "../../model/rawSlot";
import {ClashReport, Subject} from "../../model/subject";
import {Timetable} from "../../model/timetable";
import { FindTimetableVisualizer, NullFindTimetableVisualizer } from "../../permutator/findTimetableVisualizer";
import { BeautifySubjectName } from "../../util/beautifySubjectName";
import {NewTimetableListState} from "../reducers/timetableListState";
import {IMasterState, MasterStateAction, MasterStateReducer} from "./../reducers/masterState";
import {ToggleSubjectListViewingOptions} from "./toggleSubjectListViewingOption";
import { GroupSimilarTimetablesTogether } from "../../permutator/findTimetable";

let CurrentTimetableFinder : (rawSlots : RawSlot[]) => Timetable[];
let RawSlotStore : ObjectStore<RawSlot>;

export class ToggleSubjectSelection extends MasterStateAction {
    public constructor(private subjectIndex : number) {
        super();
    }
    public TypeName() : string {return "toggle subject selection"; }
    protected GenerateNewState(state : IMasterState) : IMasterState {
        const visualizer = state.AlgorithmVisualizerState.isEnabled ?
            new FindTimetableVisualizer() :
            new NullFindTimetableVisualizer();

        CurrentTimetableFinder = (x) => (state.SettingsState.TimetableFinder(x, visualizer));
        //    GroupSimilarTimetablesTogether(state.SettingsState.TimetableFinder(x, visualizer));

        RawSlotStore = state.DataState.RawSlotDataRouter.GetCurrentData();
        const newSubjects = state
            .SubjectListState
            .Subjects
            .map((x) => ({
                ...x
            }));
        const targetSubject = newSubjects[this.subjectIndex];
        if (targetSubject.ClashReport !== null) {
            return state;
        } else {
            const result = targetSubject.IsSelected
                ? DeselectSubject(targetSubject, newSubjects, state)
                : SelectSubject(targetSubject, newSubjects, state);
            if (state.AlgorithmVisualizerState.isEnabled) {
                visualizer.animate();
                return {
                    ...result,
                    AlgorithmVisualizerState: {
                        ...state.AlgorithmVisualizerState,
                        searchedPathCount: visualizer.getSearchedPathCount(),
                        fullSearchPathCount: visualizer.getFullSearchPathCount(),
                        timeTaken: visualizer.getTimeTakenInMillisecond(),
                        clearAnimation: visualizer.clearPreviousAnimation
                    }
                };
            } else {
                return result;
            }
        }
    }
}

export function SelectSubject(subjectToBeSelected : Subject, allSubjects : Subject[], state : IMasterState) : IMasterState {
    const selectedSubjects = allSubjects.filter((x) => x.IsSelected);
    const clashReport = CheckForClashesBetween(subjectToBeSelected, selectedSubjects);
    const result = {
        ...state,
        SubjectListState: {
            ...state.SubjectListState,
            Subjects: allSubjects
        }
    };
    if (clashReport) {
        subjectToBeSelected.ClashReport = clashReport;
        return result;
    }
    const selectedSlots = GetSelectedSlots(selectedSubjects.concat([subjectToBeSelected]));
    const timetables = CurrentTimetableFinder(selectedSlots);
    if (timetables.length === 0) {
        subjectToBeSelected.ClashReport = new ClashReport("group");
        return result;
    }
    subjectToBeSelected.IsSelected = true;
    return {
        ...result,
        TimetableListState: NewTimetableListState(timetables, selectedSlots)
    };
}

export function DeselectSubject(subjectToBeDeselected : Subject, allSubjects : Subject[], state : IMasterState) : IMasterState {
    subjectToBeDeselected.IsSelected = false;
    const selectedSubjects = allSubjects.filter((x) => x.IsSelected);
    ReleaseDisabledSubjectsIfPossible(selectedSubjects, allSubjects);
    const selectedSlots = GetSelectedSlots(selectedSubjects);
    const timetables = selectedSubjects.length > 0
        ? CurrentTimetableFinder(selectedSlots)
        : [];
    const result: IMasterState = {
        ...state,
        SubjectListState: {
            ...state.SubjectListState,
            Subjects: allSubjects
        },
        TimetableListState: NewTimetableListState(timetables, selectedSlots)
    };

    const allSubjectIsDeselected = allSubjects.every((x) => !x.IsSelected);
    const newIsShowSelectedSubjectOnly = state.SubjectListState.IsShowingSelectedSubjectOnly && !allSubjectIsDeselected;
    const shouldToggleToShowAllSubject = state.SubjectListState.IsShowingSelectedSubjectOnly && newIsShowSelectedSubjectOnly === false;
    if (shouldToggleToShowAllSubject) {
        return MasterStateReducer(result, new ToggleSubjectListViewingOptions());
    } else {
        return result;
    }
}

export function ReleaseDisabledSubjectsIfPossible(selectedSubjects : Subject[], allSubjects : Subject[]) : void {
    const disabledSubjects = allSubjects.filter((s) => s.ClashReport !== null);
    for (let i = 0; i < disabledSubjects.length; i++) {
        const s = disabledSubjects[i];
        switch (s.ClashReport.Type) {
            case "single":
                let stillGotClashes = false;
                for (let j = 0; j < selectedSubjects.length; j++) {
                    if (includes(selectedSubjects[j].ClashingCounterparts, s.Code)) {
                        s.ClashReport = new ClashReport("single", BeautifySubjectName(selectedSubjects[j].Name));
                        stillGotClashes = true;
                        break;
                    }
                }
                if (!stillGotClashes) {
                    s.ClashReport = null;
                }
                break;
            case "group":
                if (CurrentTimetableFinder(GetSelectedSlots(selectedSubjects.concat([s])), ).length > 0) {
                    s.ClashReport = null;
                }
                break;
        }
    }
}

export function CheckForClashesBetween(s : Subject, subjects : Subject[]) : ClashReport {
    for (let i = 0; i < subjects.length; i++) {
        for (let j = 0; j < subjects[i].ClashingCounterparts.length; j++) {
            if (s.Code === subjects[i].ClashingCounterparts[j]) {
                return new ClashReport("single", BeautifySubjectName(subjects[i].Name));
            }
        }
    }
    return null;
}

export function GetSelectedSlots(subjects : Subject[]) : RawSlot[] {
    if (subjects.length === 0) {
        return [];
    }
    let slotIds: number[] = [];
    for (let i = 0; i < subjects.length; i++) {
        slotIds = slotIds.concat(subjects[i].SlotUids);
    }
    const result = RawSlotStore.GetBunch(slotIds);
    return result;
}
