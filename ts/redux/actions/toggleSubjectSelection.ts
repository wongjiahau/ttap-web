import {
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
    ClashReport, Subject
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
import { TimetableListState } from "../reducers/timetableListState";
import {
    ISubjectListState,
    SubjectListStateAction,
    SubjectListStateReducer
} from "./../reducers/subjectListState";
import {
    ToggleSubjectListViewingOptions
} from "./toggleSubjectListViewingOption";

export class ToggleSubjectSelection extends SubjectListStateAction {
    public constructor(private subjectCode: string) {
        super();
    }
    public TypeName(): string {
        return "toggle subject selection";
    }
    protected GenerateNewState(state: ISubjectListState): ISubjectListState {
        const newSubjects = state.Subjects.map((x) => ({ ...x }));
        const targetSubject = newSubjects.filter((x) => x.Code === this.subjectCode)[0];
        if (targetSubject.IsSelected) {
            return DeselectSubject(targetSubject, newSubjects, state);
        } else {
            return SelectSubject(targetSubject, newSubjects, state);
        }
    }
}

export function SelectSubject(subjectToBeSelected: Subject, newSubjects: Subject[], state: ISubjectListState) : ISubjectListState {

        const selectedSubjects = newSubjects.filter((x) => x.IsSelected);
        const clashReport = CheckForClashesBetween(subjectToBeSelected, selectedSubjects);
        if (clashReport) {
            subjectToBeSelected.ClashReport = clashReport;
            return {
                ...state,
                Subjects: newSubjects
            };
        }
        const timetables = FindTimetableBasedOn(selectedSubjects.concat([subjectToBeSelected]));
        if (timetables.length === 0) {
            FindClashes(selectedSubjects.concat([subjectToBeSelected]));
            const clashReportz = CheckForClashesBetween(subjectToBeSelected, selectedSubjects);
            subjectToBeSelected.ClashReport = clashReportz ? clashReportz : new ClashReport("group");
            return {
                ...state,
                Subjects: newSubjects
            };
        }

        subjectToBeSelected.IsSelected = true;

        const result: ISubjectListState = {
            ...state,
            Subjects: newSubjects,
            TimetableListState: new TimetableListState(timetables)
        };
        const allSubjectIsDeselected = newSubjects.every((x) => !x.IsSelected);
        const newIsShowSelectedSubjectOnly = state.IsShowingSelectedSubjectOnly && !allSubjectIsDeselected;
        const shouldToggleToShowAllSubject =
            state.IsShowingSelectedSubjectOnly && newIsShowSelectedSubjectOnly === false;
        if (shouldToggleToShowAllSubject) {
            return SubjectListStateReducer(result, new ToggleSubjectListViewingOptions().Action());

        } else {
            return result;
        }
}

export function DeselectSubject(subjectToBeDeselected: Subject, allSubjects: Subject[], state: ISubjectListState) : ISubjectListState {

}

export function CheckForClashesBetween(s: Subject, subjects: Subject[]): ClashReport{
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
    const slotsId = reduce(subjects, (sum, x) => sum.concat((x as Subject).SlotIds), []);
    return FindTimetable(
        ParseSlotToTinySlot(
            ParseRawSlotToSlot(
                RawSlot.GetBunch(slotsId)
            )
        )
    );
}
