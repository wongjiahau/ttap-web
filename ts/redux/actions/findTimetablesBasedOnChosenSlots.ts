const find = require("lodash.find");
const sortBy = require("lodash.sortby");
import {RawSlot} from "../../model/rawSlot";
import {DiffReport, GenerateSubjectSchema, GetDiff, SubjectSchema} from "../../model/subjectSchema";
import {Timetable} from "../../model/timetable";
import {PartitionizeByKey} from "../../permutator/partitionize";
import {NewTimetableListState} from "../reducers/timetableListState";
import {IMasterState, MasterStateAction} from "./../reducers/masterState";

export class FindTimetablesBasedOnChosenSlots extends MasterStateAction {
    public constructor() {
        super();
    }
    public TypeName() : string {return "find timetables based on chosen slots"; }
    protected GenerateNewState(state : IMasterState) : IMasterState {
        const slotStore = state
            .DataState
            .RawSlotDataRouter
            .GetDataFrom("ungeneralized");
        const slotTableState = state.SlotTableState;
        const slotNumbersOfSelectedSlots = GetSlotNumbers(slotTableState.SlotStates);
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
        let selectedSlots: RawSlot[];
        if (slotNumbersOfSelectedSlots.length > 0) {
            selectedSlots = GetSlotsFromSlotNumbers(slotStore.GetAll(), slotNumbersOfSelectedSlots);
            newTimetables = state
                .SettingsState
                .TimetableFinder(selectedSlots);
            const slotsOfSubjects = PartitionizeByKey(selectedSlots, "SubjectCode");
            currentSubjectSchemas = slotsOfSubjects.map((x) => GenerateSubjectSchema(x));
            sortBy(currentSubjectSchemas, [(o) => o.SubjectCode]);
        }

        const selectedSubjects = state
            .SubjectListState
            .Subjects
            .filter((s) => s.IsSelected);
        const correctSubjectSchemas = selectedSubjects.map((s) => GenerateSubjectSchema(slotStore.GetBunch(s.SlotUids)));
        sortBy(correctSubjectSchemas, [(o) => o.SubjectCode]);

        let errorMessages: DiffReport[] = [];
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
            TimetableListState: NewTimetableListState(newTimetables, selectedSlots)
        };
    }
}
export function GetSlotsFromSlotNumbers(allSlots : RawSlot[], slotNumbers : string[]) : RawSlot[] {
    let result = [];
    slotNumbers.forEach((num) => {
        result = result.concat(allSlots.filter((x) => x.Number === num));
    });
    return result;
}
