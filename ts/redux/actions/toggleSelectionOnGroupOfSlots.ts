const clone = require("lodash.clone");
const find = require("lodash.find");
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
        }) as Subject;
        let selectedSlotsCount = 0;
        let deselectedSlotsCount = 0;
        targetSubject.SlotNumbers.forEach((slotNumber) => {
            if (state.SlotTableState.SlotStates[slotNumber] === true) {
                selectedSlotsCount++;
            } else {
                deselectedSlotsCount++;
            }
        });

        const allSlotShouldBeSelected = deselectedSlotsCount > selectedSlotsCount;
        const newSlotStates = clone(state.SlotTableState.SlotStates);
        targetSubject.SlotNumbers.forEach((slotNumber) => {
            newSlotStates[slotNumber] = allSlotShouldBeSelected;
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
