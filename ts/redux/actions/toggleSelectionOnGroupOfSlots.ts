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

export class ToggleSelectionOnGroupOfSlots extends MasterStateAction {
    public constructor(private subjectCode: string) {
        super();
    }
    public TypeName(): string {
        return `toggle selection on group of slots of (${this.subjectCode})`;
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

        return {
            ...state,
            SlotTableState: {
                ...state.SlotTableState,
                SlotStates: newSlotStates,
                SubjectStates: newSubjectStates
            }
        };
    }
}
