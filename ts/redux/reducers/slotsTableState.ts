import { Ternary } from "../actions/toggleSubjectSelection";

export interface ISlotsTableState {
    IsOpen: boolean;
    SlotStates: boolean[]; // whether a slot is selected or not
    SubjectStates: Ternary[]; // whether all slots of a subject is selected or not
}

export function NewSlotsTableState() : ISlotsTableState {
    return {
        IsOpen: false,
        SlotStates: [],
        SubjectStates: []
    };
}
