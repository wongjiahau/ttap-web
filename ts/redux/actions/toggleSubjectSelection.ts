import {
    includes
} from "lodash";
import * as S from "string";
import {
    FindClashes
} from "../../clashFinder/findClashes";
import {
    Beautify
} from "../../helper";
import {
    IStringDicionary
} from "../../interfaces/dictionary";
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
    NewSlotsTableState
} from "../reducers/slotsTableState";
import {
    NewTimetableListState
} from "../reducers/timetableListState";
import {
    IMasterState,
    MasterStateAction,
    MasterStateReducer
} from "./../reducers/masterState";
import {
    ToggleSubjectListViewingOptions
} from "./toggleSubjectListViewingOption";

export class ToggleSubjectSelection extends MasterStateAction {
    public constructor(private subjectIndex: number) {
        super();
    }
    public TypeName(): string {
        return "toggle subject selection";
    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        const newSubjects = state.SubjectListState.Subjects.map((x) => ({ ...x
        }));
        const targetSubject = newSubjects[this.subjectIndex];
        if (targetSubject.ClashReport !== null) {
            return state;
        }
        return targetSubject.IsSelected ?
            DeselectSubject(targetSubject, newSubjects, state) :
            SelectSubject(targetSubject, newSubjects, state);
    }
}

export function SelectSubject(subjectToBeSelected: Subject, allSubjects: Subject[], state: IMasterState): IMasterState {
    const selectedSubjects = allSubjects.filter((x) => x.IsSelected);
    const clashReport = CheckForClashesBetween(subjectToBeSelected, selectedSubjects);
    if (clashReport) {
        subjectToBeSelected.ClashReport = clashReport;
        return {
            ...state,
            SubjectListState: {
                ...state.SubjectListState,
                Subjects: allSubjects
            }
        };
    }
    const timetables = FindTimetableBasedOn(selectedSubjects.concat([subjectToBeSelected]));
    if (timetables.length === 0) {
        subjectToBeSelected.ClashReport = new ClashReport("group");
        return {
            ...state,
            SlotTableState: {
                ...NewSlotsTableState(),
                SlotStates: GetSlotStates(selectedSubjects),
                SubjectStates: GetSubjectStates(selectedSubjects)
            },
            SubjectListState: {
                ...state.SubjectListState,
                Subjects: allSubjects
            }
        };
    }
    subjectToBeSelected.IsSelected = true;
    return {
        ...state,
        SlotTableState: {
            ...NewSlotsTableState(),
            SlotStates: GetSlotStates(selectedSubjects.concat([subjectToBeSelected])),
            SubjectStates: GetSubjectStates(selectedSubjects.concat([subjectToBeSelected]))
        },
        SubjectListState: {
            ...state.SubjectListState,
            Subjects: allSubjects,
        },
        TimetableListState: NewTimetableListState(timetables)
    };
}

export function DeselectSubject(subjectToBeDeselected: Subject, allSubjects: Subject[], state: IMasterState): IMasterState {
    subjectToBeDeselected.IsSelected = false;
    const selectedSubjects = allSubjects.filter((x) => x.IsSelected);
    ReleaseDisabledSubjectsIfPossible(selectedSubjects, allSubjects);
    const timetables = FindTimetableBasedOn(selectedSubjects);
    const result: IMasterState = {
        ...state,
        SubjectListState: {
            ...state.SubjectListState,
            Subjects: allSubjects,

        },
        SlotTableState: {
            ...NewSlotsTableState(),
            SlotStates: GetSlotStates(selectedSubjects),
            SubjectStates: GetSubjectStates(selectedSubjects)
        },
        TimetableListState: NewTimetableListState(timetables)
    };

    const allSubjectIsDeselected = allSubjects.every((x) => !x.IsSelected);
    const newIsShowSelectedSubjectOnly =
        state.SubjectListState.IsShowingSelectedSubjectOnly && !allSubjectIsDeselected;
    const shouldToggleToShowAllSubject =
        state.SubjectListState.IsShowingSelectedSubjectOnly && newIsShowSelectedSubjectOnly === false;
    if (shouldToggleToShowAllSubject) {
        return MasterStateReducer(result, new ToggleSubjectListViewingOptions());
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
    let slotIds = [];
    for (let i = 0; i < subjects.length; i++) {
        slotIds = slotIds.concat(subjects[i].SlotIds);
    }
    return FindTimetable(
        ParseSlotToTinySlot(
            ParseRawSlotToSlot(
                RawSlot.GetBunch(slotIds)
            )
        )
    );
}

export function GetSlotStates(selectedSubjects: Subject[]): IStringDicionary < boolean > {
    const result: IStringDicionary < boolean > = {};
    selectedSubjects.forEach((s) => {
        s.SlotNumbers.forEach((id) => {
            result[id] = true;
        });
    });
    return result;
}

export type Ternary = "true" | "false" | "intermediate";

export function GetSubjectStates(selectedSubjects: Subject[]): IStringDicionary < Ternary > {
    const result = {};
    selectedSubjects.forEach((s) => {
        result[s.Code] = "true";
    });
    return result;
}
