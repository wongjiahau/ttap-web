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
    Timetable
} from "../../model/timetable";
import {
    PartitionizeByKey
} from "../../permutator/partitionize";
import {
    NewTimetableListState
} from "../reducers/timetableListState";
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
        let currentSubjectSchemas: SubjectSchema[] = [];
        let newTimetables: Timetable[] = [];
        if (slotNumbersOfSelectedSlots.length > 0) {
            const rawSlots = RawSlot.GetBunchFromSlotNumbers(slotNumbersOfSelectedSlots);
            newTimetables = state.SettingsState.TimetableFinder(rawSlots);
            const slotsOfSubjects = PartitionizeByKey(rawSlots, "SubjectCode");
            currentSubjectSchemas = slotsOfSubjects.map((x) => GenerateSubjectSchema(x));
            sortBy(currentSubjectSchemas, [(o) => o.SubjectCode]);
        }

        const selectedSubjects = state.SubjectListState.Subjects.filter((s) => s.IsSelected);
        const correctSubjectSchemas = selectedSubjects.map((s) => GenerateSubjectSchema(RawSlot.GetBunch(s.SlotIds)));
        sortBy(correctSubjectSchemas, [(o) => o.SubjectCode]);

        let errorMessages: DiffReport[] = [];
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
            SnackbarState: {
                IsOpen: true,
                Message: newTimetables.length + " possible timetables found."
            },
            SlotTableState: {
                ...state.SlotTableState,
                IsOpen: false,
                ErrorMessages: null
            },
            TimetableListState: NewTimetableListState(newTimetables)
        };
    }
}
