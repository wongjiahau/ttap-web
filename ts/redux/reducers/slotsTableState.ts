import { IStringDicionary } from "../../interfaces/dictionary";
import { Ternary } from "../actions/toggleSubjectSelection";

export interface ISlotsTableState {
    ErrorMessages: string[];
    IsOpen:        boolean;
    SlotStates:    IStringDicionary<boolean>; // whether a slot is selected or not
    SubjectStates: IStringDicionary<Ternary>; // whether all slots of a subject is selected or not
}

export function NewSlotsTableState() : ISlotsTableState {
    return {
        IsOpen:        false,
        SlotStates:    {},
        SubjectStates: {},
        ErrorMessages: []
    };
}
