import {
    find,
    sortBy
} from "lodash";
import {
    RawSlot
} from "../../model/rawSlot";
import {
    DiffReport,
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
        const slotTableState = state.SlotTableState;
        const slotNumbersOfSelectedSlots: string[] = [];
        for (const key in slotTableState.SlotStates) {
            if (slotTableState.SlotStates.hasOwnProperty(key)) {
                const current = slotTableState.SlotStates[key];
                if (current === true) {
                    slotNumbersOfSelectedSlots.push(key);
                }
            }
        }
        const rawSlots = RawSlot.GetBunchFromSlotNumbers(slotNumbersOfSelectedSlots);
        const newTimetables = FindTimetable(ParseSlotToTinySlot(ParseRawSlotToSlot(rawSlots)));

        const slotsOfSubjects = PartitionizeByKey(rawSlots, "SubjectCode");
        const currentSubjectSchemas = slotsOfSubjects.map((x) => GenerateSubjectSchema(x));

        const selectedSubjects = state.SubjectListState.Subjects.filter((s) => s.IsSelected);
        const correctSubjectSchemas = selectedSubjects.map((s) => GenerateSubjectSchema(RawSlot.GetBunch(s.SlotIds)));
        sortBy(correctSubjectSchemas, [(o) => o.SubjectCode]);
        sortBy(currentSubjectSchemas, [(o) => o.SubjectCode]);

        let errorMessages : DiffReport[] = [];
        correctSubjectSchemas.forEach((s) => {
            let matchingSchema = find(currentSubjectSchemas, {
                SubjectCode: s.SubjectCode
            });
            if (matchingSchema === undefined) {
                matchingSchema = new SubjectSchema(false, false, false, s.SubjectCode);
            }
            const diff = GetDiff(s, matchingSchema);
            if (diff) {
                errorMessages = errorMessages.concat(diff);
            }
        });
        if (errorMessages.length === 0) { // if schema is tolerated
            // check if any timetables can be found based on currently selected slots
            if (newTimetables.length === 0) {
                errorMessages.push(new DiffReport("", "no possible timetables found"));
            }
        }
        if (errorMessages.length > 0) {
            return {
                ...state,
                SlotTableState: {
                    ...state.SlotTableState,
                    ErrorMessages: errorMessages
                }
            };
        }
        return {
            ...state,
            SlotTableState: {
                ...state.SlotTableState,
                ErrorMessages: null
            },
            TimetableListState: {
                ...state.TimetableListState,
                FiltrateTimetables: newTimetables,
                ResidueTimetables: []
            }
        };
    }
}
