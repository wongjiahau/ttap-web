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
    public constructor(private slotId: number, private checked: boolean, private subjectCode: string) {
        super();
    }
    public TypeName(): string {
        const slotIdsOfRelatedSlots = RawSlot.GetRelated(this.slotId);
        return this.checked ?
            `selecting slot (${slotIdsOfRelatedSlots.toString()})` :
            `deselecting slot (${slotIdsOfRelatedSlots.toString()})`;

    }
    protected GenerateNewState(state: IMasterState): IMasterState {
        const slotIdsOfRelatedSlots = RawSlot.GetRelated(this.slotId);
        const newSlotStates = clone(state.SlotTableState.SlotStates);
        slotIdsOfRelatedSlots.forEach((id) => {
            newSlotStates[id] = !this.checked;
        });

        const targetSubject = find(state.SubjectListState.Subjects, {
            Code: this.subjectCode
        });
        const newStateOfTargetSubject = GetNewStateOfTargetSubject(targetSubject, newSlotStates);
        const newSubjectStates = clone(state.SlotTableState.SubjectStates);
        newSubjectStates[this.subjectCode] = newStateOfTargetSubject;
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

function GetNewStateOfTargetSubject(subject: Subject, newSlotStates: boolean[]): Ternary {
    let someSlotIsSelected = false;
    let someSlotIsNotSelected = false;
    subject.SlotIds.forEach((id) => {
        if (newSlotStates[id] === true) {
            someSlotIsSelected = true;
        } else {
            someSlotIsNotSelected = true;
        }
    });
    if (someSlotIsSelected && someSlotIsNotSelected) {
        return "intermediate";
    }
    if (someSlotIsSelected) {
        return "true";
    }
    if (someSlotIsNotSelected) {
        return "false";
    }

}
