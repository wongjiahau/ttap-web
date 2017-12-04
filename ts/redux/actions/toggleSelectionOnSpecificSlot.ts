import {
    clone,
    find,
    remove
} from "lodash";
import {
    RawSlot
} from "../../model/rawSlot";
import {
    Subject
} from "../../model/subject";
import {
    IMasterState,
    MasterStateAction
} from "./../reducers/masterState";
import {
    Ternary
} from "./toggleSubjectSelection";

export class ToggleSelectionOnSpecificSlot extends MasterStateAction {
    public constructor(private slotNumber: number, private checked: boolean, private subjectCode: string) {
        super();
    }
    public TypeName(): string {
        return this.checked ?
            `selecting slot [ ${this.slotNumber} ]` :
            `deselecting slot [ ${this.slotNumber} ]`;

    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        const newSlotStates = clone(state.SlotTableState.SlotStates);
        newSlotStates[this.slotNumber] = !this.checked;
        const targetSubject = find(state.SubjectListState.Subjects, {
            Code: this.subjectCode
        });
        return {
            ...state,
            SlotTableState: {
                ...state.SlotTableState,
                SlotStates: newSlotStates,
            }
        };
    }
}
