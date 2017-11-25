import {
    includes,
    reduce
} from "lodash";
import * as S from "string";
import {
    FindClashes
} from "../../clashFinder/findClashes";
import {
    Beautify
} from "../../helper";
import {
    RawSlot
} from "../../model/rawSlot";
import {
    ClashReport,
    Subject
} from "../../model/subject";
import {
    Timetable
} from "../../model/timetable";
import {
    ParseRawSlotToSlot
} from "../../parser/parseRawSlotToSlot";
import {
    ParseSlotToTinySlot
} from "../../parser/parseSlotToTinySlot";
import {
    FindTimetable
} from "../../permutator/findTimetable";
import {
    TimetableListState
} from "../reducers/timetableListState";
import {
    ISubjectListState,
    SubjectListStateAction,
    SubjectListStateReducer
} from "./../reducers/subjectListState";
import {
    ToggleSubjectListViewingOptions
} from "./toggleSubjectListViewingOption";

export class ToggleSubjectSelection extends SubjectListStateAction {
    public constructor(private subjectIndex: number) {
        super();
    }
    public TypeName(): string {
        return "toggle subject selection";
    }
    protected GenerateNewState(state: ISubjectListState): ISubjectListState {
        const newSubjects = state.Subjects.map((x) => ({ ...x }));
        const targetSubject = newSubjects[this.subjectIndex];
        if (targetSubject.ClashReport !== null) {
            return state;
        }
        return targetSubject.IsSelected ?
            DeselectSubject(targetSubject, newSubjects, state) :
            SelectSubject(targetSubject, newSubjects, state);
    }
}

export function SelectSubject(subjectToBeSelected: Subject, allSubjects: Subject[], state: ISubjectListState): ISubjectListState {
    const selectedSubjects = allSubjects.filter((x) => x.IsSelected);
    const clashReport = CheckForClashesBetween(subjectToBeSelected, selectedSubjects);
    if (clashReport) {
        subjectToBeSelected.ClashReport = clashReport;
        return {
            ...state,
            Subjects: allSubjects
        };
    }
    const timetables = FindTimetableBasedOn(selectedSubjects.concat([subjectToBeSelected]));
    if (timetables.length === 0) {
        subjectToBeSelected.ClashReport = new ClashReport("group");
        return {
            ...state,
            Subjects: allSubjects
        };
    }
    subjectToBeSelected.IsSelected = true;
    return {
        ...state,
        Subjects: allSubjects,
        TimetableListState: new TimetableListState(timetables)
    };
}

export function DeselectSubject(subjectToBeDeselected: Subject, allSubjects: Subject[], state: ISubjectListState): ISubjectListState {
    subjectToBeDeselected.IsSelected = false;
    const selectedSubjects = allSubjects.filter((x) => x.IsSelected);
    ReleaseDisabledSubjectsIfPossible(selectedSubjects, allSubjects);
    const timetables = FindTimetableBasedOn(selectedSubjects);
    const result: ISubjectListState = {
        ...state,
        Subjects: allSubjects,
        TimetableListState: new TimetableListState(timetables)
    };

    const allSubjectIsDeselected = allSubjects.every((x) => !x.IsSelected);
    const newIsShowSelectedSubjectOnly = state.IsShowingSelectedSubjectOnly && !allSubjectIsDeselected;
    const shouldToggleToShowAllSubject =
        state.IsShowingSelectedSubjectOnly && newIsShowSelectedSubjectOnly === false;
    if (shouldToggleToShowAllSubject) {
        return SubjectListStateReducer(result, new ToggleSubjectListViewingOptions().Action());
    } else {
        return result;
    }
}

export function ReleaseDisabledSubjectsIfPossible(selectedSubjects: Subject[], allSubjects: Subject[]): void {
    const disabledSubjects = allSubjects.filter((s) => s.ClashReport !== null);
    for (let i = 0; i < disabledSubjects.length; i++) {
        const s = disabledSubjects[i];
        switch (s.ClashReport.Type) {
            case "single":
                let stillGotClashes = false;
                for (let j = 0; j < selectedSubjects.length; j++) {
                    if (includes(selectedSubjects[j].ClashingCounterparts, s.Code)) {
                        s.ClashReport = new ClashReport("single", Beautify(selectedSubjects[j].Name));
                        stillGotClashes = true;
                        break;
                    }
                }
                if (!stillGotClashes) {
                    s.ClashReport = null;
                }
                break;
            case "group":
                if (FindTimetableBasedOn(selectedSubjects.concat([s])).length > 0) {
                    s.ClashReport = null;
                }
                break;
        }
    }
}

export function CheckForClashesBetween(s: Subject, subjects: Subject[]): ClashReport {
    for (let i = 0; i < subjects.length; i++) {
        for (let j = 0; j < subjects[i].ClashingCounterparts.length; j++) {
            if (s.Code === subjects[i].ClashingCounterparts[j]) {
                return new ClashReport("single", Beautify(subjects[i].Name));
            }
        }
    }
    return null;
}

export function FindTimetableBasedOn(subjects: Subject[]): Timetable[] {
    if (subjects.length === 0) {
        return [];
    }
    const slotsId = reduce(subjects, (sum, x) => sum.concat((x as Subject).SlotIds), []);
    return FindTimetable(
        ParseSlotToTinySlot(
            ParseRawSlotToSlot(
                RawSlot.GetBunch(slotsId)
            )
        )
    );
}
