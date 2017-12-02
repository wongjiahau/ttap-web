import {
    clone,
    find,
    remove
} from "lodash";
import {
    Subject
} from "../../model/subject";
import {
    IMasterState,
    MasterStateAction
} from "./../reducers/masterState";

export class ReformTimetablesBasedOnGroupOfSlots extends MasterStateAction {
    public constructor(private subjectCode: string) {
        super();
    }
    public TypeName(): string {
        return `reform timetables based on group of slots of (${this.subjectCode})`;
    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        const targetSubject = find(state.SubjectListState.Subjects, {
            Code: this.subjectCode
        });
        let selectedSlotsCount = 0;
        let deselectedSlotsCount = 0;
        targetSubject.SlotIds.forEach((id) => {
            if (state.SlotTableState.SlotStates[id] === true) {
                selectedSlotsCount++;
            } else {
                deselectedSlotsCount++;
            }
        });

        const allSlotShouldBeSelected = deselectedSlotsCount > selectedSlotsCount;
        const newSlotStates = clone(state.SlotTableState.SlotStates);
        targetSubject.SlotIds.forEach((id) => {
            newSlotStates[id] = allSlotShouldBeSelected;
        });
        const newSubjectStates = clone(state.SlotTableState.SubjectStates);
        newSubjectStates[this.subjectCode] = allSlotShouldBeSelected ? "true" : "false";

        let newFiltrateTimetables = clone(state.TimetableListState.FiltrateTimetables);
        let newResidueTimetables = clone(state.TimetableListState.ResidueTimetables);
        if (allSlotShouldBeSelected) {
            targetSubject.SlotIds.forEach((id) => {
                newFiltrateTimetables = newFiltrateTimetables.concat(
                    remove(newResidueTimetables, (timetable) => {
                        return timetable.HashIds.some((x) => x === id);
                    }));
            });
        } else {
            newResidueTimetables = newFiltrateTimetables.concat(newResidueTimetables);
            newFiltrateTimetables = [];
        }

        return {
            ...state,
            SlotTableState: {
                ...state.SlotTableState,
                SlotStates: newSlotStates,
                SubjectStates: newSubjectStates
            },
            TimetableListState: {
                ...state.TimetableListState,
                FiltrateTimetables: newFiltrateTimetables,
                ResidueTimetables: newResidueTimetables
            }
        };
    }
}
