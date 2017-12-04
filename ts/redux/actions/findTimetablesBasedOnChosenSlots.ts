import {
    find,
    sortBy
} from "lodash";
import {
    RawSlot
} from "../../model/rawSlot";
import {
    GenerateSubjectSchema,
    GetDiff,
    SubjectSchema
} from "../../model/subjectSchema";
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
    PartitionizeByKey
} from "../../permutator/partitionize";
import {
    IMasterState,
    MasterStateAction
} from "./../reducers/masterState";

export class FindTimetablesBasedOnChosenSlots extends MasterStateAction {
    public constructor() {
        super();
    }
    public TypeName(): string {
        return "find timetables based on chosen slots";
    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        const slotsTableState = state.SlotTableState;
        const idsOfSelectedSlots = [];
        for (let i = 0; i < slotsTableState.SlotStates.length; i++) {
            const current = slotsTableState.SlotStates[i];
            if (current === true) {
                idsOfSelectedSlots.push(i);
            }
        }
        const rawSlots = RawSlot.GetBunch(idsOfSelectedSlots);
        const newTimetables = FindTimetable(ParseSlotToTinySlot(ParseRawSlotToSlot(rawSlots)));

        const slotsOfSubjects = PartitionizeByKey(rawSlots, "SubjectCode");
        const currentSubjectSchemas = slotsOfSubjects.map((x) => GenerateSubjectSchema(x));

        const selectedSubjects = state.SubjectListState.Subjects.filter((s) => s.IsSelected);
        const correctSubjectSchemas = selectedSubjects.map((s) => GenerateSubjectSchema(RawSlot.GetBunch(s.SlotIds)));
        sortBy(correctSubjectSchemas, [(o) => o.SubjectCode]);
        sortBy(currentSubjectSchemas, [(o) => o.SubjectCode]);

        let errorMessages = [];
        correctSubjectSchemas.forEach((s) => {
            let matchingSchema = find(currentSubjectSchemas, {SubjectCode: s.SubjectCode});
            if (matchingSchema === undefined) {
                matchingSchema = new SubjectSchema(false, false, false, s.SubjectCode);
            }
            const diff = GetDiff(s, matchingSchema);
            if (diff) {
                errorMessages = errorMessages.concat(diff);
            }
        });

        return {
            ...state,
            SlotTableState: {
                ...state.SlotTableState,
                ErrorMessages: errorMessages
            },
            TimetableListState: {
                ...state.TimetableListState,
                FiltrateTimetables: newTimetables,
                ResidueTimetables: []
            }
        };
    }
}
