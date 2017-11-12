import {
    RawSlot
} from "./../../model/rawSlot";
import {
    Timetable
} from "./../../model/timetable";
import {
    FindTimetable
} from "./../../permutator/findTimetable";
import {
    TimetableListState
} from "./../reducers/timetableListState";

import {
    ParseRawSlotToSlot
} from "../../parser/parseRawSlotToSlot";
import {
    ParseSlotToTinySlot
} from "../../parser/parseSlotToTinySlot";
import {
    ISubjectListState,
    SubjectListStateAction
} from "./../reducers/subjectListState";

export class FindTimetablesBasedOnSelectedSubjects extends SubjectListStateAction {
    public constructor() {
        super();
    }
    public TypeName(): string {
        return "find timetables";
    }
    protected GenerateNewState(state: ISubjectListState): ISubjectListState {
        const selectedSubjects = state.Subjects.filter((x) => x.IsSelected);
        if (selectedSubjects.length === 0) {
            return state;
        }
        const hashIds = [].concat.apply([], selectedSubjects.map((x) => x.SlotIds));
        const rawSlots = RawSlot.GetBunch(hashIds);
        const slots = ParseRawSlotToSlot(rawSlots);
        const tinySlots = ParseSlotToTinySlot(slots);
        const timetables = FindTimetable(tinySlots);
        return {
            ...state,
            TimetableListState: new TimetableListState(timetables)
        };
    }
}
